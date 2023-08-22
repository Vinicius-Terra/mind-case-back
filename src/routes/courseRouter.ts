import { Router } from 'express';
import { ensureAuthenticatedMiddleware } from '../middlewares/authMiddleware';

const courseRouter = Router();

//courseRouter.get('/courses', ensureAuthenticatedMiddleware, getAllCourses);



export default courseRouter;