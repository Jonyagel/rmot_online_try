import mongoose from "mongoose";
import Joi from "joi";

const shopsSchema = new mongoose.Schema({
    userId: String,
    userName:String,
    name: String,
    description: String,
    logo: String,
    hours: String,
    address: String,
    phone: String,
    email: String,
    website: String,
    images: [String],
    category: String,
    date: String,
}, { timestamps: true })

export const ShopsModel = mongoose.models["shops"] || mongoose.model("shops", shopsSchema);



export const validateShops = (_body: any) => {
    const joiSchema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().min(2).max(700).allow(null, ''),
        logo: Joi.string().min(2).max(300).allow(null, ''),
        address: Joi.string().min(2).max(70).allow(null, ''),
        hours: Joi.string().min(2).max(500).allow(null, ''),
        phone: Joi.string().min(0).max(20),
        email: Joi.string().min(0).max(20),
        website: Joi.string().min(2).max(150),
        category: Joi.string().min(2).max(500).allow(null, ''),
        images: Joi.array().items(Joi.string().min(0).max(200)).allow(null, '').optional(),
    })
    return joiSchema.validate(_body)
}