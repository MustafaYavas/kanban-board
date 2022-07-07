import HttpError from '../models/http-error.js';

import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

let DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Mustafa',
        email: 'test1@test.com',
        password: 'password1'
    },

    {
        id: 'u2',
        name: 'Murat',
        email: 'test2@test.com',
        password: 'password2'
    }
]

const getUser = (req, res, next) => {   // get a specific user
    const userId = req.params.uid;
    const user = DUMMY_USERS.find(u => u.id === userId);

    if(!user) {
        return next(new HttpError('Could not find user!', 404));
    }

    res.json({ user });
}

const login = (req, res, next) => {
    const { email, password } = req.body;
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);

    if(!identifiedUser || identifiedUser.password !== password) {
        return next(new HttpError('Could not find user, credentials seem to be wrong!', 401));
    }

    res.json({ message: 'Logged In!' })
}

const signup = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data!', 422);
    }

    const { name, email, password } = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if(hasUser) {
        return next(new HttpError('Could not create user, email already exists!', 422));
    }

    const newUser = {
        id: uuidv4(),
        name,
        email,
        password
    } 

    DUMMY_USERS.push(newUser);

    res.status(201).json({ user: newUser })
}

export const usersController = {
    getUser,
    login,
    signup
}