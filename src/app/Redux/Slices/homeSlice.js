import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const url="https://api.sovrenn.com";
const initialState = {
   articleUpdates:null,
   isLoading:false,
    isError:false,
  };

  export const homeUpdatesApi=createAsyncThunk("apidata",async ()=>{
    const response=await fetch(`${url}/user/new-updates`,{
      method: "GET",
      headers: {
          "Authorization": "Bearer " + localStorage.getItem('token'),
      }
  })
    return response.json()
  })
  
  const homeSlice = createSlice({
    name: 'home',
    initialState,
   
    extraReducers:(builder)=>{
      builder.addCase(homeUpdatesApi.pending,(state,action)=>{
        state.isLoading=true
      });
      builder.addCase(homeUpdatesApi.fulfilled,(state,action)=>{
           state.isLoading=false,
           state.articleUpdates=action.payload
      });
      builder.addCase(homeUpdatesApi.rejected,(state,action)=>{
        state.isError=true
      });

    }
     
    
   
  });

  export default homeSlice.reducer;