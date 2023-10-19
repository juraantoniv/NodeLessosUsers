import { Document } from "mongoose";

import { EGenders } from "../enums/gender.enum";

export interface IUser extends Document {
    name?:string;
    password?: string;
    email?: string;
    age?:string
    confirmedRegistration?:boolean
    avatar?:string
    last_Visited?:string
}

export type IUserCredentials = Pick<IUser, "email" | "password" | "confirmedRegistration">;