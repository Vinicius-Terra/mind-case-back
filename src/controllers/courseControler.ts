import { Request, Response } from 'express';
import {CourseDataImput} from "../services/courseService"
import { courseService } from '../services/courseService';

export async function getAllCourses(req: Request, res: Response) {
    const courses = await courseService.getAllCourses();
    res.send(courses).status(200);
}

export async function getCourseByName(req: Request, res: Response) {
    const name = req.params.name;
    const course = await courseService.getCourseByName(name);
    res.send(course).status(200);
}

export async function createCourse(req: Request, res: Response) {
    const course:CourseDataImput = req.body;
    await courseService.createCourse(course);
    res.sendStatus(201);
}

export async function updateCourse(req: Request, res: Response) {
    const course:CourseDataImput = req.body;

    const id = parseInt(req.params.id);

    await courseService.updateCourse(course, id);
    res.sendStatus(200);
}

export async function deleteCourse(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await courseService.deleteCourse(id);
    res.sendStatus(200);
}


