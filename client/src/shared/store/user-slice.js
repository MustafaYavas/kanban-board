import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    isLoggedIn: false,
    userEmail:  null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        loginHandler(state, action) {
            state.isLoggedIn = true;
            state.userEmail = action.payload;
        },

        logoutHandler(state) {
            state.isLoggedIn = false;
            state.userEmail = null;
        },

        signupHandler(state, action) {
            state.isLoggedIn = true;
            state.userEmail = action.payload.email;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;