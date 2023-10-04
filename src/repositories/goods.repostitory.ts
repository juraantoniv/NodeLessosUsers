
import {IGoods} from "../types/goods.types";
import {Goods} from "../models/goodsModel";

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
    public async updateName(id: string,newUser:any): Promise<IGoods> {
        return await Goods.findByIdAndUpdate(id,newUser)
    }
    public async findByName(name:string): Promise<IGoods[]> {

        const user = await Goods.find({name: name})

        return  user

    }
}

export const goodsRepository = new GoodsRepository();