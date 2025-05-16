import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { startLoading, stopLoading } from "./loadingSlice";
const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  isTermAndConditionsLoading: false,
  termAndConditions: null,
  isMentorshipInfoLoading:false,
  mentorshipInfo:null,
  isDashboardInfoLoading:false,
  dashboardInfo:null
};

export const mentorshipTermAndConditionsApi = createAsyncThunk(
    "mentorshipTermAndConditionsApi",
    async (_, { dispatch, rejectWithValue }) => {
      try {
        dispatch(startLoading());
  
        const response = await fetch(`${url}/mentor-batches/terms-and-condition`, {
          method: "GET",
        });
  
        const resData = await response.json();
        return resData;
      } catch (error) {
        return rejectWithValue(error);
      } finally {
        dispatch(stopLoading());
      }
    }
  );
  export const mentorshipInfoApi = createAsyncThunk(
    "mentorshipInfoApi",
    async (_, { dispatch, rejectWithValue }) => {
      try {
        dispatch(startLoading());
  
        const response = await fetch(`${url}/mentor-batches/info`, {
          method: "GET",
        });
  
        const resData = await response.json();
        return resData;
      } catch (error) {
        return rejectWithValue(error);
      } finally {
        dispatch(stopLoading());
      }
    }
  );
  export const dashboardInfoApi = createAsyncThunk(
    "dashboardInfoApi",
    async (user_id, { dispatch, rejectWithValue }) => {
      try {
        dispatch(startLoading());
  
        const response = await fetch(`${url}/mentor-batches/details/${user_id}`, {
          method: "GET",
          headers: { 'Content-Type': 'text/plain',
            Authorization: "Bearer " + localStorage.getItem("token"),
           },
        });
  
        const resData = await response.json();
        return resData;
      } catch (error) {
        return rejectWithValue(error);
      } finally {
        dispatch(stopLoading());
      }
    }
  );

const mentorshipSlice = createSlice({
  name: "mentorship",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(mentorshipTermAndConditionsApi.pending, (state, action) => {
      state.isTermAndConditionsLoading = true;
    });
    builder.addCase(
      mentorshipTermAndConditionsApi.fulfilled,
      (state, action) => {
        state.isTermAndConditionsLoading = false;
        state.termAndConditions = action.payload?.data;
      }
    );
    builder.addCase(
      mentorshipTermAndConditionsApi.rejected,
      (state, action) => {
        state.isTermAndConditionsLoading = false;
      }
    );
    builder.addCase(mentorshipInfoApi.pending, (state, action) => {
        state.isMentorshipInfoLoading = true;
      });
      builder.addCase(
        mentorshipInfoApi.fulfilled,
        (state, action) => {
          state.isMentorshipInfoLoading = false;
          state.mentorshipInfo = action.payload?.data;
        }
      );
      builder.addCase(
       mentorshipInfoApi.rejected,
        (state, action) => {
          state.isMentorshipInfoLoading = false;
        }
      );
      builder.addCase(dashboardInfoApi.pending, (state, action) => {
        state.isDashboardInfoLoading = true;
      });
      builder.addCase(
        dashboardInfoApi.fulfilled,
        (state, action) => {
          state.isDashboardInfoLoading = false;
          state.dashboardInfo = action.payload?.data;
        }
      );
      builder.addCase(
      dashboardInfoApi.rejected,
        (state, action) => {
          state.isDashboardInfoLoading = false;
        }
      );
  },
});

export default mentorshipSlice.reducer;
