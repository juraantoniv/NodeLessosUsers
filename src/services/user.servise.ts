
import { IUser } from "../types/user.type";
import {userRepository} from "../repositories/user.repository";

class UserService {
    public async getAll(): Promise<IUser[]> {
        const users = await userRepository.getAll();

        return users;
    }

    public async DeleteUser(id:string): Promise<void> {
        await userRepository.Delete(id);

    }
    public async updateUser(id:string,user:any): Promise<IUser> {
        return await userRepository.updateName(id,user);

    }
    public async findUser(name:string): Promise<any> {
        return await userRepository.findByName(name);

    }
}

export const userService = new UserService();