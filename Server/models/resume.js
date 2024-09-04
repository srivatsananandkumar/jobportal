import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    title: String,
    email: String,
    linkedin: String,
    github: String,

    skill1: String,
    skill2: String,
    skill3: String,
    skill4: String,
    skill5: String,

    degree1: String,
    sYear1:String,
    eYear1:String,
    university1:String,
    degree2: String,
    sYear2:String,
    eYear2:String,
    university2:String,

    about1:String,
    about2:String,

    company1:String,
    role1:String,
    duration1:String,
    company2:String,
    role2:String,
    duration2:String,
    
});

export const Resume = mongoose.model('Resume', resumeSchema);
