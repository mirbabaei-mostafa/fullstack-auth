import express, { Router } from 'express';
import { checkUser } from '../controllers/user.controller';

const authRouter: Router = express.Router();
authRouter.post('/', checkUser);

export default authRouter;
