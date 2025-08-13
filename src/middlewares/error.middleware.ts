// src/middlewares/error.middleware.ts

import type { NextFunction, Request, Response } from 'express';

// Tipagem opcional de erro customizado
interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose bad ObjectId error
  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  }

  // Mongoose validation error
  if (err.name === 'ValidationError' && err.errors) {
    const messages = Object.values(err.errors).map(({ message }) => message);
    message = messages.join(', ');
    statusCode = 400;
  }

  const response: Record<string, any> = {
    success: false,
    message,
  };

  console.log('error on', err.cause);

  res.status(statusCode).json(response);
};

export default errorMiddleware;
