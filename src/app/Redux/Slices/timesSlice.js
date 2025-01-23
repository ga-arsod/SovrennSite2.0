import { Pagination } from "@mui/material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  timesFilter: [],
  timesPdfFilter:[],
  isError: false,
  isArticleFilterOpen:false,
  isPdfModalOpen:false,
  timesArticle:[],
  timesPdfList:[],
  isTimesArticleLoading:false,
  isPdfListLoading:false,
  pdfData:null,
  isPdfDataLoading:false,
  pagination:{},
};

export const timesFilterApi = createAsyncThunk("timesFilterApi", async () => {
  const response = await fetch(`${url}/news/filters?platform=website`, {
    method: "GET",
  });
  return response.json();
});

export const timesPdfFilterApi = createAsyncThunk("timesPdfFilterApi", async () => {
  const response = await fetch(`${url}/news/pdf-filters?platform=website`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
     
    },
  });
  return response.json();
});

export const timesPdfListApi = createAsyncThunk("timesPdfListApi", async ({page,data}) => {
  const response = await fetch(`${url}/news/pdf-data?page=${page}&page_size=10`, {
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
  const response = await fetch(`${url}/news/pdf-content/${pdfId}?platform=website`, {
    method: "GET",
    headers: {
      
      "Content-Type": "application/json",
    },
  
    
  });

  
  return response.json();
});


export const timesArticleApi = createAsyncThunk(
  "timesArticleApi",
  async ({page,data},{dispatch}) => {
    const response = await fetch(`${url}/news/data?page=${page}&page_size=10`, {
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
  reducers: {
    toggleArticleFilter: (state) => {
      state.isArticleFilterOpen = !state.isArticleFilterOpen;
    },
   togglePdfFilter: (state) => {
      state.isPdfModalOpen= !state.isPdfModalOpen;
      
    },
    
  },

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
      if (Object.keys(action.meta.arg).length !== 0) {
        state.isTimesArticleLoading = false;
      }
      else
      state.isTimesArticleLoading = true;
      
    });
    builder.addCase(timesArticleApi.fulfilled, (state, action) => {
      const { page } = action.meta.arg;
      const newArticles = action.payload.data;
      if (page === 1) {
        
        state.timesArticle = newArticles;
      } else {
       
        state.timesArticle = [...state.timesArticle, ...newArticles];
      }
      
        state.isTimesArticleLoading = false;
      
     state.pagination=action.payload.pagination
     
      
    });
    builder.addCase(timesArticleApi.rejected, (state, action) => {
      state.isError = true;
      state.isTimesArticleLoading = false;
    });
     //times pdf list api
     builder.addCase(timesPdfListApi.pending, (state, action) => {
     
      if (Object.keys(action.meta.arg).length !== 0) {
        state.isPdfListLoading = false;
      }
      else
      state.isPdfListLoading = true;
     
    });
    builder.addCase(timesPdfListApi.fulfilled, (state, action) => {
      const { page } = action.meta.arg;
      const newArticles = action.payload.data;
      if (page === 1) {
        
        state.timesPdfList = newArticles;
      } else {
       
        state.timesPdfList = [...state.timesPdfList, ...newArticles];
      }
      state.isPdfListLoading = false;
      state.pagination=action.payload.pagination
      
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

export const { toggleArticleFilter ,togglePdfFilter} = timesSlice.actions;

export default timesSlice.reducer;
