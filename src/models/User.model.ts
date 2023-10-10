import { model, Schema } from "mongoose";
import * as mongoose from "mongoose";
import {IUser} from "../types/user.type";


const userSchema = new Schema(
    {
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
            type:Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,

    },
);





export const User = model("user", userSchema);