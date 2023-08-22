import { prisma } from '../config/database';
import { Course } from '@prisma/client';

// remove id,createdAt and updateAt from Course
export type CourseData = Omit<Course, "id" | "createdAt" | "updatedAt">

//get all courses and the professor and category name
export async function getAllCourses() {
    return prisma.course.findMany({
        include: {
            professor: true,
            category: true
        }
    });
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
        where: { name },
        include: {
            professor: true,
            category: true
        }
    });
}

export async function getCourseById(id: number) {
    return prisma.course.findUnique({
        where: { id }
    });
}
