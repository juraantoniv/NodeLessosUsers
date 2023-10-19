import { model, Schema, Types } from "mongoose";

import {BoughtType} from "../types/goods.types";
import {Goods} from "./goodsModel";

const BoughtSchema = new Schema(
    {
        _goodsId: {
            type: Types.ObjectId ,
            required: true,
            ref: Goods,
        },
        name: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type:String,
            required: false
        },
        boughtBy:{
            type:String,
            required:false
        }
    },
    { timestamps: true, versionKey: false },
);

export const boughtSchema = model<BoughtType>("boughtSchema", BoughtSchema);