
import { IGoods } from "../types/goods.types";
import {goodsRepository} from "../repositories/goods.repostitory";

class UserService {
    public async getAll(): Promise<IGoods[]> {
        const users = await goodsRepository.getAll();

        return users;
    }
    public async Create(user:IGoods): Promise<IGoods> {


        return await goodsRepository.Create(user);

    }

    public async DeleteGood(id:string): Promise<void> {
        await goodsRepository.Delete(id);

    }
    public async updateGood(id:string,user:any): Promise<IGoods> {
        return await goodsRepository.updateName(id,user);

    }
    public async findUser(name:string): Promise<any> {
        return await goodsRepository.findByName(name);

    }
}

export const goodsService = new UserService();