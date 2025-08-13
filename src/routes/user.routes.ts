import { GetUserSubscriptions } from '@controllers/subscription.controller';
import { getUser, getUsers } from '@controllers/user.controller';
import authorized from '@middlewares/auth.middleware';
import { createRoute } from '@utils/createRoute';
import nestedRouter from '@utils/nestedRouter';

const userRouter = nestedRouter();

userRouter.group('/:id', authorized, (authorizedRouter) => {
  authorizedRouter.get('/', createRoute(getUser));

  authorizedRouter.get('/subscriptions/', createRoute(GetUserSubscriptions));
});

userRouter.get('/', createRoute(getUsers));
userRouter.post('/', (req, res) => res.send({ title: 'Create new user' }));
userRouter.put('/:id', (req, res) => res.send({ title: 'Update user' }));
userRouter.delete('/:id', (req, res) => res.send({ title: 'Delete user' }));

export default userRouter;
