import { prisma } from '../config/database';
import { Course } from '@prisma/client';

// remove id from Course
export type CourseData = Omit<Course, "id">


export async function getAllCourses() {
    return prisma.course.findMany();
}

export async function insertCourse(course: CourseData) {
    return prisma.course.create({
        data: course
    });
}

export async function updateCourse(course: CourseData, id: number) {
    return prisma.course.update({
        where: { id },
        data: course
    });
      

}

export async function deleteCourse(id: number) {
    return prisma.course.delete({
        where: { id }
    });
}

export async function getCourseByName(name: string) {
    return prisma.course.findUnique({
        where: { name }
    });
}