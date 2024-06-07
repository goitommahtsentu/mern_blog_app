
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {errorHandler} from "../utils/error.js";

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === '') {
        return next(errorHandler(400, "All fields are required"));
    }

    try {
        const salt = bcrypt.genSaltSync(10); // Generates a salt with 10 rounds
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User successfully created" });
    } catch (error) {
        next(error);
    }
};

