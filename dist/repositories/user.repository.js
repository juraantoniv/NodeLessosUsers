"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const User_model_1 = require("../models/User.model");
class UserRepository {
    async getAll() {
        return await User_model_1.User.find();
    }
    async Delete(id) {
        await User_model_1.User.findByIdAndDelete(id);
    }
    async updateName(id, newUser) {
        return await User_model_1.User.findByIdAndUpdate(id, newUser);
    }
    async findByName(name) {
        const user = await User_model_1.User.find({ name: name });
        return user;
    }
    async findByID(id) {
        const user = await User_model_1.User.findOne({ _id: id });
        return user;
    }
    async register(dto) {
        return await User_model_1.User.create(dto);
    }
}
exports.userRepository = new UserRepository();
