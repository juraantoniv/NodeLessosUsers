import { Document } from "mongoose";

import { EGenders } from "../enums/gender.enum";

export interface IUser extends Document {
    password?: string;
    email?: string;
    age?:string
}

export type IUserCredentials = Pick<IUser, "email" | "password">;