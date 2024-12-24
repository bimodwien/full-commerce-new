import { ProductController } from '@/controllers/product.controller';
import { Router } from 'express';
import { validateToken } from '@/middlewares/auth.middleware';
import { verifyAdmin } from '@/middlewares/role.middleware';
import { blobUploader } from '@/lib/multer';

export class ProductRouter {
  private router: Router;
  private productController: ProductController;

  constructor() {
    this.productController = new ProductController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.productController.getAll);
    this.router.get('/:id', this.productController.getById);
    this.router.post(
      '/',
      validateToken,
      verifyAdmin,
      blobUploader().single('productImage'),
      this.productController.create,
    );
    this.router.patch(
      '/:id',
      validateToken,
      verifyAdmin,
      blobUploader().single('productImage'),
      this.productController.edit,
    );
    this.router.delete(
      '/:id',
      validateToken,
      verifyAdmin,
      this.productController.deleteProduct,
    );
    this.router.get('/images/:id', this.productController.render);
  }

  getRouter(): Router {
    return this.router;
  }
}
