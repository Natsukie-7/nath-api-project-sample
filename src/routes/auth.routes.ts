import { Router } from 'express';
import { createRoute } from 'utils/createRoute.ts';
import { signIn, signOut, signUp } from '../controllers/auth.controller.ts';

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', createRoute(signIn));
authRouter.post('/sign-out', signOut);

export default authRouter;
