import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getAllEmployees = async (req: AuthRequest, res: Response) => {
  try {
    const { department, search } = req.query;

    const where: any = {};
    if (department) {
      where.department = department;
    }
    if (search) {
      where.OR = [
        { user: { firstName: { contains: search as string, mode: 'insensitive' } } },
        { user: { lastName: { contains: search as string, mode: 'insensitive' } } },
        { employeeCode: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const employees = await prisma.employee.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            isActive: true,
          },
        },
        manager: {
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
      orderBy: { dateOfJoining: 'desc' },
    });

    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

export const getEmployeeById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            isActive: true,
          },
        },
        manager: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        subordinates: {
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

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
};

export const createEmployee = async (req: AuthRequest, res: Response) => {
  try {
    const {
      userId,
      employeeCode,
      department,
      designation,
      dateOfJoining,
      dateOfBirth,
      phone,
      address,
      emergencyContact,
      bankAccount,
      baseSalary,
      managerId,
    } = req.body;

    const employee = await prisma.employee.create({
      data: {
        userId,
        employeeCode,
        department,
        designation,
        dateOfJoining: new Date(dateOfJoining),
        dateOfBirth: new Date(dateOfBirth),
        phone,
        address,
        emergencyContact,
        bankAccount,
        baseSalary: parseFloat(baseSalary),
        managerId,
      },
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create employee' });
  }
};

export const updateEmployee = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.dateOfJoining) {
      updateData.dateOfJoining = new Date(updateData.dateOfJoining);
    }
    if (updateData.dateOfBirth) {
      updateData.dateOfBirth = new Date(updateData.dateOfBirth);
    }
    if (updateData.baseSalary) {
      updateData.baseSalary = parseFloat(updateData.baseSalary);
    }

    const employee = await prisma.employee.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update employee' });
  }
};

export const deleteEmployee = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.employee.delete({ where: { id } });

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};
