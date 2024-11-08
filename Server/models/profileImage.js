import mongoose from "mongoose";
const schema = new mongoose.Schema({
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    image: String
})

export const profile= mongoose.model('ProfileImage',schema,'profile_image');