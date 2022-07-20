import { usersController } from '../controllers/users-controller.js';
import fileUpload from '../middleware/file-upload.js';

import express from 'express';
import { check } from 'express-validator';

const router = express.Router();

router.get('/:username', usersController.getUser);

router.patch('/:username', usersController.updateUser);

router.post('/login', usersController.login);

router.post('/signup',
    [
        check('email').normalizeEmail().isEmail(),
        check('name').trim().notEmpty(),
        check('username').isLength({ min: 5 }),
        check('password').isLength({ min: 5 })
    ] , 
    usersController.signup
);

export default router;