import { CategoryController } from '@/controllers/category.controller';
import { Router } from 'express';
import {
  validateToken,
  validateRefreshToken,
} from '@/middlewares/auth.middleware';
import { verifyAdmin } from '@/middlewares/role.middleware';

export class CategoryRouter {
  private router: Router;
  private categoryController: CategoryController;

  constructor() {
    this.categoryController = new CategoryController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.categoryController.getAll);
    this.router.get(
      '/:id',
      validateToken,
      verifyAdmin,
      this.categoryController.getById,
    );
    this.router.post(
      '/',
      validateToken,
      verifyAdmin,
      this.categoryController.create,
    );
    this.router.put(
      '/:id',
      validateToken,
      verifyAdmin,
      this.categoryController.edit,
    );
    this.router.delete(
      '/:id',
      validateToken,
      verifyAdmin,
      this.categoryController.deleteCategory,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
