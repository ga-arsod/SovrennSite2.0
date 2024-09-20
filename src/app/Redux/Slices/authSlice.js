// authSlice.js
import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const url = "https://api.sovrenn.com";

const initialState = {
  user: null,
 isAuth:false,
 token:null,
 userDetails:null,
 userDetailsLoading:false,
};

export const userDetailsApi = createAsyncThunk(
  "userDetailsApi",
  async () => {
    const response = await fetch(`${url}/user`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.json();
  }
);

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
      state.isAuth = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userDetailsApi.pending, (state, action) => {
      state.userDetailsLoading = true;
    });
    builder.addCase(userDetailsApi.fulfilled, (state, action) => {
      state.userDetailsLoading = false;
      state.userDetails = action.payload.user;
    });
    builder.addCase(userDetailsApi.rejected, (state, action) => {
     
      state.userDetailsLoading = false;
    });
  }
});

export const { loginSuccess,  logout } = authSlice.actions;
export default authSlice.reducer;