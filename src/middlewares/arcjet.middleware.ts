import aj from '@config/arcjet';
import { NextFunction, Request, Response } from 'express';

const arcjetMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: 'Rate limit exceded' });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({ message: 'Rate bot detected' });
      }

      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  } catch (error) {
    console.log(`arcjet middleware Error: ${error}`);
    next(error);
  }
};

export default arcjetMiddleware;
