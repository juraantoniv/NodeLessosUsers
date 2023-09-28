import { User } from "../models/User.model";
import { IUser } from "../types/user.type";

class UserRepository {
    public async getAll(): Promise<IUser[]> {
        return await User.find();
    }

    public async Create(user: IUser): Promise<IUser> {
        return  await User.create(user);
    }

    public async Delete(id: string): Promise<void> {
        await User.findByIdAndDelete(id)
    }
    public async updateName(id: string,newUser:any): Promise<any> {
        return await User.findByIdAndUpdate(id,newUser)
    }
}

export const userRepository = new UserRepository();