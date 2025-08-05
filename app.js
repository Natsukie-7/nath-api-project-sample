import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

import connectToDatabase from './database/mongodb.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to api-project');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(
    `Backend-api-project tracker is Running on port on http://localhost:${PORT}`
  );

  await connectToDatabase();
});

export default app;
