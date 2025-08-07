import { createSubscription } from '@controllers/subscription.controller';
import authorized from '@middlewares/auth.middleware';
import { createRoute } from '@utils/createRoute';
import { Router } from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) =>
  res.send({ title: 'Get all subscriptions' })
);

subscriptionRouter.get('/:id', (req, res) =>
  res.send({ title: 'Get subscription details' })
);

subscriptionRouter.get('/upcoming-renewals', (req, res) =>
  res.send({ title: 'Get upcoming renewals' })
);

const protectedRoutes = Router();

protectedRoutes.post('/', createRoute(createSubscription));

protectedRoutes.put('/:id', (req, res) =>
  res.send({ title: 'Update subscription' })
);

protectedRoutes.put('/:id/cancel', (req, res) =>
  res.send({ title: 'Cancel subscription' })
);

protectedRoutes.delete('/', (req, res) =>
  res.send({ title: 'Delete subscription' })
);

protectedRoutes.delete('/user/:id', (req, res) =>
  res.send({ title: 'Delete all user subscriptions' })
);

// Aplica middleware `authorized` a todas as rotas protegidas
subscriptionRouter.use(authorized, protectedRoutes);

export default subscriptionRouter;
