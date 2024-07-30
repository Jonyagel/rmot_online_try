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
    size: Number,
    floor: Number,
    elevator: String,
    parking: String,
    entryDate: String,
    direction: String,
    condition: String,
    description: String,
    images: [String],
    date: String,
}, { timestamps: true })

export const NadlanModel = mongoose.models["nadlan"] || mongoose.model("nadlan", nadlanSchema);



export const validateNadlan = (_body: any) => {
    const joiSchema = Joi.object({
        type: Joi.string().min(2).max(150).required(),
        rooms: Joi.number().min(0).max(999999).required(),
        price: Joi.number().min(0).max(999999).required(),
        address: Joi.string().min(2).max(150).required(),
        size: Joi.number().min(0).max(999999).required(),
        floor: Joi.number().min(0).max(999999).required(),
        elevator: Joi.string().min(0).max(20).required(),
        parking: Joi.string().min(0).max(20).required(),
        entryDate: Joi.string().min(2).max(150).required(),
        direction: Joi.string().min(0).max(200).required(),
        condition: Joi.string().min(0).max(200).required(),
        description: Joi.string().min(2).max(500).required(),
        images: Joi.array().items(Joi.string().min(0).max(200)).allow(null, '').optional(),
    })
    return joiSchema.validate(_body)
}