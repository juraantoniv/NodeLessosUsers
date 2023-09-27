
import { IUser } from "../types/user.type";
import {userRepository} from "../repositories/user.repository";

class UserService {
    public async getAll(): Promise<IUser[]> {
        const users = await userRepository.getAll();

        return users;
    }
    public async Create(user:IUser): Promise<IUser> {


        return await userRepository.Create(user);

    }
}

export const userService = new UserService();