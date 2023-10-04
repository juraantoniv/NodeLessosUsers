"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_servise_1 = require("../services/user.servise");
const api_errors_1 = require("../errors/api.errors");
const User_model_1 = require("../models/User.model");
class UserController {
    async getAll(req, res, next) {
        console.log('all');
        try {
            const users = await user_servise_1.userService.getAll();
            return res.json({
                data: users,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async Delete(req, res, next) {
        try {
            const { id } = req.body;
            if (!id) {
                throw new api_errors_1.ApiError('Something Wrong', 400);
            }
            await user_servise_1.userService.DeleteUser(id);
            return res.status(201).json('User was deleted');
        }
        catch (e) {
            next(e);
        }
    }
    async Update(req, res, next) {
        try {
            const { id, name } = req.body.data;
            const user = await User_model_1.User.find({ _id: id });
            if (!user) {
                throw new api_errors_1.ApiError("User not found", 404);
            }
            const userForUpdate = user[0];
            userForUpdate.email = name;
            const us = await user_servise_1.userService.updateUser(id, userForUpdate);
            return res.status(201).json(us);
        }
        catch (e) {
            next(e);
        }
    }
    async findByName(req, res, next) {
        try {
            const { name } = req.params;
            console.log('name');
            const us = await user_servise_1.userService.findUser(name);
            return res.status(201).json(us);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
