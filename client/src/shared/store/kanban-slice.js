import { createSlice } from '@reduxjs/toolkit';

const initialBoardState = {
    board: {}
}

const boardSlice = createSlice({
    name: 'board',
    initialState: initialBoardState,
    reducers: {
        setCurrentBoard(state, action) {
            state.board = action.payload;
        },

        updateCurrentBoardTasks(state, action) {
            state.board.tasks.push(action.payload);
        }
    }
});

export const boardActions = boardSlice.actions;
export default boardSlice;