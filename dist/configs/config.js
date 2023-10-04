"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.configs = {
    DB_URI: process.env.DB_URL,
    SECRET_SALT: process.env.SECRET_SALT,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET
};
