"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    async getAll() {
        const users = await user_repository_1.userRepository.getAll();
        return users;
    }
    async Create(user) {
        return await user_repository_1.userRepository.Create(user);
    }
}
exports.userService = new UserService();
