import { Router } from 'express';
import {
  createLeave,
  getLeaves,
  updateLeaveStatus,
} from '../controllers/leaveController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, createLeave);
router.get('/', authenticate, getLeaves);
router.put('/:id/status', authenticate, authorize('ADMIN', 'HR_MANAGER', 'MANAGER'), updateLeaveStatus);

export default router;
