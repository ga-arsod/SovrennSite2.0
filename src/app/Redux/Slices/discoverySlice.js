import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWatchlistApi } from "./watchlistSlice";
import { setSnackStatus } from "./snackbarSlice";
const url = "https://api.sovrenn.com";
const initialState = {
  buckets: [],
  isAllBucketsLoading: false,
  isMyBucketsLoading: false,
  isTableDataLoading: false,
  isNestedBucketTableDataLoading:false,
  pagination:{},
  isArticleDataLoading: false,
  isParentsBucketLoading:false,
  isCreateBucketModalOpen:false,
  customBucketData:null,
 commonCompanyList:[],
  isError: false,
  myBuckets: [],
  parentsBucket:[],
  isBookmarked: false,
 
  otherBucketsCompanyPresent: [],
  discoveryTableBucket: [],
  nestedBucketDiscoveryTableBucket:[],
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
    pe_remark: "",
    company_id: "",
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

export const commonCompanyListApi = createAsyncThunk(
  "commonCompanyListApi",
  async (companyArray) => {
    const response = await fetch(`${url}/buckets/buckets-names`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          selected_buckets:companyArray
        }
      ),
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
  "createCustomBucketApi",
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
    else{
      dispatch(resetBucketModal())
     
    }

   

    return result;
  }
);

