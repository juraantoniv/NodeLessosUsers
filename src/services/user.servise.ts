
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

    public async DeleteUser(id:string): Promise<void> {
        await userRepository.Delete(id);

    }
    public async updateUser(id:string,user:any): Promise<any> {
        return await userRepository.updateName(id,user);

    }
}

export const userService = new UserService();