import mongoose from "mongoose";
import Joi from "joi";

const adsSchema = new mongoose.Schema({
    // _id: String,
    userId: String,
    userName: String,
    image: String,
    link: String,
    altText: String,
    timeStart: String,
    timeEnd: String,
    price: Number,
    page: String,
    date: {
        type: String, default: ""
    },
    status: {
        type: String,
        enum: ['פעיל', 'ממתין', 'פקע'],
        default: 'פעיל',
    },
}, { timestamps: true })

export const adsModel = mongoose.models["ads"] || mongoose.model("ads", adsSchema);

export const validateAds = (_body: any) => {
    const joiSchema = Joi.object({
        image: Joi.string().min(2).max(300).required(),
        link: Joi.string().min(2).max(300).required(),
        altText: Joi.string().min(2).max(300).required(),
        timeStart: Joi.string().min(2).max(200).required(),
        timeEnd: Joi.string().min(2).max(200).required(),
        price: Joi.number().min(0).max(999999).required(),
        page: Joi.string().min(2).max(300).required(),
    })
    return joiSchema.validate(_body)
}