import { Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../secrets";

export const signup = async (req: Request, res: Response) => {

    const { email, password, name } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });

    if (user) {
        throw Error(`${email} user already exist`);
    }

    user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    })

    res.status(201).json(user);
}

export const signin = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });

    if (!user) {
        throw Error(`${email} user does not exist`);
    }
    if (!compareSync(password, user.password)) {
        throw Error("Password is incorrect");
    }

    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET);

    res.status(200).json({
        user: user.name,
        token: token
    });
}