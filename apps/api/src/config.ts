import { config } from 'dotenv';
import { resolve } from 'path';
import { CorsOptions } from 'cors';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

// Load all environment variables from .env file

export const PORT = process.env.PORT || 8001;
export const DATABASE_URL = process.env.DATABASE_URL || '';

export const SECRET_KEY = (process.env.SECRET_KEY as string) || '';

export const corsOption: CorsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
