import { User } from "../models/User.model";
import {IUser, IUserCredentials} from "../types/user.type";
import {FilterQuery, Types, UpdateQuery} from "mongoose";

class UserRepository {
    public async getAll(): Promise<IUser[]> {
        return await User.find();
    }

    public async Delete(id: string): Promise<void> {
        await User.findByIdAndDelete(id)
    }
    public async updateName(id: string,newUser:UpdateQuery<IUser>): Promise<IUser> {


        return await User.findByIdAndUpdate(id,newUser)
    }
    public async findByName(name:string): Promise<any> {

        const user = await User.find({name: name})

        return  user

    }

    public async findByID(id:FilterQuery<IUser>): Promise<IUser> {

        const user = await User.findOne({_id: id})

        return  user

    }

    public async register(dto: IUserCredentials): Promise<IUser> {
        return await User.create(dto);
    }
}

export const userRepository = new UserRepository();