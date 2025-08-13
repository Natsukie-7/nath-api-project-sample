// src/types/express.d.ts
import type { NextFunction, Request, Response } from 'express';

declare global {
  interface Error {
    statusCode?: number;
    code?: number;
    errors?: Record<string, { message: string }>;
  }

  export type HandlerReturn<T> = {
    status?: number;
    success?: boolean;
    message?: string;
    data?: T;
  };

  export type LoadRequest<
    Params = any,
    ResBody = any,
    ReqBody = any,
    Query = any,
  > = (
    req: Request<Params, ResBody, ReqBody, Query>,
    res: Response,
    next: NextFunction
  ) => HandlerReturn<ResBody> | Promise<HandlerReturn<ResBody>>;

  export type GetRequest<
    Params = unknown,
    ResBody = unknown,
    Query = unknown,
  > = (
    req: Request<Params, ResBody, undefined, Query>,
    res: Response,
    next: NextFunction
  ) => HandlerReturn<ResBody> | Promise<HandlerReturn<ResBody>>;

  export type PostRequest<ReqBody = unknown, ResBody = unknown> = (
    req: Request<{}, ResBody, ReqBody>,
    res: Response,
    next: NextFunction
  ) => HandlerReturn<ResBody> | Promise<HandlerReturn<ResBody>>;

  export type PutRequest<ReqBody = unknown, ResBody = unknown> = (
    req: Request<{}, ResBody, ReqBody>,
    res: Response,
    next: NextFunction
  ) => HandlerReturn<ResBody> | Promise<HandlerReturn<ResBody>>;

  export type DeleteRequest<Params = unknown, ResBody = unknown> = (
    req: Request<Params, ResBody, undefined>,
    res: Response,
    next: NextFunction
  ) => HandlerReturn<ResBody> | Promise<HandlerReturn<ResBody>>;
}
