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
    const {id} = req.body;
    const boardId = req.params.bid || id;

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
    const {id} = req.body;
    const userId = req.params.uid || id;
    
    let boards;
    try {
        boards = await Board.find({ owner: userId })
    } catch (err) {
        return next(new HttpError('Something went wrong. Please try again later', 500));
    }

    if(!boards || boards.length === 0) {
        return next(new HttpError('Could not find a board for the provided user id!', 404));
    }

    res.json({ boards });
}

const createBoard = async(req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data!', 422))
    }

    const { title, usageArea, membersNumber, owner, creatorName, boardPassword } = req.body;
    const newBoard = new Board({
        title: title.charAt(0).toUpperCase() + title.slice(1),
        usageArea: usageArea.charAt(0).toUpperCase() + usageArea.slice(1),
        membersNumber,
        owner,
        members: [],
        tasks: [],
        creatorName,
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
        return next(new HttpError('Invalid inputs passed, please check your data!', 422));
    }

    const { title, membersNumber, usageArea } = req.body;
    const boardId = req.params.bid;

    let board;
    try {
        board = await Board.findById(boardId);
    } catch (err) {
        return next(new HttpError('Something went wrong. Please try again later', 500));
    }

    if(board.owner.toString() !== req.userData.userId) {
        return next(new HttpError('You are not allowed to update this board!', 403));
    }

    board.title = title;
    board.membersNumber = membersNumber;
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
    let user;
    try {
        board = await Board.findById(boardId).populate('owner');
        user = await User.findById(board.owner)
    } catch (err) {
        return next(new HttpError('Something went wrong. Please try again later', 500));
    }

    if(!board || !user) {
        return next(new HttpError('Could not find the board and user', 404));
    }
    
    if(board.owner.id !== req.userData.userId) {
        return next(new HttpError('You are not allowed to delete this board!', 403));
    }
    
    user.ownBoards = user.ownBoards.filter(b => b.toString() !== boardId)
    user.memberBoards = user.memberBoards.filter(b => b.toString() !== boardId)
    
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await board.remove({ session: sess });
        await board.owner.save({ session: sess});
        await sess.commitTransaction();
    } catch (error) {
        return next(new HttpError('Something went wrong. Could not delete the board!', 500));
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (error) {
        
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
    
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        board.members.push(userId); 
        user.memberBoards.push(boardId);
        await user.save({ session: sess });
        await board.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        return next(new HttpError('Creating new board failed!', 500));
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

const addTaskToBoard = async(req, res, next) => {
    const boardId = req.params.bid;
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

    if(board.owner.toString() !== req.userData.userId) {
        return next(new HttpError('You are not allowed to add a task to this board!', 403));
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

const updateTasks = async(req, res, next) => {
    const boardId = req.params.bid;
    const taskId = req.body.id;
    
    let board;
    try {
        board = await Board.findById(boardId);
    } catch (error) {
        return next(new HttpError('Something went wrong. Please try again later!', 500));
    }

    if(!board) {
        return next(new HttpError('Could not find board!', 404));
    }
    
    if(taskId) {
        const updatedTasks = board.tasks.map(task => {
            if(task.id === taskId) return {...task, taskTable: req.body.table}
            return task;
        });
        board.tasks = updatedTasks;
    } 
    else {
        if(board.owner.toString() !== req.userData.userId) {
            return next(new HttpError('You are not allowed to delete this task!', 403));
        }
        board.tasks = req.body
    }
    
    
    try {
        await board.save();
    } catch (err) {
        return next(new HttpError('Something went wrong. Please try again later', 500));
    }

    res.status(200).json({ board });
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
    addTaskToBoard,
    updateTasks
}