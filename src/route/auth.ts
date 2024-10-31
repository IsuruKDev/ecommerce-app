import { Router } from "express";
import { login } from "../controller/loginController";

export const authRouter: Router = Router();
authRouter.get('/login', login);
