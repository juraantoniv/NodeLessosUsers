import { Token } from "../models/Token.model";
import {IToken, ITokenActive} from "../types/token.types";
import { FilterQuery } from "mongoose";
import {} from "express"
import {TokenActive} from "../models/activeToken.model";

export class TokenActiveRepository {
    public async create(dto: Partial<ITokenActive>): Promise<ITokenActive> {
        return await TokenActive.create(dto);
    }
    public async delete(params: FilterQuery<{token:string}>): Promise<void> {
        await TokenActive.deleteOne(params);
    }
    public async findOne(token: FilterQuery<ITokenActive>): Promise<typeof TokenActive> {
        return await TokenActive.findOne(token);
    }
}

export const tokenActiveRepository = new TokenActiveRepository();