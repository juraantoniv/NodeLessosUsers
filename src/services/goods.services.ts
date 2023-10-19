
import { IGoods } from "../types/goods.types";
import {goodsRepository} from "../repositories/goods.repostitory";
import {IPaginationResponse, IQuery} from "../types/pagination.type";
import {Goods} from "../models/goodsModel";
import {ApiError} from "../errors/api.errors";

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

            const {
                page = 1,
                limit = 5,
                sortedBy = "createdAt",
                ...searchObject
            } = queryObj;

            const skip = +limit * (+page - 1);

            const [users, itemsFound] = await Promise.all([
                Goods.find(searchObject).limit(+limit).skip(skip).sort(sortedBy),
                Goods.count(searchObject),
            ]);

            // const user = await User.findOne({
            //     email: "julianne.oconner@kory.org",
            // });
            //
            // // const userNameWithAge = user.nameWithAge(); // name + age
            //
            // // const user = await User.findByEmail("julianne.oconner@kory.org");
            // // console.log(user);

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
    public async buyGoods(userId:IGoods, goodId:string): Promise<IGoods> {

        return await goodsRepository.findByIdUpdate(userId,goodId)

    }
}

export const goodsService = new UserService();