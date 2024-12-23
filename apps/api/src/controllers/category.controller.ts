'use strict';

import CategoryService from '@/services/category.service';
import { Request, Response, NextFunction } from 'express';

export class CategoryController {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await CategoryService.getAll(req);
      res.status(200).send({
        message: 'get all categories',
        category,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await CategoryService.getById(req);
      res.status(200).send({
        message: 'get category by ID',
        category,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await CategoryService.create(req);
      res.status(201).send({
        message: 'create category success',
        category,
      });
    } catch (error) {
      next(error);
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await CategoryService.edit(req);
      res.status(201).send({
        message: 'edit category success',
        category,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await CategoryService.deleteCategory(req);
      res.status(201).send({
        message: 'delete category success',
        category,
      });
    } catch (error) {
      next(error);
    }
  };
}
