import {NextFunction, Response, Request} from "express";
import {ITokenPayload, ITokensPair} from "../types/token.types";
import {authService} from "../services/auth.service";
import {GoodsValidator} from "../validators/goods.validator";
import {ApiError} from "../errors/api.errors";
import {UserValidator} from "../validators/user.validator";
import {IUserCredentials} from "../types/user.type";
import {userRepository} from "../repositories/user.repository";

class AuthController {
    public async register(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response<void>> {
        console.log(req.body);
        try {
            const { error, value } = UserValidator.register.validate(req.body);

            await authService.register(value)
            if (error) {
                throw new ApiError(error.message, 400);
            }
            return res.status(201).json('User Created');
        } catch (e) {
            next(e);
        }
    }
    public async login(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response<ITokensPair>> {

        try {

            const { error, value } = UserValidator.login.validate(req.body);

            if (error){
                throw new ApiError(error.message,400)
            }
            const tokensPair = await authService.login(value);

            return res.json(tokensPair);
        } catch (e) {
            next(e);
        }
    }
    public async refresh(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response<ITokensPair>> {
        try {
            const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
            const refreshToken = req.res.locals.refreshToken as string;

            const tokensPair = await authService.refresh(tokenPayload, refreshToken);

            return res.status(201).json(tokensPair);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController()