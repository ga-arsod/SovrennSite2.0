// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
 isAuth:false,
 token:null,
  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   
    loginSuccess: (state, action) => {
      state.isAuth = true;
      state.user = action.payload.user;
      state.token=action.payload.token
     
    },
   
    logout: (state) => {
      state.user = false;
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess,  logout } = authSlice.actions;
export default authSlice.reducer;