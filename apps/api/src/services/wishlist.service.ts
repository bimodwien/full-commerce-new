'use strict';

import { Request } from 'express';
import prisma from '@/prisma';

class WishlistService {
  static async getAll(req: Request) {
    const userId = req.user?.id as string;
    if (!userId) throw new Error('User not found');
    const wishlistData = await prisma.wishlist.findMany({
      where: { userId: String(userId) },
      include: {
        Product: {
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
            description: true,
            Category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        User: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return {
      data: wishlistData,
    };
  }

  static async getById(req: Request) {
    const id = req.params.id;
    const userId = req.user?.id as string;
    if (!userId) throw new Error('User not found');
    const wishlistItem = await prisma.wishlist.findUnique({
      where: { id: String(id), userId: String(userId) },
      include: {
        Product: {
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
            description: true,
            Category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    if (!wishlistItem) {
      throw new Error('Wishlist item not found or not belong to this user');
    }
    return wishlistItem;
  }

  static async create(req: Request) {
    const userId = req.user?.id as string;
    const { productId } = req.body;
    if (!userId) throw new Error('User not found');
    const existingWishlistItem = await prisma.wishlist.findFirst({
      where: { userId: String(userId), productId: String(productId) },
    });
    if (existingWishlistItem) {
      return existingWishlistItem;
    }
    const created = await prisma.wishlist.create({
      data: {
        userId: String(userId),
        productId: String(productId),
      },
    });
    return created;
  }

  static async deletedWishlistItem(req: Request) {
    const userId = req.user?.id as string;
    const { id } = req.params;
    if (!userId) throw new Error('User not found');
    const existingWishlistItem = await prisma.wishlist.findUnique({
      where: { id: String(id), userId: String(userId) },
    });
    if (!existingWishlistItem) {
      throw new Error('Wishlist item not found or not belong to this user');
    }
    const deletedWishlistItem = await prisma.wishlist.delete({
      where: { id: String(id) },
    });
    return deletedWishlistItem;
  }

  static async clearWishlist(req: Request) {
    const userId = req.user?.id as string;
    if (!userId) throw new Error('User not found');
    const deletedWishlistItems = await prisma.wishlist.deleteMany({
      where: { userId: String(userId) },
    });
    return deletedWishlistItems;
  }
}

export default WishlistService;
