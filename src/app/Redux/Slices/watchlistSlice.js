
import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setSnackStatus } from './snackbarSlice';
const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
 isWatchlistLoading:false,
 watchlistData:[],
 isEditModalOpen:false,
};

export const getWatchlistApi = createAsyncThunk(
  "getWatchlistApi",
  async () => {
    const response = await fetch(`${url}/user/my-watchlist`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.json();
  }
);

export const editWatchlistApi = createAsyncThunk(
    "editWatchlistApi",
    async ({id,editedValues},{dispatch}) => {
      const response = await fetch(`${url}/user/update-watchlist/${id}`, {
        method: "PATCH",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedValues),
      });
      const data= await response.json();
      
       if (response.ok) {
        dispatch(getWatchlistApi())
        dispatch(toggleEditModal())
          
            dispatch(
              setSnackStatus({
                status: true,
                severity: "success",
                message:"Watchlist updated successfully.",
              })
            );
          }
      
      return data;
    }
  );

  
  
const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    toggleEditModal: (state) => {
      state.isEditModalOpen = !state.isEditModalOpen;
    },
    
   
    
  },
  extraReducers: (builder) => {
    builder.addCase(getWatchlistApi.pending, (state, action) => {
      state.isWatchlistLoading = true;
    });
    builder.addCase(getWatchlistApi.fulfilled, (state, action) => {
      state.isWatchlistLoading = false;
      state.watchlistData = action.payload.myWatchlist;
    });
    builder.addCase(getWatchlistApi.rejected, (state, action) => {
     
      state.isWatchlistLoading = false;
    });
  }
});


export const { toggleEditModal} = watchlistSlice.actions;
export default watchlistSlice.reducer;