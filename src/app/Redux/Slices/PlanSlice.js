
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://api.sovrenn.com";

const initialState = {
  isLoading:false,
  plans:[],
};

export const allPlansApi = createAsyncThunk("allPlansApi", async () => {
  const response = await fetch(`${url}/common/all-plans`, {
    method: "GET",
    
  });
  return response.json();
});




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
   
  },
});


export default plansSlice.reducer;
