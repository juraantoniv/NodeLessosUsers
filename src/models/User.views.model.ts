import {model, Schema, Types} from "mongoose";
import {User} from "./User.model";
import {Cars} from "./goodsModel";


const userSchemaViews = new Schema(
    {
        _carId:{
            type:Types.ObjectId,
            ref:Cars,
            required:true,
        },
        _userId:{
            type:Types.ObjectId,
            ref:User,
            required:true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const userViews = model<{_carId:Types.ObjectId,_userId:Types.ObjectId}>("userViews", userSchemaViews);