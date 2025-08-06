declare global {
  namespace NodeJs {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: Enviroment;
      DB_URI: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
    }

    type Enviroment = 'production' | 'development';
  }
}

export {};
