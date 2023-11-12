
import {IGoods, IGoodsForMany} from "../types/goods.types";
import {goodsRepository} from "../repositories/goods.repostitory";
import {IPaginationResponse, IQuery} from "../types/pagination.type";
import {ApiError} from "../errors/api.errors";
import {FilterQuery} from "mongoose";
import axios from "axios";
import {configs} from "../configs/config";
import {checkWordsService} from "./check.words.service";
import {Cars} from "../models/goodsModel";

class UserService {
    public async getAll(): Promise<IGoods[]> {
        const users = await goodsRepository.getAll();

        return users;
    }
    public async getAllWithPagination(
        query: IQuery,
    ): Promise<IPaginationResponse<IGoods>> {
        try {
            const queryStr = JSON.stringify(query);
            const queryObj = JSON.parse(
                queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
            );

            console.log(queryObj);
            const {
                page = 1,
                limit = 5,
                sortedBy = "createdAt",
                ...searchObject
            } = queryObj;

            const skip = +limit * (+page - 1);
            const [users, itemsFound] = await Promise.all([
                Cars.find(searchObject).limit(+limit).skip(skip).sort(sortedBy),
                Cars.count(searchObject),
            ]);

            console.log(users);

            return {
                page: +page,
                limit: +limit,
                itemsFound: itemsFound,
                data: users,
            };
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
    public async Create(user:IGoods): Promise<IGoods> {

        await checkWordsService.check(user.description)


        return await goodsRepository.Create(user);

    }

    public async DeleteGood(id:string): Promise<void> {
        await goodsRepository.Delete(id);

    }
    public async updateGood(id:string,user:IGoods): Promise<IGoods> {
        return await goodsRepository.updateName(id,user);

    }
    public async findUser(name:string): Promise<any> {
        return await goodsRepository.findByName(name);

    }
    public async buyGoods(userId:IGoods, goodId:string): Promise<IGoods> {

        return await goodsRepository.findByIdUpdate(userId,goodId)

    }
    public async getByCarId(carId:string): Promise<IGoodsForMany> {

        return await goodsRepository.findGoodById(carId)

    }

}

export const goodsService = new UserService();