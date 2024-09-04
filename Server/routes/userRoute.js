import express from 'express';
import { user } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import cookieParser from 'cookie-parser';  

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
        // Query using 'mail' field as per your schema
        const data = await user.findOne({ mail: req.body.email });
        
        if (!data) {
            return res.status(404).json({ Status: "Error", message: "User not found" });
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(req.body.password, data.password);

        if (!isPasswordValid) {
            return res.status(400).json({ Status: "Error", message: "Invalid password" });
        }

        // Exclude the password from the response
        const { password, ...userWithoutPassword } = data.toObject();

        const name = data.name;
        const token = jwt.sign({name}, "jwt-secret-key",{expiresIn: '1d'});
        res.cookie('token', token);
        
        res.json({
            Status: "Success",
            message: "Login successful",
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({ Status: "Error", message: error.message });
    }
});



route.post("/user", async (req, res) => {
//     bcrypt.hash(req.body.password.toString(), unique_character, (err,hash) =>{
//         if(err) return res.json({Error: "Error for hashing password"});
//     })
//     try {
//         const data = new user(req.body);
//         await data.save();
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
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

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({ Status: "Error", message: "You are not authenticated" });
    }
    else{
        jwt.verify(token, "jwt-secret-key", (err,decoded) => {
            if(err){
                return res.status(400).json({ Status: "Error", message: "Token is not okay" });
            }
            else{
                req.name = decoded.name;
                next();
            }
        })
    }
}

route.get("/auth",verifyUser, async (req,res) =>{
   return   res.json({
    Status: "Success",
    name : req.name
});
})

route.get("/logout",(req,res) => {
    res.clearCookie('token');
    return res.json({status: "Success"});
})


export default route;