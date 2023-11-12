import {NextFunction, Request, Response} from "express";
import {buyDataService} from "../services/buy.data.service";
import {tokenRepository} from "../repositories/token.repository";
import {tokenService} from "../services/tocken.service";
import {ApiError} from "../errors/api.errors";
import {BoughtType} from "../types/goods.types";
import {goodsRepository} from "../repositories/goods.repostitory";
import {buyDataRepository} from "../repositories/bought.data.repository";



class BuyController {

    public async getAllBuId ( req: Request, res: Response, next: NextFunction){
        try {

            const accessToken = req.get("Authorization");
            if (!accessToken) {
                throw new ApiError("No Token!", 401);
            }

            const entity = await tokenRepository.findOne({ accessToken });
            const payload = tokenService.checkToken(accessToken, "access");

            const goods = await goodsRepository.findByID(payload.userId)

            return res.status(201).json(goods);
        }
        catch (e) {
                next(e)
        }
    }

}


export const buyController = new BuyController();