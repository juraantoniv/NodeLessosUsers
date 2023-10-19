"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const s3_service_1 = require("./s3.service");
const User_model_1 = require("../models/User.model");
class UserService {
    async getAll() {
        const users = await user_repository_1.userRepository.getAll();
        return users;
    }
    async DeleteUser(id) {
        await user_repository_1.userRepository.Delete(id);
    }
    async updateUser(id, user) {
        return await user_repository_1.userRepository.updateName(id, user);
    }
    async findUser(name) {
        return await user_repository_1.userRepository.findByName(name);
    }
    async uploadAvatar(avatar, userId) {
        const checkUser = await user_repository_1.userRepository.findByID(userId);
        if (checkUser.avatar) {
            await s3_service_1.s3Service.deleteFile(checkUser.avatar);
        }
        const filePath = await s3_service_1.s3Service.uploadFile(avatar, s3_service_1.EFileTypes.User, userId.toString());
        const user = await User_model_1.User.findByIdAndUpdate(userId, { avatar: filePath }, {
            returnDocument: "after"
        });
        return user;
    }
}
exports.userService = new UserService();
