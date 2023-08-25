import { Router } from 'express';
import authRouter from './authRouter';
import courseRouter from './courseRouter';
import professorRouter from './professorRouter';
import categoryRouter from './categoryRouter';

const router = Router();

router.use(authRouter);
router.use(courseRouter);
router.use(professorRouter);
router.use(categoryRouter);

export default router;
