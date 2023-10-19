
import {BoughtType, IGoods} from "../types/goods.types";
import {Goods} from "../models/goodsModel";
import {FilterQuery} from "mongoose";

class GoodsRepository {
    public async getAll(): Promise<IGoods[]> {
        return await Goods.find();
    }

    public async Create(goods: IGoods): Promise<IGoods> {
        return  await Goods.create(goods);
    }

    public async Delete(id: string): Promise<void> {
        await Goods.findByIdAndDelete(id)
    }
    public async updateName(id: string,newUser:IGoods): Promise<IGoods> {
        return await Goods.findByIdAndUpdate(id,newUser)
    }
    public async findByName(name:string): Promise<IGoods[]> {

        const user = await Goods.find({name: name})

        return  user

    }
    public async findByID(userId: FilterQuery<IGoods>): Promise<IGoods[]> {

        const user = await Goods.find({boughtBy:userId})

        return  user

    }
    public async findByIdUpdate(userId:IGoods, goodId:string): Promise<IGoods> {

        const good = await Goods.findByIdAndUpdate(goodId,{boughtBy:userId})

        return  good

    }
    public async findGoodById( goodId: string ): Promise<BoughtType> {


        const good = await Goods.findById(goodId).lean()

        return  good

    }
}

export const goodsRepository = new GoodsRepository();