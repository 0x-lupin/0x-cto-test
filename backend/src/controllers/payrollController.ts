import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const createPayroll = async (req: AuthRequest, res: Response) => {
  try {
    const { employeeId, month, year, allowances, deductions, tax } = req.body;

    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const baseSalary = employee.baseSalary;
    const netSalary = baseSalary + parseFloat(allowances || 0) - parseFloat(deductions || 0) - parseFloat(tax || 0);

    const payroll = await prisma.payroll.create({
      data: {
        employeeId,
        month: parseInt(month),
        year: parseInt(year),
        baseSalary,
        allowances: parseFloat(allowances || 0),
        deductions: parseFloat(deductions || 0),
        tax: parseFloat(tax || 0),
        netSalary,
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

    res.status(201).json(payroll);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payroll' });
  }
};

export const getPayrolls = async (req: AuthRequest, res: Response) => {
  try {
    const { employeeId, year, month } = req.query;

    const where: any = {};
    if (employeeId) {
      where.employeeId = employeeId as string;
    }
    if (year) {
      where.year = parseInt(year as string);
    }
    if (month) {
      where.month = parseInt(month as string);
    }

    const payrolls = await prisma.payroll.findMany({
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
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });

    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payrolls' });
  }
};

export const updatePayroll = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { allowances, deductions, tax, isPaid, paymentDate } = req.body;

    const existingPayroll = await prisma.payroll.findUnique({
      where: { id },
    });

    if (!existingPayroll) {
      return res.status(404).json({ error: 'Payroll not found' });
    }

    const netSalary = 
      existingPayroll.baseSalary +
      parseFloat(allowances || existingPayroll.allowances) -
      parseFloat(deductions || existingPayroll.deductions) -
      parseFloat(tax || existingPayroll.tax);

    const payroll = await prisma.payroll.update({
      where: { id },
      data: {
        allowances: allowances ? parseFloat(allowances) : undefined,
        deductions: deductions ? parseFloat(deductions) : undefined,
        tax: tax ? parseFloat(tax) : undefined,
        netSalary,
        isPaid: isPaid !== undefined ? isPaid : undefined,
        paymentDate: paymentDate ? new Date(paymentDate) : undefined,
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

    res.json(payroll);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payroll' });
  }
};

export const deletePayroll = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.payroll.delete({ where: { id } });

    res.json({ message: 'Payroll deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete payroll' });
  }
};
