import { Request, Response, NextFunction } from 'express';
import prisma from '@/prisma';

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.id as string;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user || user.role !== 'admin') {
    return res
      .status(401)
      .json({ message: 'Unauthorized, only admin can access this API' });
  }

  next();
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.id as string;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user || user.role !== 'user') {
    return res
      .status(401)
      .json({ message: 'Unauthorized, only user can access this API' });
  }

  next();
};
