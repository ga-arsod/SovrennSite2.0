import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://api.sovrenn.com";

const initialState = {
  timesFilter: [],
  timesPdfFilter:[],
  isError: false,
  timesArticle:[],
  timesPdfList:[],
  isTimesArticleLoading:false,
  isPdfListLoading:false,
  pdfData:null,
  isPdfDataLoading:false,
};

export const timesFilterApi = createAsyncThunk("timesFilterApi", async () => {
  const response = await fetch(`${url}/news/filters`, {
    method: "GET",
  });
  return response.json();
});

export const timesPdfFilterApi = createAsyncThunk("timesPdfFilterApi", async () => {
  const response = await fetch(`${url}/news/pdf-filters`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
     
    },
  });
  return response.json();
});

export const timesPdfListApi = createAsyncThunk("timesPdfListApi", async (data) => {
  const response = await fetch(`${url}/news/pdf-data`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
});

export const timesPdfDataApi = createAsyncThunk("timesPdfDataApi", async (pdfId) => {
  const response = await fetch(`${url}/news/pdf-content/${pdfId}`, {
    method: "GET",
    headers: {
      
      "Content-Type": "application/json",
    },
    
  });
  return response.json();
});


export const timesArticleApi = createAsyncThunk(
  "timesArticleApi",
  async (data) => {
    const response = await fetch(`${url}/news/data`, {
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

const timesSlice = createSlice({
  name: "times",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(timesFilterApi.fulfilled, (state, action) => {
      state.timesFilter = action.payload.data;
    });
    builder.addCase(timesFilterApi.rejected, (state, action) => {
      state.isError = true;
    });

     //Times pdf filter api
    builder.addCase(timesPdfFilterApi.fulfilled, (state, action) => {
      state.timesPdfFilter = action.payload.data;
    });
    builder.addCase(timesPdfFilterApi.rejected, (state, action) => {
      state.isError = true;
    });

    //article api
    builder.addCase(timesArticleApi.pending, (state, action) => {
      state.isTimesArticleLoading = true;
    });
    builder.addCase(timesArticleApi.fulfilled, (state, action) => {
      state.isTimesArticleLoading = false;
      state.timesArticle = action.payload.data;
      
    });
    builder.addCase(timesArticleApi.rejected, (state, action) => {
      state.isError = true;
      state.isTimesArticleLoading = false;
    });
     //times pdf list api
     builder.addCase(timesPdfListApi.pending, (state, action) => {
      state.isPdfListLoading = true;
    });
    builder.addCase(timesPdfListApi.fulfilled, (state, action) => {
      state.isPdfListLoading = false;
      state.timesPdfList = action.payload.data;
      
    });
    builder.addCase(timesPdfListApi.rejected, (state, action) => {
      state.isError = true;
      state.isPdfListLoading = false;
    });

     // pdf data api
     builder.addCase(timesPdfDataApi.pending, (state, action) => {
      state.isPdfDataLoading = true;
    });
    builder.addCase(timesPdfDataApi.fulfilled, (state, action) => {
      state.isPdfDataLoading = false;
      state.pdfData = action.payload;
      
    });
    builder.addCase(timesPdfDataApi.rejected, (state, action) => {
      state.isError = true;
      state.isPdfDataLoading= false;
    });
  },
});


export default timesSlice.reducer;
