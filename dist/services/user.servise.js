"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_1 = require("../repositories/user.repository");
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
}
exports.userService = new UserService();
