import mongoose from "mongoose";
import Joi from "joi";

const boardSchema = new mongoose.Schema({
    // id: String,
    userId: String,
    userName: String,
    type: String,
    title: String,
    description: String,
    price: Number,
    contact: String,
    image: String,
    date: {
        type: String, default: ""
    },
}, { timestamps: true })

export const BoardModel = mongoose.models["board"] || mongoose.model("board", boardSchema);



export const validateBoard = (_body: any) => {
    const joiSchema = Joi.object({
        type: Joi.string().min(2).max(150).required(),
        title: Joi.string().min(2).max(100).required(),
        description: Joi.string().min(2).max(2000),
        price: Joi.number().min(0).max(999999).required(),
        contact: Joi.string().min(2).max(150).required(),
        image: Joi.string().min(0).max(200).allow("", null),
    })
    return joiSchema.validate(_body)
}