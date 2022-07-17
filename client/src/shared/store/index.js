import userSlice from './user-slice';
import boardSlice from './kanban-slice';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        board: boardSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      })
});

export default store