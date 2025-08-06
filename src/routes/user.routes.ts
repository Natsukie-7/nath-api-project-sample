import { getUser, getUsers } from '@controllers/user.controller.ts';
import { createRoute } from '@utils/createRoute.ts';
import { Router } from 'express';
import authorized from '../middlewares/auth.middleware.ts';

const userRouter = Router();

userRouter.get('/', createRoute(getUsers));
userRouter.get('/:id', authorized, createRoute<any>(getUser));
userRouter.post('/', (req, res) => res.send({ title: 'Create new user' }));
userRouter.put('/:id', (req, res) => res.send({ title: 'Update user' }));
userRouter.delete('/:id', (req, res) => res.send({ title: 'Delete user' }));

export default userRouter;
