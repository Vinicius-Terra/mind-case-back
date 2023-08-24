import { CourseData } from "../repositories/courseRepositorory";
import * as courseRepository from "../repositories/courseRepositorory";
import * as categoryRepository from "../repositories/categoryRepository";
import * as professorRepository from "../repositories/professorRepository";

// import error utils
import { conflictError, notFoundError } from "../utils/errorUtils";

// remove caregorieId and professorId from CourseData, and add professorName and categoryName
export type CourseDataImput = Omit<CourseData, "categoryId" | "professorId"> & { professorName: string, categoryName: string };

async function getAllCourses() {
    return courseRepository.getAllCourses();
}

async function getCourseByName(name: string) {
    const course = await courseRepository.getCourseByName(name);
    if (!course) throw notFoundError("Course not found");

    return course;
}

async function createCourse(course: CourseDataImput) {
    const existingCourse = await courseRepository.getCourseByName(course.name);
    const existingProfessor = await professorRepository.getProfessorByName(course.professorName);
    const existingCategory = await categoryRepository.getCategoryByName(course.categoryName);

    if (existingCourse) {
        throw conflictError("There is a conflict");
    }

    if (!existingProfessor) {
        throw notFoundError("Professor not found");
    }

    if (!existingCategory) {
        throw notFoundError("Category not found");
    }

    const newCourse : CourseData = {name: course.name, description: course.description, image: course.image, categoryId: existingCategory.id, professorId: existingProfessor.id}
    await courseRepository.insertCourse(newCourse);
}

async function updateCourse(course: CourseDataImput, id: number) {

    if(isNaN(id)){
        throw notFoundError("Invalid id");
    }
    
    const existingProfessor = await professorRepository.getProfessorByName(course.professorName);
    const existingCategory = await categoryRepository.getCategoryByName(course.categoryName);
    const conflictExistingCourse = await courseRepository.getCourseByName(course.name);
    const existingCourse = await courseRepository.getCourseById(id);

    if (!existingCourse) {
        throw notFoundError("Course not found");
    }

    if (conflictExistingCourse) {
        throw conflictError("Course name must be unique");
    }

    if (!existingProfessor) {
        throw notFoundError("Professor not found");
    }

    if (!existingCategory) {
        throw notFoundError("Category not found");
    }

    const newCourseData : CourseData = {name: course.name, description: course.description, image: course.image, categoryId: existingCategory.id, professorId: existingProfessor.id}
    await courseRepository.updateCourse(
        newCourseData,
        id);
}

async function deleteCourse(id: number) {

    if(isNaN(id)){
        throw notFoundError("Invalid id");
    }

    const existingCourse = await courseRepository.getCourseById(id);

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

export { courseService };

