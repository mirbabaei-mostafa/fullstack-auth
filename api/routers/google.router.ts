import express, { Router } from "express";
import { googleUser } from "../controllers/user.controller";

const googleRouter: Router = express.Router();
googleRouter.post("/", googleUser);

export default googleRouter;
