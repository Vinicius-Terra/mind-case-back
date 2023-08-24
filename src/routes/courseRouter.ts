import { Router } from 'express';
import { ensureAuthenticatedMiddleware } from '../middlewares/authMiddleware';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { courseSchema } from '../schemas/courseSchema';

import { getAllCourses, getCourseByName, createCourse, updateCourse, deleteCourse } from '../controllers/courseControler';

const courseRouter = Router();


courseRouter.get('/courses', getAllCourses);
courseRouter.get('/courses/:name', getCourseByName);
courseRouter.post('/courses', ensureAuthenticatedMiddleware, validateSchemaMiddleware(courseSchema), createCourse);
courseRouter.put('/courses/:id', ensureAuthenticatedMiddleware, validateSchemaMiddleware(courseSchema), updateCourse);
courseRouter.delete('/courses/:id', ensureAuthenticatedMiddleware, deleteCourse);


export default courseRouter;