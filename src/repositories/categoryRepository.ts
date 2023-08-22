import { prisma } from '../config/database';
import { Category } from '@prisma/client';

// remove id from Category
export type CategoryData = Omit<Category, "id">

export async function getAllCategories() {
    return prisma.category.findMany();
}

export async function insertCategory(category: CategoryData) {
    return prisma.category.create({
        data: category
    });
}

export async function updateCategory(category: CategoryData, id: number) {
    return prisma.category.update({
        where: { id },
        data: category
    });
}

export async function deleteCategory(id: number) {
    return prisma.category.delete({
        where: { id }
    });
}

export async function getCategoryByName(name: string) {
    return prisma.category.findUnique({
        where: { name }
    });
}

