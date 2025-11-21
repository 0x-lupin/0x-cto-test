import { Router } from 'express';
import {
  createPayroll,
  getPayrolls,
  updatePayroll,
  deletePayroll,
} from '../controllers/payrollController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, authorize('ADMIN', 'HR_MANAGER'), createPayroll);
router.get('/', authenticate, getPayrolls);
router.put('/:id', authenticate, authorize('ADMIN', 'HR_MANAGER'), updatePayroll);
router.delete('/:id', authenticate, authorize('ADMIN', 'HR_MANAGER'), deletePayroll);

export default router;
