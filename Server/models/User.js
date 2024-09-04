import mongoose, { Schema } from "mongoose";

const scheme = new Schema({
    name:String,
    mail:{ type: String, unique: true, sparse: true },
    password:String,
    
    googleId: { type: String, unique: true, sparse: true },
    loginDates: [{ type: Date }],
});

export const user=mongoose.model("user",scheme);