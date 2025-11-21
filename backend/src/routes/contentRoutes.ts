import { Router } from 'express';
import {
  createContent,
  getContents,
  getContentBySlug,
  updateContent,
  deleteContent,
} from '../controllers/contentController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, authorize('ADMIN', 'HR_MANAGER', 'MANAGER'), createContent);
router.get('/', getContents);
router.get('/:slug', getContentBySlug);
router.put('/:id', authenticate, authorize('ADMIN', 'HR_MANAGER', 'MANAGER'), updateContent);
router.delete('/:id', authenticate, authorize('ADMIN', 'HR_MANAGER'), deleteContent);

export default router;
