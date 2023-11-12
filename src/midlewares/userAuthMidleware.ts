import {NextFunction, Request, Response} from "express";
import {ApiError} from "../errors/api.errors";
import {ERights} from "../enums/users.rights.enum";
import {tokenRepository} from "../repositories/token.repository";
import {tokenService} from "../services/tocken.service";
import {User} from "../models/User.model";

class AuthMiddlewareForCheck {
    public checkRightsOfUser(field: ERights) {

        return async (req: Request, res: Response, next: NextFunction) => {

            const accessToken = req.get("Authorization");


            try {

                const entity =  tokenRepository.findOne({ accessToken });
                const payload = tokenService.checkToken(accessToken, "access");

                const user = await User.findById(payload.userId).lean()

                if (user.rights !== field){

                    throw new ApiError('You don have rights to change user',201)
                }


                next();
            } catch (e) {
                next(e);
            }
        }

    };
}

export const authMiddlewareForCheck = new AuthMiddlewareForCheck();