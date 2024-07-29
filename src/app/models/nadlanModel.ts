import mongoose from "mongoose";
import Joi from "joi";

const nadlanSchema = new mongoose.Schema({
    // id: String,
    userId: String,
    userName:String,
    type: String,
    rooms: Number,
    price: Number,
    address: String,
    image: String,
    date: String,
}, { timestamps: true })

export const NadlanModel = mongoose.models["nadlan"] || mongoose.model("nadlan", nadlanSchema);



export const validateNadlan = (_body: any) => {
    const joiSchema = Joi.object({
        type: Joi.string().min(2).max(150).required(),
        rooms: Joi.number().min(0).max(20).required(),
        price: Joi.number().min(0).max(999999).required(),
        address: Joi.string().min(2).max(150).required(),
        image: Joi.string().min(0).max(200).allow("",null),
    })
    return joiSchema.validate(_body)
}