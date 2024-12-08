// authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setSnackStatus } from "./snackbarSlice";
const url = "https://api.sovrenn.com";

const initialState = {
  user: null,
  isAuth: false,
  token: null,
  userDetails: null,
  userDetailsLoading: false,
  isPasswordModalOpen:false,
  message:"",
  subscriptionDetails:[]
};

export const userDetailsApi = createAsyncThunk("userDetailsApi", async () => {
  const response = await fetch(`${url}/user`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.json();
});

export const subscriptionDetailsApi = createAsyncThunk("subscriptionDetailsApi", async () => {
  const response = await fetch(`${url}/subscription/`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.json();
});

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

    const response = await fetch(`${url}/user/edit-profile`, {
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
export const resetPasswordApi = createAsyncThunk(
  "resetPasswordApi",
  async ({currentPassword,newPassword },{dispatch}) => {
    const response = await fetch(`${url}/user/reset-password`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        old_password:currentPassword,
        new_password:newPassword

      }),
    });
    if(response.ok)
    {
      dispatch(togglePasswordModal())
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
    togglePasswordModal:(state)=>{
      state.isPasswordModalOpen=!state.isPasswordModalOpen
      state.message=""
    }
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
  },
});

export const { loginSuccess, logout, googleLogin,togglePasswordModal } = authSlice.actions;
export default authSlice.reducer;
