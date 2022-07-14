import { createSlice } from '@reduxjs/toolkit';

const initialBoardState = {
    board: null
}

const boardSlice = createSlice({
    name: 'board',
    initialState: initialBoardState,
    reducers: {
        setCurrentBoard(state, action) {
            state.board = action.payload;
        },

        addCurrentBoardTasks(state, action) {
            state.board.tasks.push(action.payload);
        },

        updateCurrentBoardTasks(state, action) {
            state.board.tasks = action.payload;
        },

        clearCurrentBoard(state) {
            state.board = null;
        }
    }
});

export const boardActions = boardSlice.actions;
export default boardSlice;