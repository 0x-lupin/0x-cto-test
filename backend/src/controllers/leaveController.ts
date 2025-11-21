import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const createLeave = async (req: AuthRequest, res: Response) => {
  try {
    const { employeeId, leaveType, startDate, endDate, reason } = req.body;

    const leave = await prisma.leave.create({
      data: {
        employeeId,
        leaveType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
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

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create leave request' });
  }
};

export const getLeaves = async (req: AuthRequest, res: Response) => {
  try {
    const { employeeId, status } = req.query;

    const where: any = {};
    if (employeeId) {
      where.employeeId = employeeId as string;
    }
    if (status) {
      where.status = status;
    }

    const leaves = await prisma.leave.findMany({
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
      orderBy: { createdAt: 'desc' },
    });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaves' });
  }
};

export const updateLeaveStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leave = await prisma.leave.update({
      where: { id },
      data: {
        status,
        approvedBy: req.user?.userId,
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

    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update leave status' });
  }
};
