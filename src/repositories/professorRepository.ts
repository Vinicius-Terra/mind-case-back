import e from 'cors';
import { prisma } from '../config/database';
import { Professor } from '@prisma/client';

// remove id,createdAt and updateAt from Professor

export type ProfessorData = Omit<Professor, "id" | "createdAt" | "updatedAt">

export async function getAllProfessors() {
    return prisma.professor.findMany();
}

export async function insertProfessor(professor: ProfessorData) {
    return prisma.professor.create({
        data: professor
    });
}

export async function updateProfessor(professor: ProfessorData, id: number) {
    return prisma.professor.update({
        where: { id },
        data: professor
    });
}

export async function deleteProfessor(id: number) {
    return prisma.professor.delete({
        where: { id }
    });
}

export async function getProfessorByName(name: string) {
    return prisma.professor.findUnique({
        where: { name }
    });
}

export async function getProfessorById(id: number) {
    return prisma.professor.findUnique({
        where: { id }
    });
}



