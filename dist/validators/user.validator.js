"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class UserValidator {
}
exports.UserValidator = UserValidator;
_a = UserValidator;
UserValidator.firstName = joi_1.default.string().min(2).max(50).trim();
UserValidator.email = joi_1.default.string().email().trim().required();
UserValidator.create = joi_1.default.object({
    name: _a.firstName.required(),
    email: _a.email.required(),
});
UserValidator.update = joi_1.default.object({
    name: _a.firstName,
});
