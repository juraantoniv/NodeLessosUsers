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

class GoodsController {
    public async getAll(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response<IUser[]>> {
        console.log('all')

        try {
            const goods = await goodsRepository.getAll();
            return res.json({
                data: goods,
            })
        } catch (e) {
            next(e);
        }
    }
    public async Create(req: Request, res: Response, next: NextFunction): Promise<Response> {

        console.log(req.body);

        try {
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


