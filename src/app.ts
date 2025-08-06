import connectToDatabase from '@database/mongodb.ts';
import errorMiddleware from '@middlewares/error.middleware.ts';
import authRouter from '@routes/auth.routes.ts';
import subscriptionRouter from '@routes/subscription.routes.ts';
import userRouter from '@routes/user.routes.ts';
import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to api-project typescript');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);

app.listen(5500, async () => {
  console.log(
    `Backend-api-project tracker is Running on port on http://localhost:${5500}`
  );

  await connectToDatabase();
});

export default app;
