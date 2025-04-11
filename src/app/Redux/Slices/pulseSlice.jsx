
import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setSnackStatus } from './snackbarSlice';
const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  portfolioCompanies:[],
  isCompaniesLoading:false,
  isPortfolioUpdated:false,
  allCompanies:[],
  isPulseFilterOpen:false,
  pulseFilter:[],
  savedFilters:{},
  pulseArticleData:null,
  pulseArticlePaginationData:null,
  pagination: {
    page: 0,
    page_size: 0,
    total_documents: 0,
    total_pages: 0
}
};

export const getPortfolioCompanies = createAsyncThunk(
    "getPortfolioCompanies",
    async () => {
      const response = await fetch(`${url}/user/my-portfolio?platform=website`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          
        },
      });

      
  
      return response.json();
    }
  );

  export const searchAllCompanies = createAsyncThunk(
    "searchAllCompanies",
    async (q) => {
      const response = await fetch(`${url}/company/portfolio-search?q=${q}&platform=website`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          
        },
      });
      const data=await response.json();
      
  
      return data;
    }
  );

  export const updatePortfolioApi = createAsyncThunk(
    "updatePortfolioApi",
    async ({data,path,router},{dispatch}) => {
      const response = await fetch(`${url}/user/update-portfolio?platform=website`, {
        method: "PATCH",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            portfolio:data.map((elem)=>{return({company_id:elem._id})})
          }),
            
      });
   
      if(response.ok)
      {
         dispatch(
                setSnackStatus({
                  status: true,
                  severity: "success",
                  message: "Portfolio updated successfully!",
                })
              );
        dispatch(getPortfolioCompanies())
        if(path=="pulse")
        {
          router.push("/pulse")
        }
       
        
      }
      return response.json();
      
  
      
    }
  );
  export const pulseFilterApi = createAsyncThunk("pulseFilterApi", async () => {
    const response = await fetch(`${url}/corporate-updates/filters?platform=website`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
       
      },
    });
    return response.json();
  });

  export const pulseArticlesApi = createAsyncThunk("pulseArticlesApi", async ({page, pageSize},{dispatch}) => {
    const response = await fetch(`${url}/corporate-updates?page=${page || 1}&page_size=${pageSize || 20}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
         "Authorization": "Bearer " + localStorage.getItem("token")
    },
    });
   const data=await response.json();
  return data;
  });

  export const pulseFilteredArticlesApi = createAsyncThunk("pulseFilteredArticlesApi", async ({page, pageSize,filters},{dispatch}) => {
    const response = await fetch(`${url}/corporate-updates/filtered-data?page=${page || 1}&page_size=${pageSize || 20}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
         "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify(filters)
    });
    
   const data=await response.json();
  return data;
  });

const pulseSlice = createSlice({
  name: 'pulse',
  initialState,
  reducers: {
    setPulseFilters:(state, action)=> {
      state.savedFilters = action.payload;
    },
    clearPulseFilters: (state) => {
      state.savedFilters = {};  
    },
   
    togglePulseFilter: (state) => {
      state.isPulseFilterOpen = !state.isPulseFilterOpen;
    },
    clearAllCompanies : (state) => {
      state.allCompanies=[]
    }
  },
  extraReducers: (builder) => {
     // Pulse Filter Api
     builder.addCase(pulseFilterApi.fulfilled, (state, action) => {
      state.pulseFilter = action.payload.data;
    });
    builder.addCase(pulseFilterApi.rejected, (state, action) => {
      state.isError = true;
    });
     // GET Portfolio companies
     builder.addCase(getPortfolioCompanies.pending, (state, action) => {
        state.isCompaniesLoading = true;
      });
      builder.addCase(getPortfolioCompanies.fulfilled, (state, action) => {
        state.isCompaniesLoading = false;
        state.portfolioCompanies = action.payload?.data;
      });
      builder.addCase(getPortfolioCompanies.rejected, (state, action) => {
        state.isError = true;
        state.isCompaniesLoading= false;
      });

       // GET all companies
    
      builder.addCase(searchAllCompanies.fulfilled, (state, action) => {
        
        state.allCompanies = action.payload.data;
      });
      builder.addCase(searchAllCompanies.rejected, (state, action) => {
        state.isError = true;
       
      });

       // Update Portfolio companies
     builder.addCase(updatePortfolioApi.pending, (state, action) => {
        state.isCompaniesLoading = true;
      });
      builder.addCase(updatePortfolioApi.fulfilled, (state, action) => {
        state.isCompaniesLoading = false;
        state.portfolioCompanies = action.payload.data;
      });
      builder.addCase(updatePortfolioApi.rejected, (state, action) => {
        state.isError = true;
        state.isCompaniesLoading= false;
      });
      // pulse article api
      builder.addCase(pulseArticlesApi.pending, (state, action) => {
        state.isCompaniesLoading = true;
      });
      builder.addCase(pulseArticlesApi.fulfilled, (state, action) => {
        const { page } = action.meta.arg;
        const newArticles = action.payload.data;
        if (page === 1) {
          
          state.pulseArticleData = newArticles;
        } else {
         
          state.pulseArticleData = [...state.pulseArticleData, ...newArticles];
        }
        state.pagination = action.payload.pagination;
        state.isCompaniesLoading = false;
      });
      builder.addCase(pulseArticlesApi.rejected, (state) => {
        state.isError = true;
      });
       // pulse Filtered article api
       builder.addCase(pulseFilteredArticlesApi.pending, (state, action) => {
        state.isCompaniesLoading = true;
      });
      builder.addCase(pulseFilteredArticlesApi.fulfilled, (state, action) => {
        const { page } = action.meta.arg;
        const newArticles = action.payload.data;
        if (page === 1) {
         
          state.pulseArticleData = newArticles;
        } else {
          
          state.pulseArticleData = [...state.pulseArticleData, ...newArticles];
        }
        state.pagination = action.payload.pagination;
        state.isCompaniesLoading = false;
        state.isPulseFilterOpen=false;
      });
      builder.addCase(pulseFilteredArticlesApi.rejected, (state) => {
        state.isError = true;
      });
    
   
  }
});

export const {clearAllCompanies,togglePulseFilter,setPulseFilters,clearPulseFilters } = pulseSlice.actions;
export default pulseSlice.reducer;