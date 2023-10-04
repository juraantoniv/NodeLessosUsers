import { NextFunction, Request, Response } from "express";


import { userRepository } from "../repositories/user.repository";
import {ApiError} from "../errors/api.errors";
import {UserValidator} from "../validators/user.validator";
import {User} from "../models/User.model";

class UserMiddleware {
    public async createOrThrow(req: Request, res: Response, next: NextFunction) {
        try {

            const { error, value } = UserValidator.register.validate(req.body);

            const user = await User.findOne({email: value.email});

            if (user) {
                throw new ApiError(`user with ${value.email} is already  in BD`, 404);
            }

            req.res.locals = user;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();