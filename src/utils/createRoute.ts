// src/utils/handlerWrapper.ts

import type { NextFunction, Request, Response } from 'express';

export const createRoute =
  <Params = any, ResBody = any, ReqBody = any, Query = any>(
    handler: LoadRequest<Params, ResBody, ReqBody, Query>
  ) =>
  async (
    req: Request<Params, ResBody, ReqBody, Query>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await handler(req, res, next);

      if (res.headersSent) return;

      if (result) {
        const {
          status = 200,
          success = true,
          message = 'Success',
          data = null,
        } = result;

        res.status(status).json({ success, message, data });
      }
    } catch (err) {
      next(err);
    }
  };
