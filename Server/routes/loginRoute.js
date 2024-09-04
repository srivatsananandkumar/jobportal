// import express from 'express';
// import jwt from 'jsonwebtoken';
// import { user } from '../models/User.js';
// import dotenv from 'dotenv';

// dotenv.config();

// const loginRoute = express.Router();

// loginRoute.use(express.json());

// // POST /login to authenticate and return a JWT token
// loginRoute.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user by email and password
//         const existingUser = await user.findOne({ mail: email, password });

//         if (existingUser) {
//             const currentDate = new Date().setHours(0, 0, 0, 0); // Ensure the date is stored without time
//             const loginDates = existingUser.loginDates.map(date => date.setHours(0, 0, 0, 0));

//             // Check if the current date is already logged
//             if (!loginDates.includes(currentDate)) {
//                 existingUser.loginDates.push(currentDate);
//                 await existingUser.save();
//             }
// // 
//             // Generate a JWT token
//             const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//             return res.json({ token, message: 'Login date recorded successfully.' });
//         } else {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// });

// // Middleware to verify the token
// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
    
//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// };

// // Route to retrieve login dates for the authenticated user
// loginRoute.get("/login-dates", authenticateToken, async (req, res) => {
//     try {
//         const userId = req.user.id; // User ID from the token
//         const userData = await user.findById(userId);

//         if (userData) {
//             res.json(userData.loginDates);
//         } else {
//             res.status(404).json({ message: 'User not found.' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// export default loginRoute;


import express from 'express';
import { user } from '../models/User.js';
import mongoose from 'mongoose';

const loginRoute = express.Router();

loginRoute.use(express.json());

loginRoute.post("/login", async (req, res) => {
    try {
        const { userId } = req.body;

        // Find user by ID and update loginDates
        const userData = await user.findById(userId);
        if (userData) {
            const currentDate = new Date().setHours(0, 0, 0, 0); // Ensure the date is stored without time
            const loginDates = userData.loginDates.map(date => date.setHours(0, 0, 0, 0));

            // Check if the current date is already logged
            if (!loginDates.includes(currentDate)) {
                userData.loginDates.push(currentDate);
                await userData.save();
            }

            res.json({ message: 'Login date recorded successfully.' });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to retrieve login dates for a user
loginRoute.get("/login-dates/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const userData = await user.findById(userId);

        if (userData) {
            res.json(userData.loginDates);
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default loginRoute;
