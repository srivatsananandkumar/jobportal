import mongoose from "mongoose";

const schema = new mongoose.Schema({
    firstname : String,
    lastname : String,
    email: String,
    phone : String,
    address : String,
    linkedin : String,
    github : String,
    skills: [String],
    education: String,
    experience: String,
    projects: String


})

export const profileData= mongoose.model('ProfileData',schema);