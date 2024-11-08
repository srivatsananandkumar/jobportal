import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import session from 'express-session';
import cookieParser from 'cookie-parser';  
import {router} from "./routes/SchemaRoute.js";
import route from "./routes/userRoute.js";
import {router1} from "./routes/InternRoute.js";
import {routerResume} from "./routes/ResumeRoute.js";
import {ProfileDataRoute} from "./routes/profileRoute.js";
import passport from './routes/passport.js';
import loginRoute from "./routes/loginRoute.js";
import dotenv from 'dotenv';
import path from "path";
import {profile} from "./models/profileImage.js";


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

 app.use(express.static('publics'))

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB connected"))
.catch((err) => console.log(err));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
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
app.use("/prof",ProfileDataRoute);

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

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/'); // Redirect to login if not authenticated
}
 const imagestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'publics/profileimages')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    // cb(null, `${Date.now()}_${file.originalname}`)
  }
 })

 const profileupload = multer({
  storage: imagestorage
 })

//  const validateObjectId = (req, res, next) => {
//   const { id } = req.params; // Assuming you're passing _id as a URL parameter
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: 'Invalid ID format' });
//   }
//   next();
// };

// app.post('/imageupload',profileupload.single('file'), (req, res) => {
//   profile.create({image: req.file.filename})
//   .then(result => res.json(result))
//   .catch(err => console.log(err))

// })

// app.post('/imageupload', profileupload.single('file'), (req, res) => {
//   const userId = req.user._id; // Get the authenticated user's ID

//   ProfileImage.create({
//       user: userId, // Associate the image with the user ID
//       image: req.file.filename, // Store the uploaded image filename
//   })
//   .then(result => res.json(result))
//   .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: 'Error uploading image' });
//   });
// });


//   // GET route to fetch a profile by ID
// // app.get('/getImage/:id', validateObjectId, async (req, res) => {
// //   try {
// //     const userId = req.params.id;
// //     const profileData = await profile.findById(userId);
    
// //     if (!profileData) {
// //       return res.status(404).json({ message: "Profile not found" });
// //     }
// //     res.json(profileData); // Return the profile data for the specific user
// //   } catch (error) {
// //     console.error("Error fetching profile:", error);
// //     res.status(500).json({ message: "Error fetching profile", error: error.message });
// //   }
// // });

// app.get('/getImage/:id', validateObjectId, async (req, res) => {
//   try {
//       const userId = req.params.id;
//       const profileData = await ProfileImage.findOne({ user: userId }); // Find by user ID
      
//       if (!profileData) {
//           return res.status(404).json({ message: "Profile not found" });
//       }
//       res.json(profileData); // Return the profile image data
//   } catch (error) {
//       console.error("Error fetching profile:", error);
//       res.status(500).json({ message: "Error fetching profile", error: error.message });
//   }
// });


 app.post('/imageupload',profileupload.single('file'), (req, res) => {
      profile.create({image: req.file.filename})
      .then(result => res.json(result))
      .catch(err => console.log(err))

  })

  app.get('/getImage', (req, res) => {
    profile.find()
    .then(profile => res.json(profile))
    .catch(err => res.json(err))
  })

// app.post('/imageupload',validateObjectId, profileupload.single('file'), (req, res) => {
//   console.log('File:', req.file); // Log file information
//     console.log('Body:', req.body); // Log body data
//   const userId = req.body.user; // Get userId from frontend
//   profile.create({ user: userId, image: req.file.filename })
//       .then(result => res.json(result))
//       .catch(err => res.status(500).json(err));
// });

// // Get images by user ID
// app.get('/getImage/:userId',validateObjectId, (req, res) => {
//   profile.find({ user: req.params.userId })
//       .then(profile => res.json(profile))
//       .catch(err => res.status(500).json(err));
// });
 
app.listen(3000);
