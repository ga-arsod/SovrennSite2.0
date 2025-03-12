import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setSnackStatus } from "./snackbarSlice";
const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  alertKeywords: [],
  filingFilter: [],
  isFilingFilterOpen: false,
  allFiling: [],
  myFiling:[],
  isFilingLoading: false,
  isMyFilingLoading:false,
  isMyFilingFilterOpen:false,
  myFilingFilter:[],
  pagination:{},
};

export const getAlertKeywordsApi = createAsyncThunk(
  "getAlertKeywordsApi",
  async () => {
   
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

export const myFilingFilterApi = createAsyncThunk("myFilingFilterApi", async () => {
  const response = await fetch(`${url}/corporate-updates/by-keywords-filters`, {
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

export const myFilingApi = createAsyncThunk(
  "myFilingApi",
  async ({ text, page, pageSize, data }) => {
    const response = await fetch(
      `${url}/corporate-updates/by-keywords?s=${text}&page=${page}&page_size=${pageSize}`,
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
    toggleMyFilingFilter: (state) => {
      state.isMyFilingFilterOpen = !state.isMyFilingFilterOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAlertKeywordsApi.fulfilled, (state, action) => {
      state.alertKeywords = action.payload.data;
    });
    builder.addCase(filingFilterApi.fulfilled, (state, action) => {
      state.filingFilter = action.payload.data;
    });
    builder.addCase(myFilingFilterApi.fulfilled, (state, action) => {
      state.myFilingFilter = action.payload.data;
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
    builder.addCase(myFilingApi.pending, (state, action) => {
      state.isMyFilingLoading = true;
    });
    builder.addCase(myFilingApi.fulfilled, (state, action) => {
      const { page } = action.meta.arg;
      const newArticles = action.payload.data;
      if (page === 1) {
        state.myFiling = newArticles;
      } else {
        state.myFiling = [...state.myFiling, ...newArticles];
      }
      state.pagination = action.payload.pagination;
      state.isMyFilingLoading = false;
    });
    builder.addCase(myFilingApi.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const { toggleFilingFilter,toggleMyFilingFilter } = filingSlice.actions;
export default filingSlice.reducer;
