import { Router } from "express";
import { signup } from "../controller/loginController";

export const authRouter: Router = Router();
authRouter.post('/signup', signup);
