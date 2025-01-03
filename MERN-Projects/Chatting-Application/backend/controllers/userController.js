import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { FullName, UserName, Password, ConfirmPassword, Gender } = req.body;
        if (!FullName || !UserName || !Password || !ConfirmPassword || !Gender) {
            return res.status(400).json({ message: "All fields are  mandetory" });
        }
        if (Password != ConfirmPassword) {
            return res.status(400).json({ message: "password is unmatched" });
        }
        const user = await User.findOne({ UserName });
        if (user) {
            return res.status(400).json({ message: "UserName is allready exist" });
        }
        //password
        const hashPassword = await bcrypt.hash(Password, 10);
        //profilePhoto
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${UserName}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${UserName}`;

        await User.create({
            FullName,
            UserName,
            Password: hashPassword,
            ProfilePhoto: Gender == "Male" ? maleProfilePhoto : femaleProfilePhoto,
            Gender
        });
        return res.status(201).json({ message: "Account created successfully", success: true });
    }
    catch (error) {
        console.log(error);
    }
};
export const login = async (req, res) => {
    try {
        const { UserName, Password } = req.body;
        if (!UserName || !Password) {
            return res.status(400).json({ message: "All fields are  mandetory" });
        }
        const user = await User.findOne({ UserName });
        if (!user) {
            return res.status(400).json({ message: "Incorrect username or password", success: false });
        }
        const isPasswordMatch = await bcrypt.compare(Password, user.Password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect username or password", success: false });
        }
        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).cookie("cookieName", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({
            _id: user._id,
            userName: user.UserName,
            FullName: user.FullName,
            ProfilePhoto: user.ProfilePhoto
        });
    } catch (error) {
        console.log(error);
    }
}

export const logout = (req, res) => {
    try {
        return res.status(200).cookie("cookieName", "", { maxAge: 0 }).json({ message: "logged out successfully" });
    } catch (error) {
        console.log(error);
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-Password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
}