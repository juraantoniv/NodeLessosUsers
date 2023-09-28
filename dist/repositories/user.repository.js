"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const User_model_1 = require("../models/User.model");
class UserRepository {
    async getAll() {
        return await User_model_1.User.find();
    }
    async Create(user) {
        return await User_model_1.User.create(user);
    }
    async Delete(id) {
        await User_model_1.User.findByIdAndDelete(id);
    }
    async updateName(id, newUser) {
        return await User_model_1.User.findByIdAndUpdate(id, newUser);
    }
}
exports.userRepository = new UserRepository();
