import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    count: 0, 
    loadingStarted: false, 
  },
  reducers: {
    startLoading: (state) => {
      state.count += 1;
      state.loadingStarted = true;
    },
    stopLoading: (state) => {
      state.count = Math.max(0, state.count - 1);
      state.loadingStarted = false;
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
