import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../secrets";
import { BadRequestException } from "../exception/BadRequestException";
import { ErrorCode } from "../exception/HttpException";
import { UserNotFoundException } from "../exception/UserNotFoundException";

export const signup = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password, name } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });

    if (user) {
        next(new BadRequestException("User already exist", ErrorCode.USER_ALREADY_EXIST));
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

export const signin = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });

    if (!user) {
        next(new UserNotFoundException(`${email} user does not exist`, ErrorCode.USER_NOT_FOUND));
    }
    if (!compareSync(password, user!.password)) {
        throw Error("Password is incorrect");
    }

    const token = jwt.sign({
        userId: user!.id
    }, JWT_SECRET);

    res.status(200).json({
        user: user!.name,
        token: token
    });
}