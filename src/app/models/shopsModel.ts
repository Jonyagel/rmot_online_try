import mongoose from "mongoose";
import Joi from "joi";

const shopsSchema = new mongoose.Schema({
    userId: String,
    userName:String,
    name: String,
    description: String,
    logo: String,
    content: String,
    hours: String,
    address: String,
    phone: String,
    email: String,
    website: String,
    image: String,
    features: [String],
    specialOffer: String,
    category: String,
    date: String,
}, { timestamps: true })

export const ShopsModel = mongoose.models["shops"] || mongoose.model("shops", shopsSchema);



export const validateShops = (_body: any) => {
    const joiSchema = Joi.object({
        name: Joi.string().min(2).max(150).required(),
        description: Joi.string().min(2).max(500).required(),
        logo: Joi.string().min(2).max(500).allow(null, ''),
        address: Joi.string().min(2).max(150).required(),
        content: Joi.string().min(2).max(500).required(),
        hours: Joi.string().min(2).max(500).required(),
        phone: Joi.string().min(0).max(20).required(),
        email: Joi.string().min(0).max(20).required(),
        website: Joi.string().min(2).max(150).required(),
        features: Joi.array().items(Joi.string().min(0).max(200)).allow(null, '').optional(),
        specialOffer: Joi.string().min(0).max(200).allow(null, ''),
        category: Joi.string().min(2).max(500).allow(null, ''),
        image: Joi.string().min(2).max(150).allow(null, ''),
    })
    return joiSchema.validate(_body)
}