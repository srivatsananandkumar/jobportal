import express from 'express';
import mongoose from "mongoose";
import { Resume } from '../models/Resume.js'; // Adjust the path as needed

export const routerResume = express.Router();

// Route to handle submission from Resume1
routerResume.post('/resume1', async (req, res) => {
    try {
        const { firstname, lastname, title, linkedin, github, email } = req.body;
        console.log('Resume1 data:', req.body); // Log incoming data
        const newResume = new Resume({ firstname, lastname, title, linkedin, github, email });
        const savedResume = await newResume.save();
        console.log('Saved resume1:', savedResume); // Log saved document
        res.status(201).json(savedResume);
    } catch (err) {
        console.error('Error saving resume1 data:', err); // Log error
        res.status(500).json({ error: 'Error saving resume1 data' });
    }
});

// Route to handle submission from Resume2
routerResume.post('/resume2', async (req, res) => {
    try {
        const { skill1, skill2, skill3, skill4, skill5, id } = req.body;
        console.log('Resume2 data:', req.body); // Log incoming data
        const updatedResume = await Resume.findByIdAndUpdate(
            id,
            { skill1, skill2, skill3, skill4, skill5 },
            { new: true }
        );
        console.log('Updated resume2:', updatedResume); // Log updated document
        res.status(200).json(updatedResume);
    } catch (err) {
        console.error('Error saving resume2 data:', err); // Log error
        res.status(500).json({ error: 'Error saving resume2 data' });
    }
});

// Route to handle submission from Resume3
routerResume.post('/resume3', async (req, res) => {
    try {
        const { degree1, sYear1, eYear1, university1, degree2, sYear2, eYear2, university2, id } = req.body;
        console.log('Resume3 data:', req.body); // Log incoming data
        const updatedResume = await Resume.findByIdAndUpdate(
            id,
            { degree1, sYear1, eYear1, university1, degree2, sYear2, eYear2, university2 },
            { new: true }
        );
        console.log('Updated resume3:', updatedResume); // Log updated document
        res.status(200).json(updatedResume);
    } catch (err) {
        console.error('Error saving resume3 data:', err); // Log error
        res.status(500).json({ error: 'Error saving resume3 data' });
    }
});

// Route to handle submission from Resume4
routerResume.post('/resume4', async (req, res) => {
    try {
        const { about1, about2, id } = req.body;
        console.log('Resume4 data:', req.body); // Log incoming data
        const updatedResume = await Resume.findByIdAndUpdate(
            id,
            { about1, about2 },
            { new: true }
        );
        console.log('Updated resume4:', updatedResume); // Log updated document
        res.status(200).json(updatedResume);
    } catch (err) {
        console.error('Error saving resume4 data:', err); // Log error
        res.status(500).json({ error: 'Error saving resume4 data' });
    }
});

// Route to handle submission from Resume5
routerResume.post('/resume5', async (req, res) => {
    try {
        const { company1, role1, duration1, company2, role2, duration2, id } = req.body;
        console.log('Resume5 data:', req.body); // Log incoming data
        const updatedResume = await Resume.findByIdAndUpdate(
            id,
            { company1, role1, duration1, company2, role2, duration2 },
            { new: true }
        );
        console.log('Updated resume5:', updatedResume); // Log updated document
        res.status(200).json(updatedResume);
    } catch (err) {
        console.error('Error saving resume5 data:', err); // Log error
        res.status(500).json({ error: 'Error saving resume5 data' });
    }
});

// Route to handle template retrieval

routerResume.get('/template/:id', async (req, res) => {
    try {
        const resumeId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(resumeId)) {
            return res.status(400).send('Invalid resume ID');
        }
        const resume = await Resume.findById(resumeId);
        if (!resume) return res.status(404).send('Resume not found');
        res.json(resume);
    } catch (error) {
        console.error('Error retrieving template:', error);
        res.status(500).send('Server error');
    }
});
