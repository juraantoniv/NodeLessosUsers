"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_servise_1 = require("../services/user.servise");
const api_errors_1 = require("../errors/api.errors");
const User_model_1 = require("../models/User.model");
const tocken_service_1 = require("../services/tocken.service");
class UserController {
    async getAll(req, res, next) {
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
        const payload = req.res.locals.tokenPayload;
        console.log(payload);
        try {
            const dto = req.body;
            const user = await User_model_1.User.findOne({ _id: payload.userId });
            if (!user) {
                throw new api_errors_1.ApiError("User not found", 404);
            }
            const us = await user_servise_1.userService.updateUser(payload.userId, dto);
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
    async uploadAvatar(req, res, next) {
        const avatar = req.files.avatar;
        try {
            const accessToken = req.get("Authorization");
            const payload = tocken_service_1.tokenService.checkToken(accessToken, "access");
            const user = await user_servise_1.userService.uploadAvatar(avatar, payload.userId);
            return res.status(201).json(user);
        }
        catch (e) {
        }
    }
}
exports.userController = new UserController();
