import { Router } from 'express';
import {
  checkIn,
  checkOut,
  getAttendance,
  updateAttendance,
} from '../controllers/attendanceController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.post('/check-in', authenticate, checkIn);
router.post('/check-out', authenticate, checkOut);
router.get('/', authenticate, getAttendance);
router.put('/:id', authenticate, authorize('ADMIN', 'HR_MANAGER', 'MANAGER'), updateAttendance);

export default router;
