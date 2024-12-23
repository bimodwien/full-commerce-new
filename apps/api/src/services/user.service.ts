'use strict';
import { Request } from 'express';
import prisma from '@/prisma';
import { TUser } from '@/models/user.model';
import { hashPassword, comparePassword } from '@/lib/bcrypt';
import { createToken } from '@/lib/jwt';
import { Prisma } from '@prisma/client';

class UserService {
  static async register(req: Request) {
    const { name, username, email, password, role } = req.body as TUser;

    // validation role
    if (!['user', 'admin'].includes(role)) {
      throw new Error('Invalid role');
    }

    // check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // hash password
    const hashed = await hashPassword(String(password));

    // create user
    const data: Prisma.UserCreateInput = {
      name,
      username,
      email,
      password: hashed,
      role,
    };
    const newUser = await prisma.user.create({ data });
    return newUser;
  }

  static async login(req: Request) {
    const { username, password } = req.body as TUser;

    // check if user not exists
    const user = (await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: true,
        role: true,
      },
    })) as TUser;

    if (!user) {
      throw new Error('User not found');
    }

    // check password
    const isPasswordValid = await comparePassword(
      String(user.password),
      String(password),
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // delete password for security
    delete user.password;

    // create token from user
    const access_token = createToken({ user, type: 'access_token' }, '1d');
    const refresh_token = createToken({ user, type: 'refresh_token' }, '7d');

    return { access_token, refresh_token };
  }

  static async findAllUser() {
    // check if all users
    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
      },
    });

    return user;
  }
}

export default UserService;
