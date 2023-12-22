import express, { Request, Response, Application, Router } from "express";

const userRouter: Router = express.Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.json({
    username: "mostafa",
    email: "mostafa@mostafa.com",
    password: "mostafa",
  });
});

export default userRouter;
