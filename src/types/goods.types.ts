import { Document } from "mongoose";



export interface IGoods extends Document {
    name?: string;
    description?: string;
    image?:string;
    price?:string;
}