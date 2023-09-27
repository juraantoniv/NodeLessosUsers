import { model, Schema } from "mongoose";
import {EGenders} from '../enums/gender.enum'

const userSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const User = model("user", userSchema);