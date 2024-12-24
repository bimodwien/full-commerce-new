'use strict';

import { Request } from 'express';
import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { TProduct } from '@/models/product.model';
import sharp from 'sharp';

class ProductService {
  static async getAll(req: Request) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const name = String(req.query.name || '');
    const productData = await prisma.product.findMany({
      where: { name: { contains: name } },
      skip: skip,
      take: limit,
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        productImage: true,
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    const total = await prisma.product.count();
    return {
      data: productData,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async getById(req: Request) {
    const id = req.params.id;
    const data = await prisma.product.findUnique({
      where: { id: String(id) },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        productImage: true,
        Category: {
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
      const { name, description, price, stock, categoryId } = req.body;
      const { file } = req;
      const existingProduct = await prisma.product.findFirst({
        where: { name },
      });
      if (existingProduct) throw new Error('Product already exists');
      if (categoryId) {
        const category = await prisma.category.findUnique({
          where: { id: String(categoryId) },
        });
        if (!category) throw new Error('Category not found');
      }
      if (!file) throw new Error('Product image is required');
      const buffer = await sharp(req.file?.buffer).png().toBuffer();
      const data: Prisma.ProductCreateInput = {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        productImage: buffer,
        Category: { connect: { id: String(categoryId) } },
      };
      const product = await prisma.product.create({ data });
      return product;
    });
  }

  static async edit(req: Request) {
    await prisma.$transaction(async (prisma) => {
      const { id } = req.params;
      const { name, description, price, stock, categoryId } = req.body;
      const { file } = req;
      const existingProduct = await prisma.product.findFirst({
        where: { id: String(id) },
      });
      if (!existingProduct) throw new Error('Product not found');
      const data: Prisma.ProductUpdateInput = {};
      if (name) data.name = name;
      if (description) data.description = description;
      if (price) data.price = price;
      if (stock) data.stock = stock;
      if (categoryId) {
        const category = await prisma.category.findUnique({
          where: { id: String(categoryId) },
        });
        if (!category) throw new Error('Category not found');
        data.Category = { connect: { id: String(categoryId) } };
      }
      if (file) {
        const buffer = await sharp(req.file?.buffer).png().toBuffer();
        data.productImage = buffer;
      }
      const updatedProduct = await prisma.product.update({
        where: { id: String(id) },
        data,
      });
      return updatedProduct;
    });
  }

  static async deleteProduct(req: Request) {
    await prisma.$transaction(async (prisma) => {
      const { id } = req.params;
      const existingProduct = await prisma.product.findUnique({
        where: { id: String(id) },
      });
      if (!existingProduct) throw new Error('Product not found');
      const deletedProduct = await prisma.product.delete({
        where: { id: String(id) },
      });
      return deletedProduct;
    });
  }

  static async render(req: Request) {
    const data = await prisma.product.findUnique({
      where: { id: String(req.params.id) },
    });
    return data?.productImage;
  }
}

export default ProductService;
