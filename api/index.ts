import express, { Request, Response, Application, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/user.router';
import authRouter from './routers/auth.router';
import signupRouter from './routers/signup.router';

//For env File
dotenv.config();

mongoose
  .connect(process.env.MONGOINFOLOCAL as string)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.log(e.message);
  });
const app: Application = express();
const port: string = process.env.PORT || '8000';

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/signup', signupRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  // const statusCode: number = err.statusCode || 500;
  const errMessage: string = err.message || 'InternalServerError';
  return res.status(500).json({
    succsess: false,
    message: errMessage,
    status: 500,
  });
});
