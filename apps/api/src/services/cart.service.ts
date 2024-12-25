'use strict';

import { Request } from 'express';
import prisma from '@/prisma';

class CartService {
  static async getAll(req: Request) {
    const userId = req.user?.id as string;
    if (!userId) throw new Error('User not found');
    const cartData = await prisma.cart.findMany({
      where: { userId: String(userId) },
      include: {
        Product: true,
        User: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return {
      data: cartData,
    };
  }

  static async getById(req: Request) {
    const id = req.params.id;
    const userId = req.user?.id as string;
    if (!userId) throw new Error('User not found');
    const cartItem = await prisma.cart.findUnique({
      where: { id: String(id), userId: String(userId) },
      include: {
        Product: true,
      },
    });
    if (!cartItem) {
      throw new Error('Cart item not found or not belong to this user');
    }

    return cartItem;
  }

  static async create(req: Request) {
    const userId = req.user?.id as string;
    const { productId, quantity } = req.body;
    if (!userId) throw new Error('User not found');
    const existingCartItem = await prisma.cart.findFirst({
      where: { userId: String(userId), productId: String(productId) },
    });
    if (existingCartItem) {
      const updated = await prisma.cart.update({
        where: { id: String(existingCartItem.id) },
        data: {
          quantity: existingCartItem.quantity + Number(quantity),
        },
      });
      return updated;
    } else {
      const created = await prisma.cart.create({
        data: {
          userId: String(userId),
          productId: String(productId),
          quantity: Number(quantity),
        },
      });
      return created;
    }
  }

  static async edit(req: Request) {
    const userId = req.user?.id as string;
    const { id } = req.params;
    const { quantity } = req.body;
    if (!userId) throw new Error('User not found');
    const existingCartItem = await prisma.cart.findUnique({
      where: { id: String(id), userId: String(userId) },
    });
    if (!existingCartItem) {
      throw new Error('Cart item not found or not belong to this user');
    }
    const updatedCartItem = await prisma.cart.update({
      where: { id: String(id) },
      data: {
        quantity: Number(quantity),
      },
    });
    return updatedCartItem;
  }

  static async deleteCartItem(req: Request) {
    const userId = req.user?.id as string;
    const { id } = req.params;
    if (!userId) throw new Error('User not found');
    const existingCartItem = await prisma.cart.findUnique({
      where: { id: String(id), userId: String(userId) },
    });
    if (!existingCartItem) {
      throw new Error('Cart item not found or not belong to this user');
    }
    const deletedCartItem = await prisma.cart.delete({
      where: { id: String(id) },
    });
    return deletedCartItem;
  }

  static async clear(req: Request) {
    const userId = req.user?.id as string;
    if (!userId) throw new Error('User not found');
    const deletedCartItems = await prisma.cart.deleteMany({
      where: { userId: String(userId) },
    });
    return deletedCartItems;
  }
}
export default CartService;
