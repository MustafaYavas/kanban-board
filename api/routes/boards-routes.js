import { controllers } from '../controllers/boards-controllers.js';

import express from 'express';

const router = express.Router();


router.get('/all-boards', controllers.getAllBoards);

router.get('/:bid', controllers.getBoardById);

router.get('/user/:uid', controllers.getBoardsByUserId);

router.post('/', controllers.createBoard);

router.patch('/:bid', controllers.updateBoardById);

router.delete('/:bid', controllers.deleteBoardById);

export default router;