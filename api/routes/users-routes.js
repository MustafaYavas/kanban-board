import { usersController } from '../controllers/users-controller.js';

import express from 'express';
import { check } from 'express-validator';

const router = express.Router();

router.get('/:uid', usersController.getUser);

router.post('/login', usersController.login);

router.post('/signup', 
    [
        check('name').trim().notEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min: 5 })
    ] , 
    usersController.signup
);


export default router;