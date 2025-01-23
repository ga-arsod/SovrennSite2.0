// authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setSnackStatus } from "./snackbarSlice";
const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  user: null,
  isAuth: false,
  token: null,
  userDetails: null,
  userDetailsLoading: false,
  isPasswordModalOpen: false,
  message: "",
  subscriptionDetails: [],

  linkMessage: "",
};

export const userDetailsApi = createAsyncThunk("userDetailsApi", async () => {
  const response = await fetch(`${url}/user?platform=website`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.json();
});

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
    const response = await fetch(`${url}/user/reset-password?platform=website`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        old_password: currentPassword,
        new_password: newPassword,
      }),
    });
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
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    googleLogin: (state, action) => {
      state.isAuth = true;
    },

    logout: (state) => {
      state.isAuth = false;
      localStorage.removeItem("token");
    },
    togglePasswordModal: (state) => {
      state.isPasswordModalOpen = !state.isPasswordModalOpen;
      state.message = "";
    },
    resetLinkMessage: (state) => {
      state.linkMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userDetailsApi.pending, (state, action) => {
      state.userDetailsLoading = true;
    });
    builder.addCase(userDetailsApi.fulfilled, (state, action) => {
      state.userDetailsLoading = false;
      state.userDetails = action.payload.user;
    });
    builder.addCase(userDetailsApi.rejected, (state, action) => {
      state.userDetailsLoading = false;
    });
    builder.addCase(resetPasswordApi.fulfilled, (state, action) => {
      state.message = action.payload.message;
    });
    builder.addCase(subscriptionDetailsApi.fulfilled, (state, action) => {
      state.subscriptionDetails = action.payload.data;
    });
    builder.addCase(sendPasswordLinkApi.fulfilled, (state, action) => {
      state.linkMessage = action.payload.message;
    });
  },
});

export const {
  loginSuccess,
  logout,
  googleLogin,
  togglePasswordModal,
  resetLinkMessage,
} = authSlice.actions;
export default authSlice.reducer;
