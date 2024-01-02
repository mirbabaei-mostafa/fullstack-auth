import express, { Request, Response, Application, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/user.router";
import authRouter from "./routers/auth.router";
import signupRouter from "./routers/signup.router";
import googleRouter from "./routers/google.router";

//For env File
dotenv.config();

mongoose
  .connect(process.env.MONGOINFOLOCAL as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e.message);
  });
const app: Application = express();
const port: string = process.env.PORT || "8000";

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/signup", signupRouter);
app.use("/api/google", googleRouter);
app.use("/api/update", googleRouter);
app.use("/api/imageupdate", googleRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  const errStatus: number = err.status || 500;
  const errMessage: string = err.message || "InternalServerError";
  return res
    .status(errStatus)
    .send({ success: false, message: errMessage, status: errStatus });
});
