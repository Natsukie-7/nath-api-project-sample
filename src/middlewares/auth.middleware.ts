import ENV from '@config/env';
import User from '@models/user.model';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = ENV;

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

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(412).json({
        message: 'Usuario não autorizado',
        error: 'usuario não fornecido',
      });
    }

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
