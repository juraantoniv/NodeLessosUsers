import { Document } from "mongoose";

import { EGenders } from "../enums/gender.enum";

export interface IUser extends Document {
    name?: string;
    email: string;
}