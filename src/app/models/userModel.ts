import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  provider: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  favoriteShops: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  }],
  favoriteForums: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Forum'
  }],
  favoriteBoards: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  }],
  favoriteRealEstate: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RealEstate'
  }],
  stats: {
    posts: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    activityPoints: { type: Number, default: 0 },
  },
  lastLogin: Date,
  lastLogout: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: false // Allow OAuth users without password
  },
  resetToken: String,
  resetTokenExpiry: Date
}, { timestamps: true })

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export const validateUser = (_body: any) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().min(2).max(100).email().required(),
    password: Joi.string().min(3).max(100).required(),
  })
  return joiSchema.validate(_body)
}

export const validateLogin = (_body: any) => {
  const joiSchema = Joi.object({
    email: Joi.string().min(2).max(100).email().required(),
    password: Joi.string().min(3).max(100).required(),
    favoriteShope: Joi.array().items(Joi.string().min(0).max(200)).allow(null, '').optional(),
    favoriteForum: Joi.array().items(Joi.string().min(0).max(200)).allow(null, '').optional(),
  })
  return joiSchema.validate(_body)
}











//npm i joi monogoose @types/bcrypt @types/jsonwebtoken jose