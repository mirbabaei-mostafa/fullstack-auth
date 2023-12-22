import express, { Express, Request, Response, Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/user.router";

//For env File
dotenv.config();

mongoose
  .connect(process.env.MONGOINFOLOCAL as string)
  .then(() => {
    console.log("Connected");
  })
  .catch((e) => {
    console.log(e.message);
  });
const app: Application = express();
const port: string = process.env.PORT || "8000";

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

app.use("/api/users", userRouter);
