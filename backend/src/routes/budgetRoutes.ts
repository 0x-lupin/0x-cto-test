import { Router } from 'express';
import {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} from '../controllers/budgetController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, authorize('ADMIN', 'HR_MANAGER'), createBudget);
router.get('/', authenticate, getBudgets);
router.put('/:id', authenticate, authorize('ADMIN', 'HR_MANAGER'), updateBudget);
router.delete('/:id', authenticate, authorize('ADMIN', 'HR_MANAGER'), deleteBudget);

export default router;
