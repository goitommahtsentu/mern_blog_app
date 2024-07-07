import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {errorHandler} from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signUp = async (req, res, next) => {
    const {username, email, password} = req.body;

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
        res.status(201).json({message: "User successfully created"});
    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || email.trim() === '' || !password || password.trim() === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({email});
        if (!validUser) {
            return next(errorHandler(400, "User not found"));
        }

        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }
        const token = jwt.sign(
            {id: validUser._id},
            process.env.JWT_SECRET);
        const {password:pass,...rest}=validUser._doc
        res.status(200).cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            })
            .json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        console.log("Google sign-in request received");
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    req.body.name.split(' ').join('').toLowerCase() +
                    Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        console.error("Error during Google sign-in:", error);
        next(error);
    }
};
