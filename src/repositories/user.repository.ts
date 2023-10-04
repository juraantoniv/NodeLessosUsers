import { User } from "../models/User.model";
import {IUser, IUserCredentials} from "../types/user.type";

class UserRepository {
    public async getAll(): Promise<IUser[]> {
        return await User.find();
    }

    public async Delete(id: string): Promise<void> {
        await User.findByIdAndDelete(id)
    }
    public async updateName(id: string,newUser:any): Promise<IUser> {


        return await User.findByIdAndUpdate(id,newUser)
    }
    public async findByName(name:string): Promise<any> {

        const user = await User.find({name: name})

        return  user

    }

    public async register(dto: IUserCredentials): Promise<IUser> {
        return await User.create(dto);
    }
}

export const userRepository = new UserRepository();