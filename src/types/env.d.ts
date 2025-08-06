import { SignOptions } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: 'production' | 'development';
      DB_URI: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: SignOptions['expiresIn'];
    }
  }
}

export {};
