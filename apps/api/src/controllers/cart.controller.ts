'use strict';

import CartService from '@/services/cart.service';
import { Request, Response, NextFunction } from 'express';

export class CartController {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const carts = await CartService.getAll(req);
      res.status(200).send({
        message: 'get all carts',
        carts,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cart = await CartService.getById(req);
      res.status(200).send({
        message: 'get cart by id',
        cart,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cart = await CartService.create(req);
      res.status(201).send({
        message: 'create cart success',
        cart,
      });
    } catch (error) {
      next(error);
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cart = await CartService.edit(req);
      res.status(200).send({
        message: 'edit cart success',
        cart,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cart = await CartService.deleteCartItem(req);
      res.status(200).send({
        message: 'delete cart success',
        cart,
      });
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cart = await CartService.clear(req);
      res.status(200).send({
        message: 'clear cart success',
        cart,
      });
    } catch (error) {
      next(error);
    }
  };
}
