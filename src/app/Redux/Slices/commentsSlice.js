// authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "https://api.sovrenn.com";

const initialState = {
  isCommentsDataLoading: false,
  comments: null,
};

export const getCommentsApi = createAsyncThunk(
  "getCommentsApi",
  async ({ company_id, component }) => {

    const response = await fetch(
      `${url}/comments/${component}/${company_id}?page=1&page_size=100&sort_by=latest`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "text/plain",
        },
      }
    );

    return response.json();
  }
);

export const postCommentApi = createAsyncThunk(
  "postCommentApi",
  async ({ comment, company_id, user_id, component }, { dispatch }) => {
    const body = {
      comment: comment,
      user_id: user_id,
    };

    if (component === "prime") {
      body.prime_id = company_id;
    } else if (component === "discovery") {
      body.company_id = company_id;
    }
    const response = await fetch(`${url}/comments`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (response.ok) {
      dispatch(getCommentsApi({ company_id: company_id,component:component }));
      dispatch(
        setSnackStatus({
          status: true,
          severity: "success",
          message: "Added new comment",
        })
      );
    }

    return result;
  }
);

export const commentLikeApi = createAsyncThunk(
  "commentLikeApi",
  async ({ company_id, comment_id,component }, { dispatch }) => {
    const response = await fetch(`${url}/comments/${comment_id}/like`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: "",
    });
    const result = await response.json();

    if (response.ok) {
      dispatch(getCommentsApi({ company_id :company_id,component:component  }));
    }

    return result;
  }
);

export const commentunLikeApi = createAsyncThunk(
  "commentunLikeApi",
  async ({ company_id, comment_id,component }, { dispatch }) => {
    const response = await fetch(`${url}/comments/${comment_id}/like`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "text/plain",
      },
    });
    if (response.ok) {
      dispatch(getCommentsApi({ company_id :company_id,component:component}));
    }

    return response.json();
  }
);

export const commentDeleteApi = createAsyncThunk(
  "commentDeleteApi",
  async ({ company_id, comment_id,component }, { dispatch }) => {
    const response = await fetch(`${url}/comments/${comment_id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (response.ok) {
      dispatch(getCommentsApi({company_id :company_id,component:component }));
      dispatch(
        setSnackStatus({
          status: true,
          severity: "warning",
          message: "Comment deleted",
        })
      );
    }

    return result;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Comment delete Api

    builder.addCase(commentDeleteApi.rejected, (state, action) => {
      state.isError = true;
    });

    // Comment Like Api
    builder.addCase(commentLikeApi.fulfilled, (state, action) => {
      state.isBookmarked = action.payload;
    });

    builder.addCase(commentLikeApi.rejected, (state, action) => {
      state.isError = true;
    });

    // Comment unlike Api

    builder.addCase(commentunLikeApi.rejected, (state, action) => {
      state.isError = true;
    });

    // GET comments Api
    builder.addCase(getCommentsApi.pending, (state, action) => {
      state.isCommentsDataLoading = true;
    });
    builder.addCase(getCommentsApi.fulfilled, (state, action) => {
      state.isCommentsDataLoading = false;
      state.comments = action.payload;
    });
    builder.addCase(getCommentsApi.rejected, (state, action) => {
      state.isError = true;
      state.isCommentsDataLoading = false;
    });
  },
});

export default commentsSlice.reducer;
