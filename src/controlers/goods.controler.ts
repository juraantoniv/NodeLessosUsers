import { NextFunction, Request, Response } from "express";
import {userService} from "../services/user.servise";
import {IUser} from "../types/user.type";
import {userMiddleware} from "../midlewares/user.midleware";
import {GoodsValidator} from "../validators/goods.validator";
import {ApiError} from "../errors/api.errors";
import {User} from "../models/User.model";
import {goodsRepository} from "../repositories/goods.repostitory";
import {goodsService} from "../services/goods.services";
import {Goods} from "../models/goodsModel";
import {tokenService} from "../services/tocken.service";
import {IGoods} from "../types/goods.types";
import {buyDataRepository} from "../repositories/bought.data.repository";
import {buyDataService} from "../services/buy.data.service";
import {IPaginationResponse, IQuery} from "../types/pagination.type";

class GoodsController {
    public async getAll(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response<IPaginationResponse<IGoods>>> {

        const accessToken = req.get("Authorization");


        try {

            const goods = await goodsService.getAllWithPagination(req.query as IQuery);

            const {userId} = await tokenService.checkToken(accessToken,'access')

            // const goods = await goodsRepository.getAll();
            return res.json({goods})
        } catch (e) {
            next(e);
        }
    }
    public async buyGoods(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response<void>> {

        const {goodId} = req.body

        const payload = req.res.locals.tokenPayload

        try {
            const good = await goodsRepository.findGoodById(goodId)
            if (good.boughtBy===payload.userId && goodId!==0){
                throw new ApiError(`Good sold`,404)
            }

               await goodsService.buyGoods(payload.userId,goodId)

                    const goods = await goodsRepository.findGoodById(goodId)

            await Promise.all([
                buyDataService.create(goods, goods._id),
                Goods.deleteOne({_id:goodId})
            ])

            return res.json({
                data: goods
            })
        } catch (e) {
            next(e);
        }
    }
    public async Create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const accessToken = req.get("Authorization");


        try {
            const {userId} = await tokenService.checkToken(accessToken,'access')


            if (!userId){
                throw new ApiError('Token not valid', 404)
            }

            const { error, value } = GoodsValidator.create.validate(req.body);
            if (error) {
                throw new ApiError(error.message, 400);
            }
            const newGood =  await goodsService.Create(value);
            return res.status(201).json(newGood);
        }

        catch (e) {

            next(e)
        }

    }
    public async Delete(req: Request, res: Response, next: NextFunction): Promise<Response> {

        try {
            const { id } = req.body
            if (!id) {
                throw new ApiError('Something Wrong', 400);
            }
            await goodsService.DeleteGood(id);
            return res.status(201).json('Good was deleted');
        } catch (e) {
            next(e);
        }

    }
    public async Update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const {id, name} = req.body.data;
            const user = await Goods.find({_id:id});


            if (!user) {
                throw new ApiError("Good not found", 404);

            }


            const goodForUpdate = user[0]

            goodForUpdate.name = name

            const us = await goodsService.updateGood(id, goodForUpdate)
            return  res.status(201).json(us);
        }
        catch (e) {
            next(e)
        }
    }
    public async findByName(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { name} = req.params;

            console.log('name')

            const us = await userService.findUser(name)
            return  res.status(201).json(us);
        }
        catch (e) {
            next(e)
        }
    }
}



export const goodsController = new GoodsController();


