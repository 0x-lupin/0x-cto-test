import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const checkIn = async (req: AuthRequest, res: Response) => {
  try {
    const { employeeId } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAttendance = await prisma.attendance.findUnique({
      where: {
        employeeId_date: {
          employeeId,
          date: today,
        },
      },
    });

    if (existingAttendance) {
      return res.status(400).json({ error: 'Already checked in today' });
    }

    const attendance = await prisma.attendance.create({
      data: {
        employeeId,
        date: today,
        checkIn: new Date(),
        status: 'PRESENT',
      },
      include: {
        employee: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to check in' });
  }
};

export const checkOut = async (req: AuthRequest, res: Response) => {
  try {
    const { employeeId } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await prisma.attendance.update({
      where: {
        employeeId_date: {
          employeeId,
          date: today,
        },
      },
      data: {
        checkOut: new Date(),
      },
      include: {
        employee: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to check out' });
  }
};

export const getAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const { employeeId, startDate, endDate } = req.query;

    const where: any = {};
    if (employeeId) {
      where.employeeId = employeeId as string;
    }
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    }

    const attendance = await prisma.attendance.findMany({
      where,
      include: {
        employee: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: { date: 'desc' },
    });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
};

export const updateAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const attendance = await prisma.attendance.update({
      where: { id },
      data: { status, notes },
      include: {
        employee: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update attendance' });
  }
};
