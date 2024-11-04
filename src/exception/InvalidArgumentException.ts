import { ErrorCode, HttpException } from "./HttpException";

export class InvalidArgumentException extends HttpException {
    constructor(message: string, errorCode: ErrorCode, errors: any) {
        super(message, errorCode, 400, errors);
    }
}