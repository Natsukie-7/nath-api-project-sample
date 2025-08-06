import { Secret, SignOptions } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: 'production' | 'development';
      DB_URI: string;
      JWT_SECRET: Secret;
      JWT_EXPIRES_IN: SignOptions['expiresIn'];
      ARCJET_KEY: string;
      ARCJET_ENV: 'production' | 'development';
    }
  }
}

export {};
