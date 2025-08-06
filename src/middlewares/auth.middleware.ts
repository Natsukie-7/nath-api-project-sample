import ENV from '@config/env.ts';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.ts';

const { JWT_SECRET, JWT_EXPIRES_IN } = ENV;

const authorized = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization = null } = req.headers;

    let token;

    if (authorization && authorization.startsWith('Bearer ')) {
      token = authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'Acesso não autorizado',
        error: 'Token não fornecido',
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    const user = await User.findById(decoded.id);

    req.user = user;

    next();
  } catch (error: any) {
    res.status(401).json({
      message: 'Acesso não autorizado',
      error: error.message,
    });
  }
};

export default authorized;
