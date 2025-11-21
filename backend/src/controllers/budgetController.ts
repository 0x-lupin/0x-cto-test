import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const createBudget = async (req: AuthRequest, res: Response) => {
  try {
    const { department, category, allocated, year, quarter, description } = req.body;

    const budget = await prisma.budget.create({
      data: {
        department,
        category,
        allocated: parseFloat(allocated),
        year: parseInt(year),
        quarter: parseInt(quarter),
        description,
      },
    });

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create budget' });
  }
};

export const getBudgets = async (req: AuthRequest, res: Response) => {
  try {
    const { department, year, quarter } = req.query;

    const where: any = {};
    if (department) {
      where.department = department as string;
    }
    if (year) {
      where.year = parseInt(year as string);
    }
    if (quarter) {
      where.quarter = parseInt(quarter as string);
    }

    const budgets = await prisma.budget.findMany({
      where,
      orderBy: [{ year: 'desc' }, { quarter: 'desc' }],
    });

    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch budgets' });
  }
};

export const updateBudget = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.allocated) {
      updateData.allocated = parseFloat(updateData.allocated);
    }
    if (updateData.spent) {
      updateData.spent = parseFloat(updateData.spent);
    }

    const budget = await prisma.budget.update({
      where: { id },
      data: updateData,
    });

    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update budget' });
  }
};

export const deleteBudget = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.budget.delete({ where: { id } });

    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete budget' });
  }
};
