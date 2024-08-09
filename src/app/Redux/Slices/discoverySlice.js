import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setSnackStatus } from "./snackbarSlice";
const url = "https://api.sovrenn.com";
const initialState = {
  buckets: [],
  isAllBucketsLoading: false,
  isMyBucketsLoading: false,
  isTableDataLoading: false,
  isArticleDataLoading: false,
  isError: false,
  myBuckets: [],
  discoveryTableBucket: [],
  title: "",
  filtersData: null,
  articleData: {
    date: "",
    content: [],
    title: "",
    market_cap: "",
    ttm_pe: "",
    share_price: "",
    sector: "",
    sectoral_pe_range: "",
    pe_remark: ""
  },
};

export const bucketsApiCall = createAsyncThunk(
  "bucketsApiCallData",
  async () => {
    const response = await fetch(`${url}/buckets/list`, {
      method: "GET",
    });
    return response.json();
  }
);

export const myBucketsApiCall = createAsyncThunk(
  "myBucketsApiCallData",
  async () => {
    const response = await fetch(`${url}/my-buckets/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.json();
  }
);

export const discoveryFiltersApiCall = createAsyncThunk(
  "discoveryFiltersApiCall",
  async () => {
    const response = await fetch(`${url}/buckets/filters`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.json();
  }
);

export const deleteCustomBucketApi = createAsyncThunk(
  "deleteCustomBucketApi",
  async (id, { dispatch }) => {
    const response = await fetch(`${url}/my-buckets/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const result = await response.json();

    if (response.ok) {
      dispatch(myBucketsApiCall());
      dispatch(
        setSnackStatus({
          status: true,
          severity: "error",
          message: result.message,
        })
      );
    }

    return result;
  }
);

export const createCustomBucketApi = createAsyncThunk(
  "customBucketApi",
  async (data, { dispatch }) => {
    const response = await fetch(`${url}/my-buckets/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      dispatch(myBucketsApiCall());
      dispatch(
        setSnackStatus({
          status: true,
          severity: "success",
          message: result.message,
        })
      );
    }

    return result;
  }
);

export const discoveryTableApi = createAsyncThunk(
  "discoveryTableApi",
  async ({ id, body }) => {
    const response = await fetch(`${url}/buckets/companies/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response.json();
  }
);

export const discoveryArticleApi = createAsyncThunk(
  "discoveryArticleApi",
  async (slug, { dispatch }) => {
    const response = await fetch(`${url}/company/discovery-data/${slug}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
     
    });

    return response.json();
  }
);

const discoverySlice = createSlice({
  name: "discovery",
  initialState,
  reducers: {
    changeModalState: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(bucketsApiCall.pending, (state, action) => {
      state.isAllBucketsLoading = true;
    });
    builder.addCase(bucketsApiCall.fulfilled, (state, action) => {
      state.isAllBucketsLoading = false;
      state.buckets = action.payload.data;
    });
    builder.addCase(bucketsApiCall.rejected, (state, action) => {
      state.isError = true;
      state.isAllBucketsLoading = false;
    });

    // POST request for bucket
    builder.addCase(createCustomBucketApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCustomBucketApi.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createCustomBucketApi.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    });

    // GET request for My buckets
    builder.addCase(myBucketsApiCall.pending, (state, action) => {
      state.isMyBucketsLoading = true;
    });
    builder.addCase(myBucketsApiCall.fulfilled, (state, action) => {
      state.isMyBucketsLoading = false;
      state.myBuckets = action.payload.buckets;
    });
    builder.addCase(myBucketsApiCall.rejected, (state, action) => {
      state.isError = true;
      state.isMyBucketsLoading = false;
    });
    // Delete custom buckets
    builder.addCase(deleteCustomBucketApi.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCustomBucketApi.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteCustomBucketApi.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });

    // Get Discovery Table Data Api
    builder.addCase(discoveryTableApi.pending, (state, action) => {
      state.isTableDataLoading = true;
    });
    builder.addCase(discoveryTableApi.fulfilled, (state, action) => {
      state.isTableDataLoading = false;
      state.discoveryTableBucket = action.payload.data.companies;
      state.title = action.payload.data.bucket.title;
    });
    builder.addCase(discoveryTableApi.rejected, (state, action) => {
      state.isError = true;
      state.isTableDataLoading = false;
    });
    // Get Discovery Filters Data Api
    builder.addCase(discoveryFiltersApiCall.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(discoveryFiltersApiCall.fulfilled, (state, action) => {
      state.isLoading = false;
      state.filtersData = action.payload.data;
    });
    builder.addCase(discoveryFiltersApiCall.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    // Get Discovery Article Data Api
    builder.addCase(discoveryArticleApi.pending, (state, action) => {
      state.isArticleDataLoading = true;
    });
    builder.addCase(discoveryArticleApi.fulfilled, (state, action) => {
      state.isArticleDataLoading = false;
      state.articleData = {
        ...state.articleData,
        date: "",
        content: action.payload.data.discovery.content,
        title: action.payload.data.discovery.title,
        market_cap:  action.payload.data.discovery.market_cap,
        ttm_pe:  action.payload.data.discovery.ttm_pe,
        share_price:  action.payload.data.discovery.share_price,
        sector:action.payload.data.discovery.sector,
        sectoral_pe_range: action.payload.data.discovery.sectoral_pe_range,
        pe_remark: action.payload.data.discovery.pe_remark
      };
    });
    builder.addCase(discoveryArticleApi.rejected, (state, action) => {
      state.isError = true;
      state.isArticleDataLoading = false;
    });
  },
});
export const { changeModalState } = discoverySlice.actions;
export default discoverySlice.reducer;
