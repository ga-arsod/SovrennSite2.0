import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setSnackStatus } from "./snackbarSlice";
const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  weeklyTopSearches: [],
  suggestedCompanies:[],
  companySummary:null,
  discoveryData:null,
  timesData:null,
  ipoData:null,
  pulseData:null,
  primeData:null,
  timesPagination:null,

};

export const getWeeklyTopSearchesApi = createAsyncThunk(
  "getWeeklyTopSearchesApi",
  async () => {
    const response = await fetch(`${url}/search-history`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
  
      },
      
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


export const getDiscoveryDataApi = createAsyncThunk(
  "getDiscoveryDataApi",
  async (company_id) => {
    const response = await fetch(`${url}/company/discovery-search/data/${company_id}`, {
      method: "GET",
      
    });

    return response.json();
  }
);

export const getPrimeDataApi = createAsyncThunk(
  "getPrimeDataApi",
  async (company_id) => {
    const response = await fetch(`${url}/prime-research/search/data/${company_id}`, {
      method: "GET",
      
    });

    return response.json();
  }
);

export const getTimesDataApi = createAsyncThunk(
  "getTimesDataApi",
  async (company_id) => {
    const response = await fetch(`${url}/news/search/data/${company_id}`, {
      method: "GET",
      
    });

    return response.json();
  }
);

export const getIpoDataApi = createAsyncThunk(
  "getIpoDataApi",
  async (company_id) => {
    const response = await fetch(`${url}/ipo/search/data/${company_id}`, {
      method: "GET",
      
    });

    return response.json();
  }
);

export const getPulseDataApi = createAsyncThunk(
  "getPulseDataApi",
  async (company_id) => {
    const response = await fetch(`${url}/corporate-updates/search/data/${company_id}`, {
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
    builder.addCase(getDiscoveryDataApi.fulfilled, (state, action) => {
      
      state.discoveryData = action.payload?.data;
    });
    builder.addCase(getPrimeDataApi.fulfilled, (state, action) => {
      
      state.primeData = action.payload?.data;
    });
    builder.addCase(getTimesDataApi.fulfilled, (state, action) => {
      
      state.timesData = action.payload?.data;
      state.timesPagination= action?.payload?.pagination
    });
    builder.addCase(getIpoDataApi.fulfilled, (state, action) => {
      
      state.ipoData = action.payload?.data;
    });
    builder.addCase(getPulseDataApi.fulfilled, (state, action) => {
      
      state.pulseData = action.payload?.data;
    });
   
   
  },
});

export default searchSlice.reducer;
