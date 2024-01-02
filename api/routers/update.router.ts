import express, { Router } from "express";
import { updateUser } from "../controllers/user.controller";

const updateRouter: Router = express.Router();
updateRouter.post("/", updateUser);

export default updateRouter;
