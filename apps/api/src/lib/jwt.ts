import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '../config/index';

export const createToken = (payload: any, expiresIn: string = '1d') => {
  return sign(payload, SECRET_KEY, { expiresIn });
};
