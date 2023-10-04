import { model, Schema } from "mongoose";
import * as mongoose from "mongoose";
import {IGoods} from "../types/goods.types";


const goodsSchema = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
            required: true,
            lowercase: true,
        },
        image:{
            type:String,
            required: false
        },
        price: {
            type:String,
            required: false
        }

    },
    {
        timestamps: true,
        versionKey: false,

    },
);





export const Goods = model<IGoods>("goods", goodsSchema);