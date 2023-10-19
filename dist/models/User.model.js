"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
    },
    confirmedRegistration: {
        type: Boolean,
        required: true,
    },
    avatar: {
        type: String,
        required: false
    },
    last_Visited: {
        typeof: String,
    }
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = (0, mongoose_1.model)("user", userSchema);
