import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { startLoading, stopLoading } from "./loadingSlice";
const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  examRules: null,
  exam:null,
  leaderboardData:null,
  pastWinners:[],
  examQuestions:[],
  isExamScoreReturned:false,
  examAnswers:[],
  isSubmitLoading:false,
  allow_exam:true,
  examCertificate:[],
  isExamStart:false,
 
};

export const examRulesApi = createAsyncThunk("examRulesApi", async () => {
  const response = await fetch(`${url}/exams/check-attempt/beginner`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
     
    },
    
  });
  return response.json();
});

export const getExamQuestionsApi = createAsyncThunk("getExamQuestionsApi", async () => {
  const response = await fetch(`${url}/exams/beginner`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
     
    },
  });
  return response.json();
});

export const examApi = createAsyncThunk("examApi", async () => {
  const response = await fetch(`${url}/exams`, {
    method: "GET",
   
  });
  return response.json();
});

export const leaderboardApi = createAsyncThunk("leaderboardApi", async () => {
  const response = await fetch(`${url}/exam-results/leaderboard/beginner`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
  return response.json();
});

export const pastWinnersApi = createAsyncThunk("pastWinnersApi", async () => {
  const response = await fetch(`${url}/exam-results/past-winners?page=1&page_size=200`, {
    method: "GET",
    headers: {
     
      "Content-Type": "application/json",
    },
  });
  return response.json();
});

export const submitExamApi = createAsyncThunk(
  "submitExamApi",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());

      const response = await fetch(`${url}/exam-results/submit`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          difficulty_level: "BEGINNER",
          ...data,
        }),
      });

      const resData = await response.json();
      return resData;
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      dispatch(stopLoading());
    }
  }
);


export const getExamCertificate = createAsyncThunk("getExamCertificate", async (data) => {
  
  const response = await fetch(`${url}/exam-results/certificates`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      
    },
    
  });
  return response.json();
});

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    changeExamState: (state) => {
      state.isExamScoreReturned = false;
    },
    startExamState: (state) => {
      state.isExamStart = true;
    },
    finishExamState: (state) => {
      state.isExamStart = false;
    },
   
  },
  extraReducers: (builder) => {
    builder.addCase(examRulesApi.fulfilled, (state, action) => {
      state.examRules = action.payload.text;
      state.allow_exam=action.payload.allow_exam;
    });
    builder.addCase(examApi.fulfilled, (state, action) => {
      state.exam = action.payload.data;
      state.isExamScoreReturned=false;
    });
    builder.addCase(leaderboardApi.fulfilled, (state, action) => {
      state.leaderboardData = action.payload;
    });
    builder.addCase(pastWinnersApi.fulfilled, (state, action) => {
      state.pastWinners = action.payload.data;
    });
    builder.addCase(getExamQuestionsApi.fulfilled, (state, action) => {
      state.examQuestions = action.payload.data;
     
    });
    builder.addCase(submitExamApi.pending, (state, action) => {
      state.isSubmitLoading=true;
      
     
    });
    builder.addCase(submitExamApi.fulfilled, (state, action) => {
      state.isExamScoreReturned= true;
      state.examAnswers= action.payload.data;
      state.isSubmitLoading=false;
     
    });
    builder.addCase(submitExamApi.rejected, (state, action) => {
      state.isSubmitLoading=false;
     
    });
    builder.addCase(getExamCertificate.fulfilled, (state, action) => {
      state.examCertificate=action.payload.data;
     
    });
  },
});
export const { changeExamState ,startExamState,finishExamState} = examSlice.actions;
export default examSlice.reducer;
