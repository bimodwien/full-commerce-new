'use strict';

import UserService from '@/services/user.service';
import { Request, Response, NextFunction } from 'express';

export class UserController {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { access_token, refresh_token } = await UserService.login(req);
      res
        .status(200)
        .cookie('access_token', access_token)
        .cookie('refresh_token', refresh_token)
        .json({
          message: 'Login success',
          access_token,
          refresh_token,
        });
    } catch (error) {
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await UserService.register(req);
      res.status(200).send({
        message: 'Register success',
        user: data,
      });
    } catch (error) {
      next(error);
    }
  };

  findAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await UserService.findAllUser();
      res.status(200).send({
        message: 'User list retrieved successfully',
        users: data,
      });
    } catch (error) {
      next(error);
    }
  };
}
