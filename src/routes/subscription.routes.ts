import { createSubscription } from '@controllers/subscription.controller';
import authorized from '@middlewares/auth.middleware';
import { createRoute } from '@utils/createRoute';
import nestedRouter from '@utils/nestedRouter';

const subscriptionRouter = nestedRouter();

subscriptionRouter.get('/', (req, res) =>
  res.send({ title: 'Get all subscriptions' })
);

subscriptionRouter.get('/upcoming-renewals', (req, res) =>
  res.send({ title: 'Get upcoming renewals' })
);

subscriptionRouter.group('/:id', authorized, (authorizedRouter) => {
  authorizedRouter.post('/', createRoute(createSubscription));
  authorizedRouter.put('/', (req, res) =>
    res.send({ title: 'Update subscription' })
  );
  authorizedRouter.delete('/', (req, res) =>
    res.send({ title: 'Delete subscription' })
  );

  authorizedRouter.put('/cancel', (req, res) =>
    res.send({ title: 'Cancel subscription' })
  );
});

export default subscriptionRouter;
