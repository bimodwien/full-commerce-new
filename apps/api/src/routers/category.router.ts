import { CategoryController } from '@/controllers/category.controller';
import { Router } from 'express';

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
    this.router.get('/:id', this.categoryController.getById);
    this.router.post('/', this.categoryController.create);
    this.router.put('/:id', this.categoryController.edit);
    this.router.delete('/:id', this.categoryController.deleteCategory);
  }

  getRouter(): Router {
    return this.router;
  }
}
