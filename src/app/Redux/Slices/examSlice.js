import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  examRules: null,
  exam:null,
  leaderboardData:null,
  pastWinners:[]
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

export const examApi = createAsyncThunk("examApi", async () => {
  const response = await fetch(`${url}/exams`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
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
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
  return response.json();
});

const examSlice = createSlice({
  name: "exam",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(examRulesApi.fulfilled, (state, action) => {
      state.examRules = action.payload.text;
    });
    builder.addCase(examApi.fulfilled, (state, action) => {
      state.exam = action.payload.data;
    });
    builder.addCase(leaderboardApi.fulfilled, (state, action) => {
      state.leaderboardData = action.payload.data;
    });
    builder.addCase(pastWinnersApi.fulfilled, (state, action) => {
      state.pastWinners = action.payload.data;
    });
  },
});

export default examSlice.reducer;
