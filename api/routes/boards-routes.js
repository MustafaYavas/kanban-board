import { boardsController } from '../controllers/boards-controller.js';

import express from 'express';
import { check } from 'express-validator';

const router = express.Router();


router.get('/all-boards', boardsController.getAllBoards);

router.get('/:bid', boardsController.getBoardById);

router.get('/user/:uid', boardsController.getBoardsByUserId);

router.get('/boards/:bid/members', boardsController.getMembersOfBoard);

router.post('/boards/:bid/add-task',
    check('task').not().isEmpty(),
    boardsController.addTaskToBoard
);

router.post('/', 
    [
        check('title').trim().notEmpty(),
        check('numberOfMembers').not().isEmpty(),
        check('usageArea').isLength({ min: 5 }),
        check('boardPassword').isLength({ min: 5 }),
    ] , 
    boardsController.createBoard
);

router.post('/all-boards/join', 
    check('boardPassword').isLength({ min: 5 }),
    boardsController.joinBoardById
);

router.patch('/:bid', 
    [
        check('title').trim().notEmpty(),
        check('usageArea').isLength({ min: 5 })
    ] ,
    boardsController.updateBoardById
);

router.delete('/:bid', boardsController.deleteBoardById);

export default router;