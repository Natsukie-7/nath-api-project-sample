import { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controller.ts';
import authorized from '../middlewares/auth.middleware.ts';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', authorized, getUser);
userRouter.post('/', (req, res) => res.send({ title: 'Create new user' }));
userRouter.put('/:id', (req, res) => res.send({ title: 'Update user' }));
userRouter.delete('/:id', (req, res) => res.send({ title: 'Delete user' }));

export default userRouter;
