import joi from "joi";

export class GoodsValidator {
    static goodsName = joi.string().min(2).max(50).trim();
    static description = joi.string().min(5).required();
    static image = joi.string().allow('').optional();
    static price = joi.string().required()

    static create = joi.object({
        name: this.goodsName.required(),
        description: this.description.required(),
        image:this.image,
        price: this.price.required(),
    });

    static update = joi.object({
        name: this.goodsName.optional(),
        price: this.price.optional()
    });
}