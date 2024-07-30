import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
 severity:"",
 message:"",
  
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
   
    setSnackStatus: (state, action) => {
      state.status = action.payload.status;
      state.severity = action.payload.severity;
      state.message=action.payload.message
     
    },
    resetSnackStatus: (state) => {
        state.status = false;
        state.severity = "";
        state.message = "";
      },
   
   
  },
});

export const { setSnackStatus ,resetSnackStatus} = snackbarSlice.actions;
export default snackbarSlice.reducer;