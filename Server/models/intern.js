import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    company: String,
    position: String,
    location: String,
    time: String,
    type: String,
    applicants: Number,
    salary: String,
    image: String,
    divisions: String,
    link: String,
});

export const intern= mongoose.model('Intern',schema,);