import {BoughtType} from "../types/goods.types";
import {buyDataRepository, ByDataRepository} from "../repositories/bought.data.repository";
import {boughtSchema} from "../models/bought.data.usersModel";


class BuyDataService {
    public async getAll(): Promise<BoughtType[]> {
        const users = await buyDataRepository.getAll();

        return users;
    }
    public async create(data:BoughtType, goodsId: string): Promise<void> {
        await buyDataRepository.create(data, goodsId);
    }
    public async getByUserId(id:string): Promise<BoughtType[]> {
        return await buyDataRepository.getByUserId(id);
    }

}

export const buyDataService = new BuyDataService();