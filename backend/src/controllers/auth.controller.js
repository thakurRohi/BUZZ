import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from '../lib/cloudinary.js'; 

export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({ msg: "All fields are required." });
        }

        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters long." });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User with this email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
          
        });

        if (newUser) {
            // Generate JWT token here
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
   try {
   
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
    }

   const isPasswordCorrect =await bcrypt.compare(password , user.password)
   if(!isPasswordCorrect){
       return res.status(400).json({ error: "Invalid username or password" });
   } 

   generateToken(user._id, res);

   res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic,
    });

}
   catch (error) {
     console.log("error in login controller", error.message);
     res.status(500).json({ message: "internal server error" });
   }
};

export const logout = (req, res) => {
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const updateProfile = async (req, res) => {
    try {
        const {profilePic}=req.body=req.body;
        const userId =  req.user._id

        if(!profilePic){
            return res.status(400).json({msg:"Please provide profile picture"})
        }

        const uploadResponse =  await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });

        res.status(200).json({msg:"Profile updated successfully", updatedUser});
    } catch (error) {
        console.log("error in updateProfile controller", error.message);
        res.status(500).json({ message: "internal server error" });
    }

}

export const checkAuth = (req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in checkAuth controller", error.message);
        res.status(500).json({ message: "internal server error" });
    }
}