import express, { Router } from 'express';
import { getUsers } from '../controllers/user.controller';

const userRouter: Router = express.Router();

userRouter.get('/', getUsers);

export default userRouter;
