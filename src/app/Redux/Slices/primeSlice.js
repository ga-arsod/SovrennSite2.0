
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  promoterFilter: [],
  primeFilter: [],
  isError: false,
  comments: [],
  primePagination: {},
  promoterPagination: {},
  isPrimeFilterOpen: false,
  isPromoterFilterOpen: false,
  primeCompaniesList: [],
  promoterCompaniesList: [],
  isPrimeCompanyListLoading: true,
  articleData: null,
  isPrimeArticleLoading: false,
  isPromoterArticleLoading: false,
  isPromoterCompanyListLoading: false,
  company_name: "",
  isCommentsDataLoading: false,
};

export const primeFilterApi = createAsyncThunk("primeFilterApi", async () => {
  const response = await fetch(`${url}/prime-research/filters`, {
    method: "GET",
  });
  return response.json();
});

export const primeCompaniesListApi = createAsyncThunk("primeCompaniesListApi", async ({ data, page, sort_by, sort_order }, { dispatch }) => {
  const response = await fetch(`${url}/prime-research/list?page=${page}&page_size=200&sort_by=${sort_by}&sort_order=${sort_order}`, {
    method: "POST",
    headers: {

      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });


  return response.json();
});

export const promoterCompaniesListApi = createAsyncThunk("promoterCompaniesListApi", async ({ data, page, sort_by, sort_order }, { dispatch }) => {
  const response = await fetch(`${url}/promoter-interviews/list?page=${page}&page_size=200&sort_by=${sort_by}&sort_order=${sort_order}`, {
    method: "POST",
    headers: {

      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
});

export const promoterFilterApi = createAsyncThunk("promoterFilterApi", async () => {
  const response = await fetch(`${url}/promoter-interviews/filters`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),

    },
  });
  return response.json();
});


export const primeArticleApi = createAsyncThunk(
  "primeArticleApi",
  async (slug, { dispatch }) => {
    const response = await fetch(`${url}/prime-research/data/${slug}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    return response.json();
  }
);

export const promoterArticleApi = createAsyncThunk(
  "promoterArticleApi",
  async (slug, { dispatch }) => {
    const response = await fetch(`${url}/promoter-interviews/${slug}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },

    });

    return response.json();
  }
);





const primeSlice = createSlice({
  name: 'prime',
  initialState,
  reducers: {
    togglePrimeFilter: (state) => {
      state.isPrimeFilterOpen = !state.isPrimeFilterOpen;
    },
    togglePromoterFilter: (state) => {
      state.isPromoterFilterOpen = !state.isPromoterFilterOpen;
    },


  },

  extraReducers: (builder) => {
    // Prime Filter Api
    builder.addCase(primeFilterApi.fulfilled, (state, action) => {

      state.primeFilter = action.payload.data;
    });
    builder.addCase(primeFilterApi.rejected, (state, action) => {

      state.isError = true;
    });
    // Promoter Filter Api
    builder.addCase(promoterFilterApi.fulfilled, (state, action) => {

      state.promoterFilter = action.payload.data;
    });
    builder.addCase(promoterFilterApi.rejected, (state, action) => {

      state.isError = true;
    });

    // Prime Companies List Api
    builder.addCase(primeCompaniesListApi.pending, (state, action) => {
      state.isPrimeCompanyListLoading = true;

    });
    builder.addCase(primeCompaniesListApi.fulfilled, (state, action) => {
      state.primePagination = action.payload.pagination
      state.primeCompaniesList = action.payload.list;
      state.isPrimeCompanyListLoading = false;
    });
    builder.addCase(primeCompaniesListApi.rejected, (state, action) => {

      state.isError = true;
      state.isPrimeCompanyListLoading = false;
    });
    // Prime Article Api
    builder.addCase(primeArticleApi.pending, (state, action) => {
      state.isPrimeArticleLoading = true;

    });
    builder.addCase(primeArticleApi.fulfilled, (state, action) => {

      state.articleData = action.payload.data;
      state.company_name = action.payload.data.company_Id.company_name
      state.isPrimeArticleLoading = false;
    });
    builder.addCase(primeArticleApi.rejected, (state, action) => {

      state.isError = true;
      state.isPrimeArticleLoading = false;
    });

    // Promoter Article Api
    builder.addCase(promoterArticleApi.pending, (state, action) => {
      state.isPromoterArticleLoading = true;

    });
    builder.addCase(promoterArticleApi.fulfilled, (state, action) => {

      state.articleData = action.payload.data;
      state.company_name = action.payload.data.company_Id.company_name
      state.isPromoterArticleLoading = false;
    });
    builder.addCase(promoterArticleApi.rejected, (state, action) => {

      state.isError = true;
      state.isPromoterArticleLoading = false;
    });

    // Promoter Companies List Api
    builder.addCase(promoterCompaniesListApi.pending, (state, action) => {
      state.isPromoterCompanyListLoading = true;

    });
    builder.addCase(promoterCompaniesListApi.fulfilled, (state, action) => {
      state.promoterPagination = action.payload.pagination
      state.promoterCompaniesList = action.payload.list;
      state.isPromoterCompanyListLoading = false;
    });
    builder.addCase(promoterCompaniesListApi.rejected, (state, action) => {

      state.isError = true;
      state.isPromoterCompanyListLoading = false;
    });



  }

});

export const { togglePrimeFilter, togglePromoterFilter } = primeSlice.actions;
export default primeSlice.reducer;