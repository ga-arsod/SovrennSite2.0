import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setSnackStatus } from "./snackbarSlice";
const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  weeklyTopSearches: [],
};

export const getWeeklyTopSearchesApi = createAsyncThunk(
  "getWeeklyTopSearchesApi",
  async () => {
    const response = await fetch(`${url}/search-history`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    return response.json();
  }
);

export const subscriptionDetailsApi = createAsyncThunk(
  "subscriptionDetailsApi",
  async () => {
    const response = await fetch(`${url}/subscription/?platform=website`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.json();
  }
);

export const editUserDetailsApi = createAsyncThunk(
  "editUserDetailsApi",
  async ({ formData }, { dispatch }) => {
    const formdata = new FormData();
    const names = formData.fullName.split(" ");
    const firstName = names.slice(0, -1).join(" ");
    const lastName = names[names.length - 1];
    formdata.append("first_name", firstName);
    formdata.append("last_name", lastName);
    formdata.append("state", formData.state);
    formdata.append("profile_pic", formData.profile_pic);

    const response = await fetch(`${url}/user/edit-profile?platform=website`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formdata,
    });

    if (response.ok) {
      dispatch(userDetailsApi());
      dispatch(
        setSnackStatus({
          status: true,
          severity: "success",
          message: "Profile updated successfully.",
        })
      );
    }
    return response.json();
  }
);

export const sendPasswordLinkApi = createAsyncThunk(
  "sendPasswordLinkApi",
  async (email, { dispatch }) => {
    const response = await fetch(`${url}/reset-link?platform=website`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    if (response.ok) {
      dispatch(
        setSnackStatus({
          status: true,
          severity: "success",
          message: "Email sent successfully.",
        })
      );
    }

    return response.json();
  }
);

export const changePasswordApi = createAsyncThunk(
  "changePasswordApi",
  async ({ password, token }, { dispatch }) => {
    const response = await fetch(`${url}/reset-password?platform=website`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      dispatch(
        setSnackStatus({
          status: true,
          severity: "success",
          message: "Password updated successfully.",
        })
      );
    }

    return { data, ok: response.ok };
  }
);
export const resetPasswordApi = createAsyncThunk(
  "resetPasswordApi",
  async ({ currentPassword, newPassword }, { dispatch }) => {
    const response = await fetch(
      `${url}/user/reset-password?platform=website`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old_password: currentPassword,
          new_password: newPassword,
        }),
      }
    );
    if (response.ok) {
      dispatch(togglePasswordModal());
      dispatch(
        setSnackStatus({
          status: true,
          severity: "success",
          message: "Password updated successfully.",
        })
      );
    }
    const result = await response.json();

    return result;
  }
);
const searchSlice = createSlice({
  name: "search",
  initialState,
  
  extraReducers: (builder) => {
    
    builder.addCase(getWeeklyTopSearchesApi.fulfilled, (state, action) => {
      
      state.weeklyTopSearches = action.payload?.data;
    });
   
  },
});

export default searchSlice.reducer;
