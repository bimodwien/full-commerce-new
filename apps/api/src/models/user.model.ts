import { Role } from '@prisma/client';

export type TUser = {
  id: string;
  name: string;
  email: string;
  username: string;
  password?: string;
  role: Role;
};

export type TDecode = {
  type: string;
  user: TUser;
};
