import express from 'express';
import {profileData} from '../models/profile.js';
import mongoose from 'mongoose';

export const ProfileDataRoute = express.Router();

ProfileDataRoute.post('/profileData', async (req, res) => {
    try {
        const newProfile = new profileData(req.body); // req.body contains the form data
        await newProfile.save();
        res.status(201).json({ message: "Profile created successfully", profile: newProfile });
    } catch (error) {
        res.status(500).json({ message: "Error saving profile", error: error.message });
    }
});

ProfileDataRoute.get('/profileData/:id', async (req, res) => {
    try {
        const profile = await profileData.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
});