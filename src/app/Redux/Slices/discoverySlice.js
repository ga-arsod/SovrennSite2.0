<<<<<<< HEAD
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "https://api.sovrenn.com";
const initialState = {
  importantBuckets: [],
  buckets: [],
  isLoading: false,
  isError: false,
  myBuckets: [],
  discoveryTableBucket: [],
  title: "",
};

export const importantBucketsApi = createAsyncThunk(
  "importantBucketsApiData",
  async () => {
    const response = await fetch(`${url}/buckets/importants`, {
      method: "GET",
    });
    return response.json();
  }
);

export const bucketsApiCall = createAsyncThunk(
  "bucketsApiCallData",
  async () => {
    const response = await fetch(`${url}/buckets/`, {
      method: "GET",
    });
    return response.json();
  }
);

export const myBucketsApiCall = createAsyncThunk(
  "myBucketsApiCallData",
  async () => {
    const response = await fetch(`${url}/my-buckets/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.json();
  }
);

export const deleteCustomBucketApi = createAsyncThunk(
  "deleteCustomBucketApi",
  async (id) => {
    const response = await fetch(`${url}/my-buckets/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.json();
  }
);

export const createCustomBucketApi = createAsyncThunk(
  "customBucketApi",
  async (data) => {
    const response = await fetch(`${url}/my-buckets/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }
);

export const discoveryTableApi = createAsyncThunk(
  "discoveryTableApi",
  async (id) => {
    const response = await fetch(`${url}/buckets/${id}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    return response.json();
  }
);

const discoverySlice = createSlice({
  name: "discovery",
  initialState,
  reducers: {
    changeModalState: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
  extraReducers: (builder) => {
    // GET request for important buckets
    builder.addCase(importantBucketsApi.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(importantBucketsApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.importantBuckets = action.payload.buckets;
    });
    builder.addCase(importantBucketsApi.rejected, (state, action) => {
      state.isError = true;
    });
    // GET request for buckets
    builder.addCase(bucketsApiCall.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(bucketsApiCall.fulfilled, (state, action) => {
      state.isLoading = false;
      state.buckets = action.payload;
    });
    builder.addCase(bucketsApiCall.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });

    // POST request for bucket
    builder.addCase(createCustomBucketApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCustomBucketApi.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createCustomBucketApi.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    });

    // GET request for My buckets
    builder.addCase(myBucketsApiCall.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(myBucketsApiCall.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myBuckets = action.payload.buckets;
    });
    builder.addCase(myBucketsApiCall.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    // Delete custom buckets
    builder.addCase(deleteCustomBucketApi.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCustomBucketApi.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteCustomBucketApi.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });

    // Get Discover Table Data Api
    builder.addCase(discoveryTableApi.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(discoveryTableApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.discoveryTableBucket = action.payload.data.companies;
      state.title = action.payload.data.title;
    });
    builder.addCase(discoveryTableApi.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});
export const { changeModalState } = discoverySlice.actions;
export default discoverySlice.reducer;
=======
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
>>>>>>> d2a73fc59bc64d5474bb022daa9106b147ef1e2b
