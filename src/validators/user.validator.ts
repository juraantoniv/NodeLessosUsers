import joi from "joi";

export class UserValidator {
  static nameUser = joi.string().min(2).max(50).trim();
  static password = joi
    .string()
    .min(2)
    .max(50)
    .trim()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"));
  static email = joi.string().email().trim().required();
  static rights = joi.string().required();
  static city = joi.string().required();

  static create = joi.object({
    name: this.password.required(),
    email: this.email.required(),
    rights: this.rights,
  });

  static update = joi.object({
    name: this.password,
  });
  static register = joi.object({
    email: this.email.required(),
    password: this.password.required(),
    name: this.nameUser,
    city: this.city,
  });
  static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
