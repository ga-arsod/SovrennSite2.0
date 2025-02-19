import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  ipoFilter: [],
  isError: false,
  isIpoFilterOpen: false,
  pagination:{},
  ipoCompaniesList: [],

  isIpoCompaniesListLoading: false,
  ipoArticle: null,

  isIpoArticleLoading: false,

  company_name: "",
};

export const ipoFilterApi = createAsyncThunk("ipoFilterApi", async () => {
  const response = await fetch(`${url}/ipo/filters?platform=website`, {
    method: "GET",
  });
  return response.json();
});

export const ipoCompaniesListApi = createAsyncThunk(
  "ipoCompaniesListApi",
  async ({page,data}, { dispatch }) => {
    const response = await fetch(`${url}/ipo/list?page=${page}&page_size=200`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

   
    return response.json();
  }
);

export const ipoArticleApi = createAsyncThunk(
  "ipoArticleApi",
  async (slug, { dispatch }) => {
    const response = await fetch(`${url}/ipo/blocks/${slug}?platform=website`, {
      method: "GET",
    });

    return response.json();
  }
);

const ipoSlice = createSlice({
  name: "ipo",
  initialState,
  reducers: {
    toggleIpoFilter: (state) => {
      state.isIpoFilterOpen = !state.isIpoFilterOpen;
    },
  },

  extraReducers: (builder) => {
    // IPO Filter Api
    builder.addCase(ipoFilterApi.fulfilled, (state, action) => {
      state.ipoFilter = action.payload.data;
    });
    builder.addCase(ipoFilterApi.rejected, (state, action) => {
      state.isError = true;
    });

    // IPO Companies List Api
    builder.addCase(ipoCompaniesListApi.pending, (state, action) => {
      
      if (Object.keys(action.meta.arg).length !== 0) {
        state.isIpoCompaniesListLoading = false;
      }
      else
      state.isIpoCompaniesListLoading = true;
    });
    builder.addCase(ipoCompaniesListApi.fulfilled, (state, action) => {
      state.ipoCompaniesList = action.payload.list;
      state.isIpoCompaniesListLoading = false;
      state.pagination=action.payload.pagination;
      
    });
    builder.addCase(ipoCompaniesListApi.rejected, (state, action) => {
      state.isError = true;
      state.isIpoCompaniesListLoading = false;
    });
    // IPO Article Api
    builder.addCase(ipoArticleApi.pending, (state, action) => {
      state.isIpoArticleLoading = true;
    });
    builder.addCase(ipoArticleApi.fulfilled, (state, action) => {
      state.ipoArticle = action.payload.data;
      //    state.company_name=action.payload.data.company_Id.company_name
      state.isIpoArticleLoading = false;
    });
    builder.addCase(ipoArticleApi.rejected, (state, action) => {
      state.isError = true;
      state.isIpoArticleLoading = false;
    });
  },
});

export const { toggleIpoFilter } = ipoSlice.actions;
export default ipoSlice.reducer;
