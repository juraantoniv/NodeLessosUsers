import {Document, Types} from "mongoose";



export interface IGoods extends Document {
    userId?:string
    name?: string;
    description?: string;
    image?:string;
    price?:string;
    boughtBy?:Types.ObjectId
}

export interface BoughtType extends Document {
    _goodsId?:Types.ObjectId
    name?: string;
    description?: string;
    price?:string;
    boughtBy?:Types.ObjectId|IGoods
}