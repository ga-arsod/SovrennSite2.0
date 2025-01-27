import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const url = process.env.NEXT_PUBLIC_API_URL;
import { setSnackStatus } from './snackbarSlice';

const initialState = {
  articleUpdates: null,
  isLoading: false,
  isError: false,
  customerReviews: [],
  faqsArray: [],
};

// Fetch Article Updates
export const homeUpdatesApi = createAsyncThunk("apidata", async () => {
  const response = await fetch(`${url}/user/new-updates?platform=website`, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem('token'),
    }
  });
  return response.json();
  
});

// Contact Us Api
export const contactUsApi = createAsyncThunk(
  "contactUsApi",
  async ({payload}, { dispatch }) => {
    const response = await fetch(`${url}/common/mail-help?platform=website`, {
      method: "POST",
      headers: {
      
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
     
   
      dispatch(
        setSnackStatus({
          status: true,
          severity: "success",
          message: "Message has been sent successfully!",
        })
      );
    }
   

   

    return result;
  }
);



// Fetch Customer Reviews
export const customerReviewsApi = createAsyncThunk("customerReviewsApidata", async () => {
  const response = await fetch(`${url}/common/user-reviews?platform=website`, {
    method: "GET",
  });
  return response.json();
});

// Fetch FAQs
export const faqApi = createAsyncThunk("faqApi", async () => {
  const response = await fetch(`${url}/common/faqs?platform=website`, {
    method: "GET",
  });
  return response.json();
});


const homeSlice = createSlice({
  name: 'home',
  initialState,
  extraReducers: (builder) => {
    // Home Updates API
    builder.addCase(homeUpdatesApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(homeUpdatesApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.articleUpdates = action.payload;
    });
    builder.addCase(homeUpdatesApi.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    // Customer Reviews API
    builder.addCase(customerReviewsApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(customerReviewsApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.customerReviews = action.payload.data;
    });
    builder.addCase(customerReviewsApi.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    // FAQ API
    builder.addCase(faqApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(faqApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.faqsArray = action.payload.data;
    });
    builder.addCase(faqApi.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default homeSlice.reducer;