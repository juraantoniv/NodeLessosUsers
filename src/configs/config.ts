import { config } from "dotenv";
config();


export const configs = {
    DB_URI: process.env.DB_URL,
    SECRET_SALT:process.env.SECRET_SALT,
    JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET,
    NO_REPLY_EMAIL:process.env.NO_REPLY_EMAIL,
    PASS:process.env.PASS

};