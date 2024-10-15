import mongoose from "mongoose";
const schema = new mongoose.Schema({
    image: String
})

export const profile= mongoose.model('ProfileImage',schema,'profile_image');