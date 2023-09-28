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
    public async Delete(id:string): Promise<void> {
          await userService.DeleteUser(id);
    }
    public async Update(id:string,user:any): Promise<any> {
        return await userService.updateUser(id,user);
    }
}

export const userController = new UserController();