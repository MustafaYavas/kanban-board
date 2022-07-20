import HttpError from '../models/http-error.js';
import User from '../models/user.js';

import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const getUser = async(req, res, next) => {
    const username = req.params.username;
    
    let user;
    try {
        user = await User.find({ username: username}, '-password');
    } catch (err) {
        return next(new HttpError('Fetching user failed. Please try again later!', 500));
    }

    if(!user) {
        return next(new HttpError('Could not find user for the provided id!', 404));
    }

    res.json({ user });
}

const updateUser = async(req, res, next) => {
    const username = req.body.username;

    let user;
    try {
        user = await User.findOne({ username: username}, '-password');
    } catch (err) {
        return next(new HttpError('Fetching user failed. Please try again later!', 500));
    }

    if(!user) {
        return next(new HttpError('Could not find user for the provided id!', 404));
    }
    
    user.memberBoards = req.body.newBoards;
    
    try {
        await user.save();
    } catch (err) {
        console.log('sa');
        return next(new HttpError('Something went wrong. Please try again later', 500));
    }

    res.status(200).json({ user });
}

const login = async(req, res, next) => {
    const { email, password } = req.body;
    
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        return next(new HttpError('Logging in failed. Please try again later!', 500));
    }

    if(!existingUser) {
        return next(new HttpError('Could not found user. Please try sign up instead!', 401));
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (error) {
        return next(new HttpError('Could not log you in. Please check your credentials and try again!', 500));
    }

    if(!isValidPassword) {
        return next(new HttpError('Could not log you in. Invalid credentials!', 401));
    }

    let token;
    try {
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email }, 
            process.env.JWT_SIGN_KEY, 
            { expiresIn: '24h' }
        )
    } catch (error) {
        return next(new HttpError('Logging in failed. Please try again later!', 500));
    }

    res.json({ user: existingUser, userId: existingUser.id, email: existingUser.email, token});
}

const signup = async(req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data!', 422));
    }

    const { email, name, username, password, image } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        return next(new HttpError('Signing up failed. Please try again later!', 500));
    }

    if(existingUser) {
        return next(new HttpError('User already exists. Please try login instead!', 422));
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
        return next(new HttpError('Could not create user. Please try again later!', 500));
    }

    const newUser = new User({
        email,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        username: username.charAt(0).toUpperCase() + username.slice(1),
        password: hashedPassword,
        image,
        ownBoards: [],
        memberBoards: []
    }) 

    try {
        await newUser.save();
    } catch (err) {
        return next(new HttpError('Signing up failed. Please try again later!', 500));
    }

    let token;
    try {
        token = jwt.sign(
            { userId: newUser.id, email: newUser.email }, 
            process.env.JWT_SIGN_KEY, 
            { expiresIn: '24h' }
        )
    } catch (error) {
        return next(new HttpError('Signing up failed. Please try again later!', 500))
    }

    res.status(201).json({ user: newUser, userId: newUser.id, email: newUser.email, token });
}

export const usersController = {
    getUser,
    login,
    signup,
    updateUser
}