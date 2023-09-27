import { User } from "../models/User.model";
import { IUser } from "../types/user.type";

class UserRepository {
    public async getAll(): Promise<IUser[]> {
        return await User.find();
    }

    public async Create(user: IUser): Promise<IUser> {
        return  await User.create(user);
    }
}

export const userRepository = new UserRepository();