import HttpError from '../models/http-error.js';
import Board from '../models/board.js';

// import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

const getAllBoards = async(req, res, next) => {       // get all boards
    let boards;
    try {
        boards = await Board.find();
    } catch (err) {
        return next(new HttpError('Something went wrong. Please try again later', 500));
    }

    res.json(boards);
};

const getBoardById = async(req, res, next) => {       // get a specific board
    const boardId = req.params.bid;

    let board;
    try {
        board = await Board.findById(boardId);
    } catch (err) {
        return next(new HttpError('Something went wrong. Please try again later', 500));
    }

    if(!board) {   // for synchronous throw error, for asynchronous -return next(error)- or -throw error-;
        return next(new HttpError('Could not find a board for the provided id!', 404)) ;
    }

    res.json({ board })
};

const getBoardsByUserId = async(req, res, next) => {       // get a specific board by user id
    const userId = req.params.uid;
    
    let boards;
    try {
        boards = await Board.find({ owner: userId })
    } catch (err) {
        return next(new HttpError('Something went wrong. Please try again later', 500));
    }

    if(!boards || boards.length === 0) {
        return next(new HttpError('Could not find a board for the provided user id!', 404));
    }

    res.json({ boards })
}

const createBoard = async(req, res, next) => {       // create a new board
    const error = validationResult(req);
    if(!error.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data!', 422);
    }

    const { title, usageArea, numberOfMembers, owner, boardPassword } = req.body;
    const newBoard = new Board({
        title,
        usageArea,
        numberOfMembers,
        owner,
        boardPassword,
        createDate: new Date().toLocaleDateString()
    })

    try {
        await newBoard.save();
    } catch (err) {
        return next(new HttpError('Creating a new board failed!', 500))
    }

    res.status(201).json({ board: newBoard });
};

const updateBoardById = async(req, res, next) => {       // update board by id
    const error = validationResult(req);
    if(!error.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data!', 422);
    }

    const { title, usageArea } = req.body;
    const boardId = req.params.bid;

    let board;
    try {
        board = await Board.findById(boardId);
    } catch (err) {
        return next(new HttpError('Something went wrong. Please try again later', 500));
    }

    board.title = title;
    board.usageArea = usageArea;

    try {
        await board.save();
    } catch (err) {
        return next(new HttpError('Something went wrong. Please try again later', 500));
    }

    res.status(200).json({ board });
};

const deleteBoardById = async(req, res, next) => {       // delete board by id
    const boardId = req.params.bid;

    let board;
    try {
        board = await Board.findById(boardId);
        await board.remove();
    } catch (err) {
        return next(new HttpError('Something went wrong. Please try again later', 500))
    }

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
