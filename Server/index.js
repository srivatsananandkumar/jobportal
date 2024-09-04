import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import session from 'express-session';
import cookieParser from 'cookie-parser';  
import {router} from "./routes/SchemaRoute.js";
import route from "./routes/userRoute.js";
import {router1} from "./routes/InternRoute.js";
import {routerResume} from "./routes/ResumeRoute.js";
import passport from './routes/passport.js';
import loginRoute from "./routes/loginRoute.js";
import dotenv from 'dotenv';

dotenv.config();


console.log(process.env);

// import { Router } from "express";
import cors from 'cors'
const app = express();

//app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ["POST","GET"],
  credentials: true
}));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB connected"))
.catch((err) => console.log(err));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "./public/Images")
    },
    filename: function (req, file, cb){
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})

app.post('/upload', upload.single('file'), (req,res) => {
     console.log(req.body)
     console.log(req.file)
})

app.use("/job",router);
app.use("/api",route);
app.use("/intern",router1);
app.use('/newapi', routerResume);
app.use("/date", loginRoute);

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('http://localhost:5173/home');
    }
  );

 
app.listen(3000);
