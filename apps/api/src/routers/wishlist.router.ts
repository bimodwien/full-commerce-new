import { WishlistController } from '@/controllers/wishlist.controller';
import { Router } from 'express';
import { validateToken } from '@/middlewares/auth.middleware';
import { verifyUser } from '@/middlewares/role.middleware';

export class WishlistRouter {
  private router: Router;
  private wishlistController: WishlistController;

  constructor() {
    this.router = Router();
    this.wishlistController = new WishlistController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      validateToken,
      verifyUser,
      this.wishlistController.getAll,
    );
    this.router.post(
      '/',
      validateToken,
      verifyUser,
      this.wishlistController.create,
    );
    this.router.delete(
      '/',
      validateToken,
      verifyUser,
      this.wishlistController.clearWishlist,
    );
    this.router.get(
      '/:id',
      validateToken,
      verifyUser,
      this.wishlistController.getById,
    );
    this.router.delete(
      '/:id',
      validateToken,
      verifyUser,
      this.wishlistController.deleteWishlist,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
