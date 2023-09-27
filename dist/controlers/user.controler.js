"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_servise_1 = require("../services/user.servise");
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
    async Create(user) {
        return await user_servise_1.userService.Create(user);
    }
}
exports.userController = new UserController();
