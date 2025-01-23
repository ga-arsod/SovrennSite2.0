import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  isLoading: false,
  plans: [],
  commonPrice: null,
};

export const allPlansApi = createAsyncThunk("allPlansApi", async () => {
  const response = await fetch(`${url}/common/all-plans?platform=website`, {
    method: "GET",
  });
  return response.json();
});

export const commonPricingApi = createAsyncThunk(
  "commonPricingApi",
  async () => {
    const response = await fetch(`${url}/common/pricing?platform=website`, {
      method: "GET",
    });
    return response.json();
  }
);

const plansSlice = createSlice({
  name: "plans",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(allPlansApi.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(allPlansApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.plans = action.payload.data;
    });
    builder.addCase(allPlansApi.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(commonPricingApi.fulfilled, (state, action) => {
      state.commonPrice = action.payload.data;
    });
  },
});

export default plansSlice.reducer;
