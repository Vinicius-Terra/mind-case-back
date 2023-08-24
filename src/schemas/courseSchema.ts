import joi from 'joi';
import { CourseDataImput } from '../services/courseService';

export const courseSchema = joi.object<CourseDataImput>({
    name: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().required(),
    categoryName: joi.string().required(),
    professorName: joi.string().required()
});

