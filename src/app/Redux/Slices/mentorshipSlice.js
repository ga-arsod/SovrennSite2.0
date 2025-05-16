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
    async (_, { dispatch, rejectWithValue }) => {
      try {
        dispatch(startLoading());
  
        const response = await fetch(`${url}/mentor-batches/details/681860b6c8c979b906b39f6a`, {
          method: "GET",
          headers: { 'Content-Type': 'text/plain',
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzYzI1ZWFiMjBjYTBhZmJlMzM0ZDE5YSIsImZpcnN0X25hbWUiOiJHYXVyYXYiLCJsYXN0X25hbWUiOiJBcnNvZCIsImVtYWlsIjoiZ2FhcnNvZEB5YWhvby5jb20iLCJwaG9uZV9udW1iZXIiOiI5MDIyNDkwMjk3IiwicHJvZmlsZV9waWMiOiJodHRwczovL2R3aHQ1cDV4ZGhxbDMuY2xvdWRmcm9udC5uZXQvUFJPRklMRV9QSUNUVVJFUy8xNzM0MDAwMDkyNDM1U292cmVubkljb25EYXJrLmpwZyIsImNvdW50cnlfY29kZSI6Iis5MSIsInN0YXRlIjoiTWFoYXJhc2h0cmEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiY291cnNlX0lkIjpbIjY0MDFjYjcyMjY2ZWE1Y2VkNmRiMWQyZCIsIjY0MTcwZWNkNDlmOGEwNGQ4MjVhZmUzNiIsIjY0MmU5N2RjZmNhNWUyNDFiNDk3YWVmYiIsIjY0Mzk1ZWQ4MjI1MGI2Y2ZlNWZmNmVlNCJdLCJzdWJzY3JpcHRpb25zIjpbImZ1bGwtYWNjZXNzIl0sInRvdGFsX3NwZW50IjozNTAyLCJ0cmlhbF9leHBpcmVkIjpmYWxzZSwidG9fcGF5X2Zvcl9mYSI6MzUwMCwidG9fcGF5X2Zvcl90cmlhbCI6MCwidG9fcGF5X2Zvcl90aW1lcyI6MTUwLCJ0cmlhbF92YWxpZGl0eSI6IjQ1IERheXMiLCJzdXBwb3J0X251bWJlciI6Iis5MTkyODk0NjY0NDgiLCJzdXBwb3J0X2VtYWlsIjoiaGVscEBzb3ZyZW5uLmNvbSIsImhvd190b191c2Vfc292cmVubl92aWRlbyI6eyJ1cmwiOiJodHRwczovL2R3aHQ1cDV4ZGhxbDMuY2xvdWRmcm9udC5uZXQvVklERU8vSG93VG9Vc2VTb3ZyZW5uSW50cm8ubXA0IiwidGh1bWJuYWlsIjoiaHR0cHM6Ly9kd2h0NXA1eGRocWwzLmNsb3VkZnJvbnQubmV0L1RIVU1CL0hvd1RvVXNlU292cmVublYxVGh1bWIucG5nIn0sInRvdGFsX2VsaWdpYmxlX3Jld2FyZF9hbW91bnQiOiLigrkzLDAwMCIsInJvbGUiOlsidXNlciIsImFkbWluIl19LCJpYXQiOjE3Mzg4MzI0MzZ9.VP5KnNQuB5XlPy98YGlLie8UWsz7AXRKLNoJ51ll7j0",
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
