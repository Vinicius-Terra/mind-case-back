import { ProfessorData } from '../repositories/professorRepository';
import * as professorRepository from '../repositories/professorRepository';

// import error utils
import { conflictError, notFoundError } from '../utils/errorUtils';

async function getAllProfessors() {
    return professorRepository.getAllProfessors();
}

async function getProfessorByName(name: string) {
    const professor = await professorRepository.getProfessorByName(name);
    if (!professor) throw notFoundError('Professor not found');

    return professor;
}

async function createProfessor(professor: ProfessorData) {
    const existingProfessor = await professorRepository.getProfessorByName(professor.name);

    if (existingProfessor) {
        throw conflictError('There is a conflict');
    }

    await professorRepository.insertProfessor(professor);
}

async function updateProfessor(professor: ProfessorData) {
    const existingProfessor = await professorRepository.getProfessorByName(professor.name);

    if (!existingProfessor) {
        throw notFoundError('Professor not found');
    }

    await professorRepository.updateProfessor(professor, existingProfessor.id);
}

async function deleteProfessor(name: string) {
    const existingProfessor = await professorRepository.getProfessorByName(name);

    if (!existingProfessor) {
        throw notFoundError('Professor not found');
    }

    await professorRepository.deleteProfessor(existingProfessor.id);
}

export const professorService = {
    getAllProfessors,
    getProfessorByName,
    createProfessor,
    updateProfessor,
    deleteProfessor
};