import { Token } from "../models/Token.model";
import { IToken } from "../types/token.types";
import { FilterQuery } from "mongoose";
import {} from "express"

export class TokenRepository {
    public async create(dto: Partial<IToken>): Promise<IToken> {
        return await Token.create(dto);
    }
    public async delete(params: any): Promise<void> {
        await Token.deleteOne(params);
    }
    public async findOne(token: FilterQuery<IToken>): Promise<IToken> {
        return await Token.findOne(token);
    }
}

export const tokenRepository = new TokenRepository();