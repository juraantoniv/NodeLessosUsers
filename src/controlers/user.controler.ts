import { NextFunction, Request, Response } from "express";
import {userService} from "../services/user.servise";
import {IUser} from "../types/user.type";

class UserController {
    public async getAll(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response<IUser[]>> {
        try {
            const users = await userService.getAll();

            return res.json({
                data: users,
            })
        } catch (e) {
            next(e);
        }
    }
    public async Create(user:IUser): Promise<IUser> {
            return  await userService.Create(user);
    }
}

export const userController = new UserController();