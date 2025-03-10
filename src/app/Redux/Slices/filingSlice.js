import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setSnackStatus } from "./snackbarSlice";
const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  alertkeywords: [],
  filingFilter: [],
  isFilingFilterOpen: false,
  allFiling: [],
  isFilingLoading: false,
};

export const getAlertKeywordsApi = createAsyncThunk(
  "getAlertKeywordsApi",
  async () => {
    console.log("inside api");
    const response = await fetch(`${url}/user/filling-keywords`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    return response.json();
  }
);

export const filingFilterApi = createAsyncThunk("filingFilterApi", async () => {
  const response = await fetch(`${url}/corporate-updates/all-filters`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.json();
});
export const allFilingApi = createAsyncThunk(
  "allFilingApi",
  async ({ text, page, pageSize, data }) => {
    const response = await fetch(
      `${url}/corporate-updates/all?s=${text}&page=${page}&page_size=${pageSize}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  }
);

export const updateAlertKeywordApi = createAsyncThunk(
  "updateAlertKeywordApi",
  async ({ keywords }, { dispatch }) => {
    const response = await fetch(`${url}/user/update-filling-keywords`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        keywords: [...keywords],
      }),
    });
    if (response.ok) {
      dispatch(getAlertKeywordsApi());
      dispatch(
        setSnackStatus({
          status: true,
          severity: "success",
          message: "Keywords updated successfully.",
        })
      );
    }
    return response.json();
  }
);

const filingSlice = createSlice({
  name: "filing",
  initialState,
  reducers: {
    toggleFilingFilter: (state) => {
      state.isFilingFilterOpen = !state.isFilingFilterOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAlertKeywordsApi.fulfilled, (state, action) => {
      state.alertkeywords = action.payload.data;
    });
    builder.addCase(filingFilterApi.fulfilled, (state, action) => {
      state.filingFilter = action.payload.data;
    });
    builder.addCase(allFilingApi.pending, (state, action) => {
      state.isFilingLoading = true;
    });
    builder.addCase(allFilingApi.fulfilled, (state, action) => {
      const { page } = action.meta.arg;
      const newArticles = action.payload.data;
      if (page === 1) {
        state.allFiling = newArticles;
      } else {
        state.allFiling = [...state.allFiling, ...newArticles];
      }
      state.pagination = action.payload.pagination;
      state.isFilingLoading = false;
    });
    builder.addCase(allFilingApi.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const { toggleFilingFilter } = filingSlice.actions;
export default filingSlice.reducer;
