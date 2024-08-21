import mongoose from "mongoose";
import Joi from "joi";

const gmachSchema = new mongoose.Schema({
    userId: String,
    userName:String,
    name: String,
    description: String,
    content: String,
    hours: String,
    address: String,
    phone: String,
    email: String,
    image: String,
    category: String,
    date: String,
}, { timestamps: true })

export const GmachModel = mongoose.models["gmachs"] || mongoose.model("gmachs", gmachSchema);



export const validateGmach = (_body: any) => {
    const joiSchema = Joi.object({
        name: Joi.string().min(2).max(150).required(),
        description: Joi.string().min(2).max(500).required(),
        address: Joi.string().min(2).max(150).required(),
        content: Joi.string().min(2).max(500).required(),
        hours: Joi.string().min(2).max(500).required(),
        phone: Joi.string().min(0).max(20).required(),
        email: Joi.string().min(0).max(20).required(),
        category: Joi.string().min(2).max(500).allow(null, ''),
        image: Joi.string().min(2).max(150).allow(null, ''),
    })
    return joiSchema.validate(_body)
}