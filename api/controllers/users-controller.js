import HttpError from '../models/http-error.js';
import User from '../models/user.js';

import { validationResult } from 'express-validator';

const getUser = async(req, res, next) => {
    const userId = req.params.uid;
    
    let user;
    try {
        user = await User.findById({ _id: userId}, '-password');
    } catch (err) {
        return next(new HttpError('Fetching user failed. Please try again later!', 500));
    }

    if(!user) {
        return next(new HttpError('Could not find user for the provided id!', 404))
    }

    res.json({ user });
}

const login = async(req, res, next) => {
    const { email, password } = req.body;
    
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        return next(new HttpError('Logging in failed. Please try again later!', 500)) 
    }

    if(!existingUser || existingUser.password !== password) {
        return next(new HttpError('Invalid credentials. Could not log you in!', 401)) 
    }

    res.json({ message: 'Logged In!' })
}

const signup = async(req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data!', 422));
    }

    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        return next(new HttpError('Signing up failed. Please try again later!', 500)) 
    }

    if(existingUser) {
        return next(new HttpError('User already exists. Please login instead!', 422))
    }

    const newUser = new User({
        name,
        email,
        password,
        image: 'https://picsum.photos/id/237/200/300',
        boards: []
    }) 

    try {
        await newUser.save();
    } catch (err) {
        return next(new HttpError('Signing up failed. Please try again later!', 500))
    }

    res.status(201).json({ user: newUser })
}

export const usersController = {
    getUser,
    login,
    signup
}