"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controler_1 = require("../controlers/user.controler");
const user_validator_1 = require("../validators/user.validator");
const api_errors_1 = require("../errors/api.errors");
const user_midleware_1 = require("../midlewares/user.midleware");
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
exports.userRouter = router;
