import { createAsyncThunk, createSlice, rejectWithValue } from "@reduxjs/toolkit";

import { setSnackStatus } from "./snackbarSlice";
const url = process.env.NEXT_PUBLIC_API_URL;
import { startLoading, stopLoading } from "./loadingSlice";



const initialState = {
  weeklyTopSearches: [],
  suggestedCompanies: [],
  companySummary: null,
  discoveryData: null,
  timesData: null,
  ipoData: null,
  pulseData: null,
  primeData: null,
  timesPagination: null,
  textSearchData: null,
  isDiscoveryLoading: true,
};

export const getWeeklyTopSearchesApi = createAsyncThunk(
  "getWeeklyTopSearchesApi",
  async () => {
    const token = localStorage.getItem("token");

    const options = {
      method: "GET",
    };

    if (token) {
      options.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await fetch(`${url}/search-history`, options);

    return response.json();
  }
);

export const deleteRecentSearchApi = createAsyncThunk(
  "deleteRecentSearchApi",
  async (company_id, { dispatch }) => {
    const response = await fetch(`${url}/search-history/${company_id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      dispatch(getWeeklyTopSearchesApi());
    }
    return response.json();
  }
);

export const textSearchDataApi = createAsyncThunk(
  "textSearchDataApi",
  async (q) => {
    const response = await fetch(`${url}/company/full-text-search?q=${q}`, {
      method: "GET",
    });

    return response.json();
  }
);

export const getCompanySuggestionsApi = createAsyncThunk(
  "getCompanySuggestions",
  async (q, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url}/company/suggest?q=${q}`, {
        method: "GET",
      });

      if (!response.ok) {

        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      return data;
    } catch (error) {

      return rejectWithValue(error.message || "Network error");
    }
  }
);


export const getCompanyDataApi = createAsyncThunk(
  "getCompanyDataApi",
  async (company_id) => {
    const response = await fetch(`${url}/company/search/data/${company_id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    return response.json();
  }
);



export const getDiscoveryDataApi = createAsyncThunk(
  "getDiscoveryDataApi",
  async (company_id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());

      const response = await fetch(
        `${url}/company/discovery-search/data/${company_id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      return data;
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      dispatch(stopLoading());
    }
  }
);


export const getPrimeDataApi = createAsyncThunk(
  "getPrimeDataApi",
  async (company_id) => {
    const response = await fetch(
      `${url}/prime-research/search/data/${company_id}`,
      {
        method: "GET",
      }
    );

    return response.json();
  }
);

export const getTimesDataApi = createAsyncThunk(
  "getTimesDataApi",
  async ({ company_id, page }) => {
    const response = await fetch(
      `${url}/news/search/data/${company_id}?page=${page}&page_size=10`,
      {
        method: "GET",
      }
    );

    return response.json();
  }
);

export const getIpoDataApi = createAsyncThunk(
  "getIpoDataApi",
  async (company_id) => {
    const response = await fetch(`${url}/ipo/search/data/${company_id}`, {
      method: "GET",
    });

    return response.json();
  }
);

export const getPulseDataApi = createAsyncThunk(
  "getPulseDataApi",
  async ({ company_id, page }) => {
    const response = await fetch(
      `${url}/corporate-updates/search/data/${company_id}?page=${page}&page_size=10`,
      {
        method: "GET",
      }
    );

    return response.json();
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetSearchState: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(getWeeklyTopSearchesApi.fulfilled, (state, action) => {
      state.weeklyTopSearches = action.payload?.data;
    });
    builder.addCase(getCompanySuggestionsApi.fulfilled, (state, action) => {
      state.suggestedCompanies = action.payload?.data;
    });
    builder.addCase(getCompanyDataApi.fulfilled, (state, action) => {
      state.companySummary = action.payload?.data;
    });
    builder.addCase(getDiscoveryDataApi.pending, (state, action) => {
      state.isDiscoveryLoading = true;
    });
    builder.addCase(getDiscoveryDataApi.fulfilled, (state, action) => {
      state.discoveryData = action.payload?.data;
      state.isDiscoveryLoading = false;
    });

    builder.addCase(getDiscoveryDataApi.rejected, (state, action) => {
      state.discoveryData = action.payload?.data;
      state.isDiscoveryLoading = false;
    });
    builder.addCase(getPrimeDataApi.fulfilled, (state, action) => {
      state.primeData = action?.payload?.data;
      state.isDiscoveryLoading =false;
    });
    builder.addCase(getTimesDataApi.fulfilled, (state, action) => {
      const { page } = action.meta.arg;
      const newArticles = action.payload.data;
      if (page === 1) {
        state.timesData = newArticles;
      } else {
        state.timesData = [...state.timesData, ...newArticles];
      }

      state.timesPagination = action?.payload?.pagination;
    });
    builder.addCase(getIpoDataApi.fulfilled, (state, action) => {
      state.ipoData = action.payload?.data;
    });
    builder.addCase(getPulseDataApi.fulfilled, (state, action) => {
      const { page } = action.meta.arg;
      const newArticles = action.payload.data;
      if (page === 1) {
        state.pulseData = newArticles;
      } else {
        state.pulseData = [...state.pulseData, ...newArticles];
      }

      state.pulsePagination = action?.payload?.pagination;
    });
    builder.addCase(textSearchDataApi.fulfilled, (state, action) => {
      state.textSearchData = action.payload?.data;
    });
  },
});

export const { resetSearchState } = searchSlice.actions;
export default searchSlice.reducer;
