import { CourseData } from "../repositories/courseRepositorory";
import * as courseRepository from "../repositories/courseRepositorory";
import * as categoryRepository from "../repositories/categoryRepository";
import * as professorRepository from "../repositories/professorRepository";

// import error utils
import { conflictError, notFoundError } from "../utils/errorUtils";

// remove caregorieId and professorId from CourseData
export type CourseDataImput = Omit<CourseData, "categoryId" | "professorId">;

async function getAllCourses() {
    return courseRepository.getAllCourses();
}

async function getCourseByName(name: string) {
    const course = await courseRepository.getCourseByName(name);
    if (!course) throw notFoundError("Course not found");

    return course;
}

async function createCourse(course: CourseDataImput, professorName: string, categoryName: string) {
    const existingCourse = await courseRepository.getCourseByName(course.name);
    const existingProfessor = await professorRepository.getProfessorByName(professorName);
    const existingCategory = await categoryRepository.getCategoryByName(categoryName);

    if (existingCourse) {
        throw conflictError("There is a conflict");
    }

    if (!existingProfessor) {
        throw notFoundError("Professor not found");
    }

    if (!existingCategory) {
        throw notFoundError("Category not found");
    }

    await courseRepository.insertCourse({...course, categoryId: existingCategory.id, professorId: existingProfessor.id});
}

async function updateCourse(course: CourseDataImput, professorName: string, categoryName: string) {
    const existingCourse = await courseRepository.getCourseByName(course.name);
    const existingProfessor = await professorRepository.getProfessorByName(professorName);
    const existingCategory = await categoryRepository.getCategoryByName(categoryName);


    if (!existingProfessor) {
        throw notFoundError("Professor not found");
    }

    if (!existingCategory) {
        throw notFoundError("Category not found");
    }
    await courseRepository.updateCourse(
        {...course, categoryId: existingCategory.id, professorId: existingProfessor.id}
        ,existingCourse.id);
}

async function deleteCourse(name: string) {
    const existingCourse = await courseRepository.getCourseByName(name);

    if (!existingCourse) {
        throw notFoundError("Course not found");
    }

    await courseRepository.deleteCourse(existingCourse.id);
}

const courseService = {
    getAllCourses,
    getCourseByName,
    createCourse,
    updateCourse,
    deleteCourse,
};

