import { RequestHandler, Router } from 'express';

type GroupCallback = (router: NestedRouter) => void;

export interface NestedRouter extends ReturnType<typeof Router> {
  path: string;
  middlewares: RequestHandler[];
  group: (
    path: string,
    ...handlersAndCallback: [...RequestHandler[], GroupCallback]
  ) => void;
}

export default function nestedRouter(): NestedRouter {
  const baseRouter = Router({ mergeParams: true }) as NestedRouter;

  baseRouter.path = '';
  baseRouter.middlewares = [];

  baseRouter.group = function (path, ...requestHandlers) {
    const parent = this as NestedRouter;

    const middlewares = requestHandlers.slice(0, -1) as RequestHandler[];
    const callback = requestHandlers[
      requestHandlers.length - 1
    ] as GroupCallback;

    const childrenPath = `${parent.path}${path}`.replace(/\/+/g, '/');

    const childRouter = Router({ mergeParams: true }) as NestedRouter;
    childRouter.path = childrenPath;
    childRouter.middlewares = [...parent.middlewares, ...middlewares];

    childRouter.group = baseRouter.group;

    parent.use(path, ...middlewares, childRouter);

    callback(childRouter);
  };

  return baseRouter;
}