export const discoveryTableApi = createAsyncThunk(
  "discoveryTableApi",
  async ({ id, body, page,sort_by,sort_order }) => {
    const response = await fetch(
      `${url}/buckets/companies/${id}?page=${page}&page_size=200&sort_by=${sort_by}&sort_order=${sort_order}&platform=website`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    return response.json();
  }
);

export const nestedBucketDiscoveryTableApi = createAsyncThunk(
  "nestedBucketDiscoveryTableApi",
  async ({ id, body, page }) => {
    const response = await fetch(
      `${url}/child-buckets/companies/${id}?page=${page}&page_size=200&sort_by=company_name&sort_order=inc&platform=website`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    return response.json();
  }
);

export const myBucketDiscoveryTableApi = createAsyncThunk(
  "myBucketDiscoveryTableApi",
  async ({ id, body, page,sort_by,sort_order }) => {
    const response = await fetch(
      `${url}/my-buckets/companies/${id}?page=${page}&page_size=200&sort_by=${sort_by}&sort_order=${sort_order}&platform=website`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    return response.json();
  }
);

export const otherBucketsCompanyPresentApi = createAsyncThunk(
  "otherBucketsCompanyPresentApi",
  async ({ company_id }) => {
    const response = await fetch(`${url}/buckets/present/${company_id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
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

export const isBookmarkedApi = createAsyncThunk(
  "isBookmarkedApi",
  async ({ company_id }) => {
    const response = await fetch(
      `${url}/user/available-in-watchlist/${company_id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );

    return response.json();
  }
);

export const addToWatchlistApi = createAsyncThunk(
  "addToWatchlistApi",
  async ({company_id,uptrend_potential,expected_price_after_1year}, { dispatch }) => {
    const response = await fetch(`${url}/user/add-to-watchlist`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_id: company_id,
        uptrend_potential: uptrend_potential,
        expected_price_after_1year: expected_price_after_1year,
      }),
    });
    const result = await response.json();

    if (response.ok) {
      dispatch(
        setSnackStatus({
          status: true,
          severity: "success",
          message: "The company added to your watchlist successfully!",
        })
      );
    }
    else{
      dispatch(
        setSnackStatus({
          status: true,
          severity: "warning",
          message: result.message,
        })
      );
    }

    return result;
  }
);

export const removeFromWatchlistApi = createAsyncThunk(
  "removeFromWatchlistApi",
  async (company_id, { dispatch }) => {
    const response = await fetch(
      `${url}/user/remove-from-watchlist/${company_id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    if (response.ok) {
      dispatch(getWatchlistApi())
      dispatch(
        setSnackStatus({
          status: true,
          severity: "warning",
          message: "The company removed from your watchlist successfully!",
        })
      );
    }

    return result;
  }
);




    
    export const getParentsBucketApi = createAsyncThunk(
      "getParentsBucketApi",
      async ({title}) => {
        const response = await fetch(
          `${url}/parent-buckets/${title}`,
          {
            method: "GET",
            headers: {
              
              "Content-Type": "application/json",
            },
           
          }
        );
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
    resetBucketModal: (state) => {
      state.isCreateBucketModalOpen = false;
      state.customBucketData = "";
      
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
     
      state.customBucketData=action.payload
     
    });
    builder.addCase(createCustomBucketApi.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
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
    //Common Company List Api
    
    builder.addCase(commonCompanyListApi.fulfilled, (state, action) => {
      
      state.commonCompanyList = action.payload.data;
    });
    builder.addCase(commonCompanyListApi.rejected, (state, action) => {
      state.isError = true;
      
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
      state.discoveryTableBucket = action.payload.data;
      state.title = action.payload.data.bucket.title;
      state.pagination=action.payload.pagination
    });
    builder.addCase(discoveryTableApi.rejected, (state, action) => {
      state.isError = true;
      state.isTableDataLoading = false;
    });

    // Get nested bucket Discovery Table Data Api
    builder.addCase(nestedBucketDiscoveryTableApi.pending, (state, action) => {
      state.isNestedBucketTableDataLoading = true;
    });
    builder.addCase(nestedBucketDiscoveryTableApi.fulfilled, (state, action) => {
      state.isNestedBucketTableDataLoading = false;
      state.nestedBucketDiscoveryTableBucket = action.payload.data;
      state.title = action.payload.data.bucket.title;
      state.pagination=action.payload.pagination
    });
    builder.addCase(nestedBucketDiscoveryTableApi.rejected, (state, action) => {
      state.isError = true;
      state.isNestedBucketTableDataLoading = false;
    });
    // Get Discovery My Bucket Table Data Api
    builder.addCase(myBucketDiscoveryTableApi.pending, (state, action) => {
      state.isTableDataLoading = true;
    });
    builder.addCase(myBucketDiscoveryTableApi.fulfilled, (state, action) => {
      state.isTableDataLoading = false;
      state.discoveryTableBucket = action.payload.data;
      state.pagination=action.payload.pagination
      // state.title = action.payload.data.bucket.title;
    });
    builder.addCase(myBucketDiscoveryTableApi.rejected, (state, action) => {
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
    // Get Parents Bucket Api
    builder.addCase(getParentsBucketApi.pending, (state, action) => {
      state.isParentsBucketLoading = true;
    });
    builder.addCase(getParentsBucketApi.fulfilled, (state, action) => {
      state.isParentsBucketLoading = false;
      state.parentsBucket = action.payload.buckets;
    });
    builder.addCase(getParentsBucketApi.rejected, (state, action) => {
      state.isError = true;
      state.isParentsBucketLoading = false;
    });
    // Company Present in other buckets Api
    builder.addCase(otherBucketsCompanyPresentApi.pending, (state, action) => {
      state.isArticleDataLoading = true;
    });
    builder.addCase(
      otherBucketsCompanyPresentApi.fulfilled,
      (state, action) => {
        state.isArticleDataLoading = false;
        state.otherBucketsCompanyPresent = action.payload.buckets;
      }
    );
    builder.addCase(otherBucketsCompanyPresentApi.rejected, (state, action) => {
      state.isError = true;
      state.isArticleDataLoading = false;
    });
    // Get bookmark Api

    builder.addCase(isBookmarkedApi.fulfilled, (state, action) => {
      state.isBookmarked = action.payload.isAvailable;
    });
    builder.addCase(isBookmarkedApi.rejected, (state, action) => {
      state.isError = true;
    });
    
    // Add to watchlist Api

    builder.addCase(addToWatchlistApi.fulfilled, (state, action) => {
      state.isBookmarked = true;
    });
    builder.addCase(addToWatchlistApi.rejected, (state, action) => {
      state.isError = true;
    });

    // Remove from watchlist Api

    builder.addCase(removeFromWatchlistApi.fulfilled, (state, action) => {
      state.isBookmarked = false;
    });
    builder.addCase(removeFromWatchlistApi.rejected, (state, action) => {
      state.isError = true;
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
        market_cap: action.payload.data.discovery.market_cap,
        ttm_pe: action.payload.data.discovery.ttm_pe,
        share_price: action.payload.data.discovery.share_price,
        sector: action.payload.data.discovery.sector,
        sectoral_pe_range: action.payload.data.discovery.sectoral_pe_range,
        pe_remark: action.payload.data.discovery.pe_remark,
        company_id: action.payload.data.discovery._id,
      };
    });
    builder.addCase(discoveryArticleApi.rejected, (state, action) => {
      state.isError = true;
      state.isArticleDataLoading = false;
    });
  },
});
export const { changeModalState ,resetBucketModal} = discoverySlice.actions;
export default discoverySlice.reducer;
