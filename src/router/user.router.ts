import { NextFunction, Request, Response, Router } from "express";
import {userController} from "../controlers/user.controler";
import {UserValidator} from "../validators/user.validator";
import {ApiError} from "../errors/api.errors";
import {User} from "../models/User.model";
import {IUser} from "../types/user.type";
import {userMiddleware} from "../midlewares/user.midleware";
import {userMiddlewareForDel} from "../midlewares/userCheckIdMidleware";

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

router.delete(
    "/",userMiddlewareForDel.deleteThrow,async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.body
            if (!id) {
                throw new ApiError('Something Wrong', 400);
            }
             await userController.Delete(id);
            res.status(201).json('User was deleted');
        } catch (e) {
            next(e);
        }
    },
);

router.patch(
    "/",async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {id, name} = req.body.data;
            const user = await User.find({_id: id});
            if (!user) {
                throw new ApiError("User not found", 404);
            }
            const newUser = {...user, name: name}
            const us = await userController.Update(id, newUser)

            res.status(201).json(us);
        }
        catch (e) {
            next(e)
        }
    }
);



export const userRouter = router;