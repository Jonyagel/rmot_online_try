import mongoose from "mongoose";
import Joi from "joi";

const alertMachingNadlanSchema = new mongoose.Schema({
    // id: String,
    userId: String,
    userName:String,
    to_email:String,
    type: String,
    rooms: Number,
    price: Number,
    address: String,
    date: String,
}, { timestamps: true })

export const AlertMachingNadlanModel = mongoose.models["alertMachingNadlans"] || mongoose.model("alertMachingNadlans", alertMachingNadlanSchema);



export const validateAlertMachingNadlan = (_body: any) => {
    const joiSchema = Joi.object({
        type: Joi.string().min(2).max(150).required(),
        rooms: Joi.number().min(0).max(999999).required(),
        price: Joi.number().min(0).max(999999).required(),
        address: Joi.string().min(2).max(150).required(),
        to_email: Joi.string().min(2).max(150).email().required(),
    })
    return joiSchema.validate(_body)
}