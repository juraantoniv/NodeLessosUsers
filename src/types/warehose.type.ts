import { Document } from "mongoose";

import { EGenders } from "../enums/gender.enum";
import {ERights, EType} from "../enums/users.rights.enum";

export interface IHouse extends Document {
    name_of_warehouse:string,
    city:string,
    sellerId:string
}

