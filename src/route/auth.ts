import { Router } from "express";
import { signin, signup } from "../controller/loginController";

export const authRouter: Router = Router();
authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
