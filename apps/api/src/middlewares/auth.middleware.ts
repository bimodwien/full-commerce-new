'use strict';

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { TDecode } from '@/models/user.model';
import { SECRET_KEY } from '../config';

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.replace('Bearer ', '') || '';
  if (!token) {
    return next(new Error('Missing token'));
  }

  try {
    const decode = verify(token, SECRET_KEY) as TDecode;
    if (decode.type !== 'access_token') throw new Error('Invalid token');
    req.user = decode.user;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return next(new Error('Missing token'));
  }

  try {
    const decode = verify(token!, SECRET_KEY) as TDecode;
    if (decode.type != 'refresh_token') throw new Error('invalid token');
    req.user = decode.user;
    next();
  } catch (error) {
    next(error);
  }
};
