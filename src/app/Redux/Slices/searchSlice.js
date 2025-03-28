import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setSnackStatus } from "./snackbarSlice";
const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  weeklyTopSearches: [],
  suggestedCompanies:[],
  companySummary:null,
};

export const getWeeklyTopSearchesApi = createAsyncThunk(
  "getWeeklyTopSearchesApi",
  async () => {
    const response = await fetch(`${url}/search-history`, {
      method: "GET",
      
    });

    return response.json();
  }
);

export const getCompanySuggestionsApi = createAsyncThunk(
  "getCompanySuggestions",
  async (q) => {
    const response = await fetch(`${url}/company/suggest?q=${q}`, {
      method: "GET",
      
    });

    return response.json();
  }
);

export const getCompanyDataApi = createAsyncThunk(
  "getCompanyDataApi",
  async (company_id) => {
    const response = await fetch(`${url}/company/search/data/${company_id}`, {
      method: "GET",
      
    });

    return response.json();
  }
);




const searchSlice = createSlice({
  name: "search",
  initialState,
  
  extraReducers: (builder) => {
    
    builder.addCase(getWeeklyTopSearchesApi.fulfilled, (state, action) => {
      
      state.weeklyTopSearches = action.payload?.data;
    });
    builder.addCase(getCompanySuggestionsApi.fulfilled, (state, action) => {
      
      state.suggestedCompanies = action.payload?.data;
    });
    builder.addCase(getCompanyDataApi.fulfilled, (state, action) => {
      
      state.companySummary = action.payload?.data;
    });
   
  },
});

export default searchSlice.reducer;
