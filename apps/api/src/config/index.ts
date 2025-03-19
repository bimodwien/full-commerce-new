import 'dotenv/config';
import { CorsOptions } from 'cors';

export const corsOption: CorsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
