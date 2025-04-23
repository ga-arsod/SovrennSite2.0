import { createAsyncThunk, createSlice,rejectWithValue } from "@reduxjs/toolkit";
import { setSnackStatus } from "./snackbarSlice";

import { startLoading, stopLoading } from "./loadingSlice";
const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  testQuestions:[],
  isExamStart:false,
  examResult:null,
  isExamScoreReturned:false,
  isQuestionLoading:false,
  isExamScoreLoading:false,
};

export const sendUserDataApi = createAsyncThunk(
  "sendUserDataApi",
  async ({finalData}, { dispatch }) => {
    const response = await fetch(`${url}/user/tyi-profile`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });

    if (response.ok) {
      dispatch(
        setSnackStatus({
          status: true,
          severity: "success",
          message: "Data sent successfully!",
        })
      );
      
      
    } 

    return response.json();
  }
);


export const getInvestingQuestionsApi = createAsyncThunk(
  "getInvestingQuestionsApi",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());

      const response = await fetch(`${url}/questions/tyi`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      dispatch(stopLoading());
    }
  }
);


export const submitInvestingExamApi = createAsyncThunk(
  "submitInvestingExamApi",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());

      const response = await fetch(`${url}/questions/tyi-submit`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok) {
        dispatch(toggleExamScore());
        dispatch(
          setSnackStatus({
            status: true,
            severity: "success",
            message: "Exam submitted successfully!",
          })
        );
      }

      return resData;
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      dispatch(stopLoading());
    }
  }
);

const investingSlice = createSlice({
  name: "investing",
  initialState,
  reducers: {
    toggleExamScore: (state) => {
     
      state.isExamScoreReturned = true;
    },
   
    toggleExamState: (state) => {
      state.isExamStart = !state.isExamStart;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInvestingQuestionsApi.pending, (state, action) => {
      state.isQuestionLoading = true;
    });
    builder.addCase(getInvestingQuestionsApi.fulfilled, (state, action) => {

      state.testQuestions = action?.payload?.data;
      state.isQuestionLoading = false;
    });
    builder.addCase(getInvestingQuestionsApi.rejected, (state, action) => {
     
      state.isQuestionLoading = false;
    });
    builder.addCase(submitInvestingExamApi.pending, (state, action) => {
      state.examResult = action?.payload?.data;
      state.isExamScoreLoading = true;
    });
    builder.addCase(submitInvestingExamApi.fulfilled, (state, action) => {
      state.examResult = action?.payload?.data;
      state.isExamScoreLoading = false;
    });
    builder.addCase(submitInvestingExamApi.rejected, (state, action) => {
      state.examResult = action?.payload?.data;
      state.isExamScoreLoading = false;
    });
  },
});
export const { toggleExamScore,toggleExamState} = investingSlice.actions;
export default investingSlice.reducer;
