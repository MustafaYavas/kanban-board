import HttpError from '../models/http-error.js';

import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

let DUMMY_BOARDS = [
    {
        id: 'b1',
        title: 'Kanban Example 1',
        usageArea: 'Software',
        owner: 'u1',
        numberOfParticipants: 8,
        createDate: '02/07/2022'
    },

    {
        id: 'b2',
        title: 'Kanban Example 2',
        usageArea: 'Wearable Technology',
        owner: 'u2',
        numberOfParticipants: 12,
        createDate: '01/07/2022'
    }
];

const getAllBoards = (req, res, next) => {       // get all boards
    res.json(DUMMY_BOARDS);
};

const getBoardById =  (req, res, next) => {       // get a specific board
    const boardId = req.params.bid;
    const board = DUMMY_BOARDS.find(b => b.id === boardId);

    if(!board) {   // for synchronous throw error, for asynchronous -return next(error)- or -throw error-;
        throw new HttpError('Could not find a board for the provided id!', 404);
    }

    res.json({ board })
};

const getBoardsByUserId = (req, res, next) => {       // get a specific board by user id
    const userId = req.params.uid;
    const boards = DUMMY_BOARDS.filter(b => b.owner === userId);

    if(!boards || boards.length === 0) {
        return next(new HttpError('Could not find a board for the provided user id!', 404));
    }

    res.json({ boards })
}

const createBoard = (req, res, next) => {       // create a new board
    const error = validationResult(req);
    if(!error.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data!', 422);
    }

    const { title, numberOfParticipants, usageArea, owner } = req.body;
    const newBoard = {
        id: uuidv4(),
        title,
        numberOfParticipants,
        usageArea,
        owner,
        createDate: new Date().toLocaleDateString()
    }

    DUMMY_BOARDS.push(newBoard);

    res.status(201).json({ board: newBoard });
};

const updateBoardById = (req, res, next) => {       // update board by id
    const error = validationResult(req);
    if(!error.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data!', 422);
    }

    const { title, usageArea } = req.body;
    const boardId = req.params.bid;

    const updatedBoard = { ...DUMMY_BOARDS.find(b => b.id === boardId) };
    const boardIndex = DUMMY_BOARDS.findIndex(b => b.id === boardId)
    updatedBoard.title = title;
    updatedBoard.usageArea = usageArea;

    DUMMY_BOARDS[boardIndex] = updatedBoard;

    res.status(200).json({ board: updatedBoard });
};

const deleteBoardById = (req, res, next) => {       // delete board by id
    const boardId = req.params.bid;

    if(!DUMMY_BOARDS.find(b => b.id === boardId)) {
        throw new HttpError('Could not find a board for that id!', 404);
    }

    DUMMY_BOARDS = DUMMY_BOARDS.filter(b => b.id !== boardId);

    res.status(200).json({ message: 'Deleted board' });
};

export const boardsController = {
    getAllBoards, 
    getBoardById, 
    getBoardsByUserId, 
    createBoard, 
    updateBoardById, 
    deleteBoardById
}
