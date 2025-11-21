import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const [
      totalEmployees,
      activeEmployees,
      totalTickets,
      openTickets,
      totalBudget,
      totalSpent,
      pendingLeaves,
      todayAttendance,
    ] = await Promise.all([
      prisma.employee.count(),
      prisma.employee.count({
        where: { user: { isActive: true } },
      }),
      prisma.ticket.count(),
      prisma.ticket.count({
        where: { status: { in: ['OPEN', 'IN_PROGRESS'] } },
      }),
      prisma.budget.aggregate({
        _sum: { allocated: true },
      }),
      prisma.budget.aggregate({
        _sum: { spent: true },
      }),
      prisma.leave.count({
        where: { status: 'PENDING' },
      }),
      prisma.attendance.count({
        where: {
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ]);

    res.json({
      employees: {
        total: totalEmployees,
        active: activeEmployees,
      },
      tickets: {
        total: totalTickets,
        open: openTickets,
      },
      budget: {
        allocated: totalBudget._sum.allocated || 0,
        spent: totalSpent._sum.spent || 0,
      },
      leaves: {
        pending: pendingLeaves,
      },
      attendance: {
        today: todayAttendance,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

export const getEmployeesByDepartment = async (req: AuthRequest, res: Response) => {
  try {
    const employees = await prisma.employee.groupBy({
      by: ['department'],
      _count: {
        id: true,
      },
    });

    const data = employees.map((item) => ({
      department: item.department,
      count: item._count.id,
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employee distribution' });
  }
};

export const getAttendanceTrends = async (req: AuthRequest, res: Response) => {
  try {
    const { days = 7 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days as string));
    startDate.setHours(0, 0, 0, 0);

    const attendance = await prisma.attendance.groupBy({
      by: ['date', 'status'],
      where: {
        date: {
          gte: startDate,
        },
      },
      _count: {
        id: true,
      },
    });

    const groupedData: any = {};
    attendance.forEach((item) => {
      const dateKey = item.date.toISOString().split('T')[0];
      if (!groupedData[dateKey]) {
        groupedData[dateKey] = {
          date: dateKey,
          PRESENT: 0,
          ABSENT: 0,
          LATE: 0,
          HALF_DAY: 0,
          LEAVE: 0,
        };
      }
      groupedData[dateKey][item.status] = item._count.id;
    });

    res.json(Object.values(groupedData));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance trends' });
  }
};

export const getTicketStats = async (req: AuthRequest, res: Response) => {
  try {
    const [statusStats, priorityStats] = await Promise.all([
      prisma.ticket.groupBy({
        by: ['status'],
        _count: {
          id: true,
        },
      }),
      prisma.ticket.groupBy({
        by: ['priority'],
        _count: {
          id: true,
        },
      }),
    ]);

    res.json({
      byStatus: statusStats.map((item) => ({
        status: item.status,
        count: item._count.id,
      })),
      byPriority: priorityStats.map((item) => ({
        priority: item.priority,
        count: item._count.id,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ticket stats' });
  }
};

export const getPayrollTrends = async (req: AuthRequest, res: Response) => {
  try {
    const { months = 6 } = req.query;
    
    const payrolls = await prisma.payroll.groupBy({
      by: ['year', 'month'],
      _sum: {
        netSalary: true,
      },
      _count: {
        id: true,
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
      ],
      take: parseInt(months as string),
    });

    const data = payrolls.reverse().map((item) => ({
      period: `${item.year}-${String(item.month).padStart(2, '0')}`,
      totalPayroll: item._sum.netSalary || 0,
      employeeCount: item._count.id,
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payroll trends' });
  }
};

export const getBudgetUtilization = async (req: AuthRequest, res: Response) => {
  try {
    const budgets = await prisma.budget.groupBy({
      by: ['department'],
      _sum: {
        allocated: true,
        spent: true,
      },
    });

    const data = budgets.map((item) => ({
      department: item.department,
      allocated: item._sum.allocated || 0,
      spent: item._sum.spent || 0,
      remaining: (item._sum.allocated || 0) - (item._sum.spent || 0),
      utilization: item._sum.allocated ? ((item._sum.spent || 0) / item._sum.allocated * 100) : 0,
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch budget utilization' });
  }
};

export const trackAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const { metric, value, metadata } = req.body;

    const analytics = await prisma.analytics.create({
      data: {
        metric,
        value: parseFloat(value),
        metadata: metadata ? JSON.stringify(metadata) : null,
        date: new Date(),
      },
    });

    res.status(201).json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to track analytics' });
  }
};
