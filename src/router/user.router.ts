import { NextFunction, Request, Response, Router } from "express";
import {userController} from "../controlers/user.controler";
import {UserValidator} from "../validators/user.validator";
import {ApiError} from "../errors/api.errors";
import {User} from "../models/User.model";
import {IUser} from "../types/user.type";
import {userMiddleware} from "../midlewares/user.midleware";

const router = Router();

router.get("", userController.getAll);

router.post(
    "/",userMiddleware.createOrThrow
    ,async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { error, value } = UserValidator.create.validate(req.body.user);
            if (error) {
                throw new ApiError(error.message, 400);
            }
            const createdUser = await userController.Create(value);
            res.status(201).json(createdUser);
        } catch (e) {
            next(e);
        }
    },
);


export const userRouter = router;