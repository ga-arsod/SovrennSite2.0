
import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
    posts: [],
    categories: [],
    pagination: {
        page: 0,
        pageCount: 0,
        pageSize: 20,
        total: 0,
    },
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

const knowledgeSlice = createSlice({
  name: 'knowledge',
  initialState,
  reducers: {
   
  
        setKnowledgeData: (state, action) => {
            state.posts = action.payload.posts;
            state.categories = action.payload.categories;
            state.pagination = action.payload.pagination;
        },
    
  },
  extraReducers: (builder) => {
    builder.addCase(userDetailsApi.pending, (state, action) => {
      state.userDetailsLoading = true;
    });
    builder.addCase(userDetailsApi.fulfilled, (state, action) => {
      state.userDetailsLoading = false;
      state.userDetails = action.payload?.user;
    });
    builder.addCase(userDetailsApi.rejected, (state, action) => {
     
      state.userDetailsLoading = false;
    });
  }
});

export const { setKnowledgeData } = knowledgeSlice.actions;
export default knowledgeSlice.reducer;