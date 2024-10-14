import mongoose from "mongoose";
import Joi from "joi";

const adsSchema = new mongoose.Schema({
    // id: String,
    userId: String,
    userName: String,
    adsUrl: String,
    timeStart: String,
    timeEnd: String,
    price: Number,
    date: {
        type: String, default: ""
    },
}, { timestamps: true })

export const adsModel = mongoose.models["ads"] || mongoose.model("ads", adsSchema);

export const validateAds = (_body: any) => {
    const joiSchema = Joi.object({
        adsUrl: Joi.string().min(2).max(300).required(),
        timeStart: Joi.string().min(2).max(200).required(),
        timeEnd: Joi.string().min(2).max(200).required(),
        price: Joi.number().min(0).max(999999).required(),
    })
    return joiSchema.validate(_body)
}