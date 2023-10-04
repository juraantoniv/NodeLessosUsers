import joi from "joi";

export class UserValidator {
    static nameUser = joi.string().min(2).max(50).trim()
    static password = joi.string().min(2).max(50).trim();
    static email = joi.string().email().trim().required();


    static create = joi.object({
        name: this.password.required(),
        email: this.email.required(),

    });

    static update = joi.object({
        name: this.password,
    });
    static register = joi.object({
        email: this.email.required(),
        password: this.password.required(),
        name:this.nameUser
    });
    static login = joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });
}


