import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const url="https://api.sovrenn.com";
const initialState = {
  importantBuckets:[],
   isLoading:false,
    isError:false,
  };

  export const importantBucketsApi=createAsyncThunk("importantBucketsApiData",async ()=>{
    const response=await fetch(`${url}/buckets/importants`,{
      method: "GET",
     
  })
    return response.json()
  })
  
  const discoverySlice = createSlice({
    name: 'discovery',
    initialState,
   
    extraReducers:(builder)=>{
      builder.addCase(importantBucketsApi.pending,(state,action)=>{
        state.isLoading=true
      });
      builder.addCase(importantBucketsApi.fulfilled,(state,action)=>{
           state.isLoading=false,
           state.importantBuckets=action.payload.buckets
      });
      builder.addCase(importantBucketsApi.rejected,(state,action)=>{
        state.isError=true
      });

    }
     
    
   
  });

  export default discoverySlice.reducer;