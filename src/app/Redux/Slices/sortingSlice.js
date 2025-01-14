import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sortBy: 'date', 
    sortOrder: 'dec',  
};

const sortingSlice = createSlice({
    name: 'sorting',
    initialState,
    reducers: {
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
        },
        toggleSortOrder: (state) => {
            state.sortOrder = state.sortOrder === 'inc' ? 'dec' : 'inc';
        },
        resetSorting: (state) => {
            state.sortBy = initialState.sortBy;
            state.sortOrder = initialState.sortOrder;
        },
    },
});

export const { setSortBy, setSortOrder, toggleSortOrder, resetSorting } = sortingSlice.actions;

export default sortingSlice.reducer;