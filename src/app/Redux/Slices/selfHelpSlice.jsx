// selfHelpSlice.js
import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setSnackStatus } from './snackbarSlice';

const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
 isCalculationLoading:false,
 selfHelpCalculatedData:[],
 isCalculatedDataAvailable:false,
 uptrend_potential:"",
 expected_price_after_1year:"",
};

export const selfHelpCalculationApi = createAsyncThunk(
  "selfHelpCalculationApi",
  async (calculation_data) => {
    const response = await fetch(`${url}/common/self-help?platform=website`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(calculation_data),
    });
    const data= await response.json();
    
   
    return data;
  }
);

const selfHelpSlice = createSlice({
  name: 'selfHelp',
  initialState,
  reducers: {
    resetCalculatedData(state) {
      state.isCalculatedDataAvailable = false;
    },
    validateWatchlist(state) {
      status:false;
      message:""
    }
  },
  extraReducers: (builder) => {
    builder.addCase(selfHelpCalculationApi.pending, (state, action) => {
      state.isCalculationLoading = true;
      state.isCalculatedDataAvailable=false;
    });
    builder.addCase(selfHelpCalculationApi.fulfilled, (state, action) => {
      state.isCalculationLoading = false;
      state.isCalculatedDataAvailable=true;
      state.selfHelpCalculatedData = action.payload.output;
      state.uptrend_potential = action.payload.forWatchlist.uptrend_potential;
      state.expected_price_after_1year = action.payload.forWatchlist.expected_price_after_1year;
    });
    builder.addCase(selfHelpCalculationApi.rejected, (state, action) => {
      state.isCalculatedDataAvailable=false;
      state.isCalculationLoading = false;
    });
  }
});

export const { resetCalculatedData,validateWatchlist} = selfHelpSlice.actions;
export default selfHelpSlice.reducer;