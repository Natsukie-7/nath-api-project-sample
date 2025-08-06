import { JWT_SECRET } from '../config/env.ts';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.ts';

const authorized = async (req, res, next) => {
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

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: 'Acesso não autorizado',
      error: error.message,
    });
  }
};

export default authorized;
