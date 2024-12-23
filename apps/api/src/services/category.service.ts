'use strict';

import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { Request } from 'express';

class CategoryService {
  static async getAll(req: Request) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const name = String(req.query.name || '');
    const categoryData = await prisma.category.findMany({
      where: { name: { contains: name } },
      skip: skip,
      take: limit,
      select: {
        id: true,
        name: true,
        Product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    const total = await prisma.category.count();
    return {
      data: categoryData,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async getById(req: Request) {
    const id = req.params.id;
    const data = await prisma.category.findUnique({
      where: { id: String(id) },
      select: {
        id: true,
        name: true,
        Product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return data;
  }

  static async create(req: Request) {
    await prisma.$transaction(async (prisma) => {
      const name = req.body.name;
      const existingCategory = await prisma.category.findFirst({
        where: { name },
      });
      if (existingCategory) throw new Error('Category already exists');
      const data: Prisma.CategoryCreateInput = {
        name,
      };
      const newCategory = await prisma.category.create({ data });
      return newCategory;
    });
  }

  static async edit(req: Request) {
    await prisma.$transaction(async (prisma) => {
      const id = req.params.id;
      const name = req.body.name;
      const existingCategory = await prisma.category.findUnique({
        where: { id: String(id) },
      });
      if (!existingCategory) throw new Error('Category not found');
      const data: Prisma.CategoryUpdateInput = {
        name,
      };
      const updatedCategory = await prisma.category.update({
        where: { id: String(id) },
        data,
      });
      return updatedCategory;
    });
  }

  static async deleteCategory(req: Request) {
    await prisma.$transaction(async (prisma) => {
      const id = req.params.id;
      const existingCategory = await prisma.category.findUnique({
        where: { id: String(id) },
      });
      if (!existingCategory) throw new Error('Category not found');
      const deletedCategory = await prisma.category.delete({
        where: { id: String(id) },
      });
      return deletedCategory;
    });
  }
}

export default CategoryService;
