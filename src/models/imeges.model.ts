import * as mongoose from "mongoose";
import {Schema} from "mongoose";

const imgSchema = new Schema({
    img:{
        type:Buffer,
        required:true
    },
    id:{
        type: String,
        required: true
    }
},
    {
        timestamps:true,
        versionKey:false
    }
)