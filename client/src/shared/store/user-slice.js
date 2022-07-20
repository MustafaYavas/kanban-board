import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    isLoggedIn: false,
    token: null,
    tokenExpDate: null,
    user:  null,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        authHandler(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.tokenExpDate = action.payload.tokenExpDate;
            state.user = action.payload.user;
        },

        logoutHandler(state) {
            state.isLoggedIn = false;
            state.token = null;
            state.tokenExpDate = null;
            state.user = null;
        },

        setUserBoards(state, action) {
            state.user.memberBoards = action.payload;
        },

        addBoardToUser(state, action) {
            state.user.memberBoards.push(action.payload);
            state.user.ownBoards.push(action.payload);
        },

        updateUserBoards(state, action) {
            state.user.memberBoards = state.user.memberBoards.filter(b => b !== action.payload);
            state.user.ownBoards = state.user.ownBoards.filter(b => b !== action.payload);
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;