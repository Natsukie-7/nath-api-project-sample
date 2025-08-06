import { createSubscription } from '@controllers/subscription.controller';
import authorized from '@middlewares/auth.middleware';
import { createRoute } from '@utils/createRoute';
import { Router } from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) =>
  res.send({ title: 'Get all subscription' })
);

subscriptionRouter.get('/:id', (req, res) =>
  res.send({ title: 'Get subscription details' })
);

subscriptionRouter.post('/', authorized, createRoute(createSubscription));

subscriptionRouter.put('/:id', (req, res) =>
  res.send({ title: 'Update subscription' })
);

subscriptionRouter.delete('/', (req, res) =>
  res.send({ title: 'Delete subscription' })
);

subscriptionRouter.delete('/user/:id', (req, res) =>
  res.send({ title: 'Get all user subscription' })
);

subscriptionRouter.put('/:id/cancel', (req, res) =>
  res.send({ title: 'Cancel subscription' })
);

subscriptionRouter.get('/upcoming-renewals', (req, res) =>
  res.send({ title: 'Get upcoming renewals' })
);

export default subscriptionRouter;
