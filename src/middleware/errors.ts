import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exception/HttpException";


export const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    response.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        errors: error.errors
    })
}