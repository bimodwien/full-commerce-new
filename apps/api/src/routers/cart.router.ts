import { CartController } from '@/controllers/cart.controller';
import { Router } from 'express';
import { validateToken } from '@/middlewares/auth.middleware';
import { verifyUser } from '@/middlewares/role.middleware';

export class CartRouter {
  private router: Router;
  private cartController: CartController;

  constructor() {
    this.cartController = new CartController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', validateToken, verifyUser, this.cartController.getAll);
    this.router.post(
      '/',
      validateToken,
      verifyUser,
      this.cartController.create,
    );
    this.router.delete(
      '/',
      validateToken,
      verifyUser,
      this.cartController.clearCart,
    );
    this.router.get(
      '/:id',
      validateToken,
      verifyUser,
      this.cartController.getById,
    );
    this.router.patch(
      '/:id',
      validateToken,
      verifyUser,
      this.cartController.edit,
    );
    this.router.delete(
      '/:id',
      validateToken,
      verifyUser,
      this.cartController.deleteCart,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
