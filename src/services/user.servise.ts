import {IUser} from "../types/user.type";
import {userRepository} from "../repositories/user.repository";
import fileUpload, {UploadedFile} from "express-fileupload";
import {EFileTypes, s3Service} from "./s3.service";
import {User} from "../models/User.model";
import {FilterQuery, Types} from "mongoose";

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


    public async uploadAvatar(avatar: fileUpload.UploadedFile, userId: Types.ObjectId):Promise<IUser>{
        const checkUser = await userRepository.findByID(userId);
        if (checkUser.avatar) {
            await s3Service.deleteFile(checkUser.avatar);
        }
        const filePath = await s3Service.uploadFile(avatar,EFileTypes.User, userId.toString())
        const user = await User.findByIdAndUpdate(userId,{avatar:filePath},{
            returnDocument:"after"
        })

        return user

    }
}

export const userService = new UserService();