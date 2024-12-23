import { Request, Response, NextFunction } from 'express';
import prisma from '@/prisma';

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id as string;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.role !== 'admin') {
      const error = new Error('Unauthorized, only admin can access this API');
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id as string;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.role !== 'user') {
      const error = new Error('Unauthorized, only user can access this API');
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};
