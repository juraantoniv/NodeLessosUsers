import joi from "joi";

export class UserValidator {
    static firstName = joi.string().min(2).max(50).trim();
    static email = joi.string().email().trim().required();


    static create = joi.object({
        name: this.firstName.required(),
        email: this.email.required(),

    });

    static update = joi.object({
        name: this.firstName,
    });
}