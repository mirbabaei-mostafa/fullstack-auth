import express, { Router } from 'express';
import { addUser } from '../controllers/user.controller';

const signupRouter: Router = express.Router();

signupRouter.post('/', addUser);

export default signupRouter;
