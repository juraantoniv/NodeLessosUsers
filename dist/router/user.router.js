"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controler_1 = require("../controlers/user.controler");
const user_validator_1 = require("../validators/user.validator");
const api_errors_1 = require("../errors/api.errors");
const User_model_1 = require("../models/User.model");
const user_midleware_1 = require("../midlewares/user.midleware");
const userCheckIdMidleware_1 = require("../midlewares/userCheckIdMidleware");
const router = (0, express_1.Router)();
router.get("", user_controler_1.userController.getAll);
router.post("/", user_midleware_1.userMiddleware.createOrThrow, async (req, res, next) => {
    try {
        const { error, value } = user_validator_1.UserValidator.create.validate(req.body.user);
        if (error) {
            throw new api_errors_1.ApiError(error.message, 400);
        }
        const createdUser = await user_controler_1.userController.Create(value);
        res.status(201).json(createdUser);
    }
    catch (e) {
        next(e);
    }
});
router.delete("/", userCheckIdMidleware_1.userMiddlewareForDel.deleteThrow, async (req, res, next) => {
    try {
        const { id } = req.body;
        if (!id) {
            throw new api_errors_1.ApiError('Something Wrong', 400);
        }
        await user_controler_1.userController.Delete(id);
        res.status(201).json('User was deleted');
    }
    catch (e) {
        next(e);
    }
});
router.patch("/", async (req, res, next) => {
    try {
        const { id, name } = req.body.data;
        const user = await User_model_1.User.find({ _id: id });
        if (!user) {
            throw new api_errors_1.ApiError("User not found", 404);
        }
        const newUser = { ...user, name: name };
        const us = await user_controler_1.userController.Update(id, newUser);
        res.status(201).json(us);
    }
    catch (e) {
        next(e);
    }
});
exports.userRouter = router;
