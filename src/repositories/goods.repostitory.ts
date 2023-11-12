
import {BoughtType, IGoods} from "../types/goods.types";
import {Cars} from "../models/goodsModel";
import {FilterQuery, UpdateQuery} from "mongoose";

class GoodsRepository {
    public async getAll(): Promise<IGoods[]> {
        return await Cars.find();
    }

    public async Create(goods: IGoods): Promise<IGoods> {
        const good =  await Cars.create(goods)
        return  good
    }

    public async Delete(id: string): Promise<void> {
        await Cars.findByIdAndDelete(id)
    }
    public async updateName(id: string,newUser:IGoods): Promise<IGoods> {
        return await Cars.findByIdAndUpdate(id,newUser)
    }
    public async findByName(name:string): Promise<IGoods[]> {

        const user = await Cars.find({name: name})

        return  user

    }
    public async findByID(userId: FilterQuery<IGoods>): Promise<IGoods[]> {

        const user = await Cars.find({userId})

        return  user

    }
    public async findByIdUpdate(userId:IGoods, goodId:string): Promise<IGoods> {

        const good = await Cars.findByIdAndUpdate(goodId,{boughtBy:userId})

        return  good

    }
    public async findByIdImageUpdate(image: UpdateQuery<IGoods>, goodId:string): Promise<IGoods> {

        const good = await Cars.findByIdAndUpdate(goodId,{image}).lean()

        return  good

    }
    public async findGoodById( goodId: string ): Promise<IGoods> {
        const good = await Cars.findById(goodId).lean()

        return  good

    }

    public async findGoodsViews(date: Date, id:string) {
        return await Cars.aggregate([
            {
                $lookup: {
                    from: "userViews",
                    localField: "_id",
                    foreignField: "_carId",
                    as: "views",
                },
            },
            {
                $match: {
                    views: {
                        $not: {
                            $elemMatch: {
                                _id:id,
                                createdAt: {
                                    $gte: date, // Greater than or equal to the beginning of the day
                                    $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000), // Less than the beginning of the next day
                                },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                },
            },
        ]);
    }
    public async findGoodsViewsWeek(date: Date, id:string){
        return await Cars.aggregate([
            {
                $lookup: {
                    from: "userViews",
                    localField: "_id",
                    foreignField: "_carId",
                    as: "views",
                },
            },
            {
                $match: {
                    views: {
                        $not: {
                            $elemMatch: {
                                id:id,
                                createdAt: {
                                    $gte: date,
                                    $lt: new Date(date.getDate() -7),
                                },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    name:1,
                },
            },
        ]);
    }
}

export const goodsRepository = new GoodsRepository();