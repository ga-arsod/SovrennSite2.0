import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const url="https://api.sovrenn.com";
const initialState = {
   videoBucket:[],
   educationSlotsBucket:null,
  };

  export const educationVideosApi=createAsyncThunk("videosApi",async ()=>{
    const response=await fetch(`${url}/course/videos`,{
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
       
      },
     
  })
    return response.json()
  })

  export const educationSlotsApi = createAsyncThunk("slotsApi", async () => {
    const response = await fetch(`${url}/course`, {
      method: "GET",
    
    });
    return response.json();
  });
  
  
  const educationSlice = createSlice({
    name: 'education',
    initialState,
   
    extraReducers:(builder)=>{
      builder.addCase(educationVideosApi.pending,(state,action)=>{
        state.isLoading=true
      });
      builder.addCase(educationVideosApi.fulfilled,(state,action)=>{
           state.isLoading=false,
           state.videoBucket=action.payload.data.educationVideos;
      });
      builder.addCase(educationVideosApi.rejected,(state,action)=>{
        state.isError=true
      });

      builder.addCase(educationSlotsApi.pending,(state,action)=>{
        state.isLoading=true
      });
      builder.addCase(educationSlotsApi.fulfilled,(state,action)=>{
           state.isLoading=false,
           state.educationSlotsBucket=action.payload;
      });
      builder.addCase(educationSlotsApi.rejected,(state,action)=>{
        state.isError=true
      });

  

      

    }
     
    
   
  });

  export default educationSlice.reducer;