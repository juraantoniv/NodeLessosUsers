"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const api_errors_1 = require("../errors/api.errors");
const user_validator_1 = require("../validators/user.validator");
const User_model_1 = require("../models/User.model");
class UserMiddleware {
    async createOrThrow(req, res, next) {
        try {
            const { error, value } = user_validator_1.UserValidator.register.validate(req.body);
            const user = await User_model_1.User.findOne({ email: value.email });
            if (user) {
                throw new api_errors_1.ApiError(`user with ${value.email} is already  in BD`, 404);
            }
            req.res.locals = user;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
