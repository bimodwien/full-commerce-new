import 'dotenv/config';
import { CorsOptions } from 'cors';

export const SECRET_KEY = process.env.SECRET_KEY || 'rahasia';
export const corsOption: CorsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
