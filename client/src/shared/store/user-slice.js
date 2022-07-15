import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    isLoggedIn: false,
    user:  null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        loginHandler(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload;
        },

        logoutHandler(state) {
            state.isLoggedIn = false;
            state.user = null;
        },

        signupHandler(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload;
        },

        updateUser(state, action) {
            state.isLoggedIn = true;
            state.user.memberBoards.push(action.payload);
        },

        updateUserBoards(state, action) {
            state.isLoggedIn = true;
            state.user.memberBoards = state.user.memberBoards.filter(b => b !== action.payload);
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;