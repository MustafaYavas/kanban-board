import { boardsController } from '../controllers/boards-controller.js';
import checkAuth from '../middleware/check-auth.js';

import express from 'express';
import { check } from 'express-validator';

const router = express.Router();

router.get('/all-boards', boardsController.getAllBoards);

router.get('/:bid', boardsController.getBoardById);

router.get('/user/:uid', boardsController.getBoardsByUserId);

router.get('/boards/:bid/members', boardsController.getMembersOfBoard);

router.use(checkAuth);

router.post('/boards/:bid/add-task',
    check('task').not().isEmpty(),
    boardsController.addTaskToBoard
);

router.patch('/boards/:bid',
    boardsController.updateTasks
);

router.post('/', 
    [
        check('title').trim().notEmpty(),
        check('membersNumber').not().isEmpty(),
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
        check('membersNumber').not().isEmpty(),
        check('usageArea').isLength({ min: 5 })
    ] ,
    boardsController.updateBoardById
);

router.delete('/:bid', boardsController.deleteBoardById);

export default router;