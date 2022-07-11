import HttpError from '../models/http-error.js';
import Board from '../models/board.js';
import User from '../models/user.js';

import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

const getAllBoards = async(req, res, next) => {
    let boards;
    try {
        boards = await Board.find();
    } catch (err) {
        return next(new HttpError('Something went wrong. Please try again later', 500));
    }

    res.json(boards);
};

const getBoardById = async(req, res, next) => { 
    const boardId = req.params.bid;

    let board;
    try {
        board = await Board.findById(boardId);
    } catch (err) {
        return next(new HttpError('Something went wrong. Please try again later', 500));
    }

    if(!board) { 
        return next(new HttpError('Could not find a board for the provided id!', 404)) ;
    }

    res.json({ board })
};

const getBoardsByUserId = async(req, res, next) => {
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

const createBoard = async(req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data!', 422))
    }

    const { title, usageArea, numberOfMembers, owner, boardPassword } = req.body;
    const newBoard = new Board({
        title,
        usageArea,
        numberOfMembers,
        owner,
        members: [],
        tasks: [],
        boardPassword,
        createDate: new Date().toLocaleDateString()
    });

    let user;
    try {
        user = await User.findById(owner);
    } catch (error) {
        return next(new HttpError('Creating board faild. Please try again later!', 500));
    }

    if(!user) {
        return next(new HttpError('Could not find user for the provided id!', 404));
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await newBoard.save({ session: sess });
        user.ownBoards.push(newBoard);
        user.memberBoards.push(newBoard);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        return next(new HttpError('Creating new board failed!', 500))
    }

    res.status(201).json({ board: newBoard });
};

const updateBoardById = async(req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data!', 422)) ;
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

const deleteBoardById = async(req, res, next) => {
    const boardId = req.params.bid;

    let board;
    try {
        board = await Board.findById(boardId).populate('owner');
        
    } catch (err) {
        return next(new HttpError('Something went wrong. Please try again later', 500))
    }

    if(!board) {
        return next(new HttpError('Could not find the board', 404))
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await board.remove({ session: sess });
        board.owner.boards.pull(board);
        await board.owner.save({ session: sess});
        await sess.commitTransaction();
    } catch (error) {
        return next(new HttpError('Something went wrong. Could not delete the board!', 500))
    }

    res.status(200).json({ message: 'Board deleted!' });
};

const joinBoardById = async(req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return next(new HttpError('Invalid password, please check your data!', 422))
    }

    const { boardId, boardPassword, userId } = req.body;
    let board;
    let user;
    try {
        board = await Board.findById({_id: boardId});
        user = await User.findById(userId);
    } catch (error) {
        return next(new HttpError('Something went wrong. Please try again later!', 500));
    }

    if(!board || !user) {
        return next(new HttpError('Could not find board and user!', 404));
    }

    if(board.boardPassword !==  boardPassword) {
        return next(new HttpError('Wrong credential. Please try another password!', 422));
    }
    // girişten önce daha önce girmiş mi kontrol et
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        board.members.push(userId); 
        user.memberBoards.push(boardId);
        await user.save({ session: sess });
        await board.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        return next(new HttpError('Creating new board failed!', 500))
    }

    res.status(201).json({ board });
}

const getMembersOfBoard = async(req, res, next) => {
    const boardId = req.params.bid;

    let board;
    try {
        board = await Board.findById(boardId);
    } catch (error) {
        return next(new HttpError('Joining faild. Please try again later!', 500));
    }

    if(!board) {
        return next(new HttpError('Could not find board!', 404));
    }

    let members = [];
    for(let i=0; i<board.members.length; i++) {
        let user;

        try {
            user = await User.findById(board.members[i]);
        } catch (error) {
            return next(new HttpError('Joining faild. Please try again later!', 500));
        }

        if(!user) {
            return next(new HttpError('Could not find user!', 404));
        }

        members.push(user);
    }

    res.status(201).json({ members });
}

const addTaskToBoard = async() => {
    const boardId = req.params.bid;

    // const { taskName, taskPriority, taskOwner } = req.body;
    const task = req.body;

    let board;
    try {
        board = await Board.findById(boardId);
    } catch (error) {
        return next(new HttpError('Something went wrong. Please try again later!', 500));
    }

    if(!board) {
        return next(new HttpError('Could not find board!', 404));
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        board.tasks.push(task);
        await board.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        return next(new HttpError('Creating new task failed!', 500))
    }

    res.status(201).json({ board });
}

export const boardsController = {
    getAllBoards, 
    getBoardById, 
    getBoardsByUserId, 
    createBoard, 
    updateBoardById, 
    deleteBoardById,
    joinBoardById,
    getMembersOfBoard,
    addTaskToBoard
}