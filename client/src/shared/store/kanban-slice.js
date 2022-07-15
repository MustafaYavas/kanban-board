import { createSlice } from '@reduxjs/toolkit';

const initialBoardState = {
    board: null,
    allBoards: null,
    searchKey: '',
    searchedBoards: null
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

        moveBoardItemHandler(state, action) {
            const allTasks = state.board.tasks;
            const updatedTasks = allTasks.map(task => {
                if(task.id === action.payload.id) return {...task, taskTable: action.payload.table}
                return task;
            });

            state.board.tasks = updatedTasks;
        },

        clearCurrentBoard(state) {
            state.board = null;
        },

        setAllBoards(state, action) {
            state.allBoards = action.payload
        },

        sortByDateDesc(state) {
            const sorted = state.allBoards.sort((a, b) => {
                let newA = a.createDate, newB = b.createDate;
                if (newA < newB)  return 1;
                if (newA > newB) return -1;
                return 0;
            })
            state.allBoards = sorted;
        },

        sortByDateAsc(state) {
            const sorted = state.allBoards.sort((a, b) => {
                let newA = a.createDate, newB = b.createDate;
                if (newA < newB)  return -1;
                if (newA > newB) return 1;
                return 0;
            })
            state.allBoards = sorted;
        },

        sortByAlphabetical(state) {
            const sorted = state.allBoards.sort((a, b) => {
                let newA = a.title.toLowerCase(), newB = b.title.toLowerCase();
                if (newA < newB)  return -1;
                if (newA > newB) return 1;
                return 0;
            })

            state.allBoards = sorted;
        },

        sortByMemberNumber(state) {
            const sorted = state.allBoards.sort((a, b) => {
                let newA = a.membersNumber, newB = b.membersNumber;
                if (newA < newB)  return 1;
                if (newA > newB) return -1;
                return 0;
            })
            state.allBoards = sorted;
        },

        searchBoards(state, action) {
            state.searchKey = action.payload;
            if(state.allBoards) {
                const results = state.allBoards.filter(board => board.title.includes(action.payload));
                state.searchedBoards = results;
            }
            if(action.payload === '') 
                state.searchedBoards = []
        }
    }
});

export const boardActions = boardSlice.actions;
export default boardSlice;