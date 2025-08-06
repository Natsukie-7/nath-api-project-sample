import { Router } from 'express';
import { createRoute } from 'utils/createRoute.ts';
import { signIn, signOut, signUp } from '../controllers/auth.controller.ts';

const authRouter = Router();

authRouter.post('/sign-up', createRoute(signUp));
authRouter.post('/sign-in', createRoute(signIn));
authRouter.post('/sign-out', createRoute(signOut));

export default authRouter;
