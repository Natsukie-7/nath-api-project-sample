import { getUser, getUsers } from '@controllers/user.controller';
import authorized from '@middlewares/auth.middleware';
import { createRoute } from '@utils/createRoute';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', createRoute(getUsers));
userRouter.get('/:id', authorized, createRoute(getUser));
userRouter.post('/', (req, res) => res.send({ title: 'Create new user' }));
userRouter.put('/:id', (req, res) => res.send({ title: 'Update user' }));
userRouter.delete('/:id', (req, res) => res.send({ title: 'Delete user' }));

export default userRouter;
