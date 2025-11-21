import { Router } from 'express';
import {
  getDashboardStats,
  getEmployeesByDepartment,
  getAttendanceTrends,
  getTicketStats,
  getPayrollTrends,
  getBudgetUtilization,
  trackAnalytics,
} from '../controllers/analyticsController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/dashboard', authenticate, getDashboardStats);
router.get('/employees/department', authenticate, getEmployeesByDepartment);
router.get('/attendance/trends', authenticate, getAttendanceTrends);
router.get('/tickets/stats', authenticate, getTicketStats);
router.get('/payroll/trends', authenticate, authorize('ADMIN', 'HR_MANAGER'), getPayrollTrends);
router.get('/budget/utilization', authenticate, authorize('ADMIN', 'HR_MANAGER'), getBudgetUtilization);
router.post('/track', authenticate, trackAnalytics);

export default router;
