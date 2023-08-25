import joi from 'joi';
import { CourseDataImput } from '../services/courseService';

//image is a url
export const courseSchema = joi.object<CourseDataImput>({
    name: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().uri().required(),
    categoryName: joi.string().required(),
    professorName: joi.string().required()
});

