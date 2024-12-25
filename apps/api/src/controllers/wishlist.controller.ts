'use strict';

import WishlistService from '@/services/wishlist.service';
import { Request, Response, NextFunction } from 'express';

export class WishlistController {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const wishlist = await WishlistService.getAll(req);
      res.status(200).send({
        message: 'get all wishlist',
        wishlist,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const wishlist = await WishlistService.getById(req);
      res.status(200).send({
        message: 'get wishlist by id',
        wishlist,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const wishlist = await WishlistService.create(req);
      res.status(201).send({
        message: 'create wishlist success',
        wishlist,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const wishlist = await WishlistService.deletedWishlistItem(req);
      res.status(200).send({
        message: 'delete wishlist success',
        wishlist,
      });
    } catch (error) {
      next(error);
    }
  };

  clearWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const wishlist = await WishlistService.clearWishlist(req);
      res.status(200).send({
        message: 'clear wishlist success',
        wishlist,
      });
    } catch (error) {
      next(error);
    }
  };
}
