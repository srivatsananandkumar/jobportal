import express from 'express';
import {profileData} from '../models/profile.js';
import mongoose from 'mongoose';

export const ProfileDataRoute = express.Router();

ProfileDataRoute.post('/profileData', async (req, res) => {
    console.log(req.body);
    try {
        const newProfile = new profileData(req.body); 
        await newProfile.save();
        res.status(201).json({ message: "Profile created successfully", profile: newProfile });
    } catch (error) {
        res.status(500).json({ message: "Error saving profile", error: error.message });
    }
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the route
    }
    res.status(401).json({ message: "Unauthorized access. Please log in first." }); // User is not authenticated
  }

ProfileDataRoute.get('/profileData', async (req, res) => {
    try {

        const userId = req.user._id;
         const profile = await profileData.findOne({userId})
         
        //  (req.params.userId);
        // console.log(req.params.userId);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
});
