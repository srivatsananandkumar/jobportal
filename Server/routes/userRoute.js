import express from 'express';
import { user } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import cookieParser from 'cookie-parser';  
import nodemailer from 'nodemailer';

const route = express.Router();

const unique_character = 10;

route.use(express.json());

// route.get("/user", async (req, res) => {
//     try {
//         const data = await user.find();
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

route.post("/logindetail", async (req, res) => {
    try {
        const data = await user.findOne({ mail: req.body.email });
        
        if (!data) {
            return res.status(404).json({ Status: "Error", message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, data.password);

        if (!isPasswordValid) {
            return res.status(400).json({ Status: "Error", message: "Invalid password" });
        }
        const { password, ...userWithoutPassword } = data.toObject();

        
        const token = jwt.sign({id: data._id, name: data.name}, "jwt-secret-key",{expiresIn: '1d'});
        res.cookie('token', token);
        
        res.json({
            Status: "Success",
            message: "Login successful",
            user:{ ...userWithoutPassword, id: data._id}
        });
    } catch (error) {
        res.status(500).json({ Status: "Error", message: error.message });
    }
});

route.post("/user", async (req, res) => {
try {
    const hashedPassword = await bcrypt.hash(req.body.password.toString(), unique_character);

    const data = new user({
        ...req.body,
        password: hashedPassword
    });

    await data.save();

    //...userWithoutPassword will not get password as input
    const { password, ...userWithoutPassword } = data.toObject();
    res.json(userWithoutPassword);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

// const verifyUser = (req, res, next) => {
//     const token = req.cookies.token;
//     if(!token){
//         return res.status(400).json({ Status: "Error", message: "You are not authenticated" });
//     }
//     else{
//         jwt.verify(token, "jwt-secret-key", (err,decoded) => {
//             if(err){
//                 return res.status(400).json({ Status: "Error", message: "Token is not okay" });
//             }
//             else{
//                 req.userId = decoded.id;
//                 req.name = decoded.name;
//                 next();
//             }
//         })
//     }
// }

export const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
      const decoded = jwt.verify(token, "jwt-secret-key");
      const foundUser = await user.findById(decoded.id);
      if (!foundUser) return res.status(404).json({ message: "User not found" });

      req.user = foundUser;
      next();
  } catch (err) {
      res.status(403).json({ message: "Invalid token" });
  }
};

route.get("/auth",verifyUser, async (req,res) =>{
   return   res.json({
    Status: "Success",
    user : req.user
});
})

route.get("/logout",(req,res) => {
    res.clearCookie('token');
    return res.json({status: "Success"});
})


route.post('/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).send('Email is required');
      }
      const data = await user.findOne({ mail:email });
      if (!data) {
        return res.status(404).send('User not found');
      }
      const token2 = jwt.sign({id: data._id}, "jwt_secret_key", {expiresIn: "1d"})
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'tharunsitharunsi@gmail.com',
          pass: 'mnon gsgk gmii osgb'
        }
      });
      
      var mailOptions = {
        from: 'tharunsitharunsi@gmail.com',
        to: data.mail,
        subject: 'Reset your Passwsord',
        text: `http://localhost:5173/reset-password/${data._id}/${token2}`
      };
      
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).json({ Status: "Error", message: "Failed to send email" });
        } else {
          return res.json({ Status: "Success", message: "Email sent successfully" });
        }
      });
    //   res.status(200).json(data);
    }
     catch (error) {
      res.status(500).send('Server error: ' + error.message);
    }
  });
  

  route.post('/reset-password/:id/:token2', (req,res) => {
    const {id,token2} = req.params
    const {password} = req.body
   
    jwt.verify(token2, "jwt_secret_key", (err, decoded) => {
        if(err){
            return res.json({Status: "Error with token"})
        }
        else{
            bcrypt.hash(password,10)
            .then(hash => {
                 user.findByIdAndUpdate({_id: id}, {password: hash})
                 .then(u => res.send({Status: "Success"}))
                 .catch(err => res.send({Status: err}))
        })
        .catch(err => res.send({Status: err}))
            
        }
    })
  })

export default route;