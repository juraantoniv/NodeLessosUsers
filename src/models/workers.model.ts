import { model, Schema } from "mongoose";
import * as mongoose from "mongoose";
import {IUser} from "../types/user.type";
import {ERights, EType} from "../enums/users.rights.enum";


const workerSchema = new Schema(
    {
        name: {
            type: String,
        },
        surname: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
        },
        age: {
            type: String,
        },
        city: {
            type:Boolean,
            required: true,
        },
        position:{
            type: String,
        }

    },
    {
        timestamps: true,
        versionKey: false,

    },
);





export const worker = model("worker", workerSchema);