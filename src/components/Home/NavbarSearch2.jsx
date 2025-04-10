import { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Box,
  Chip,
  ListSubheader,
  Typography,InputAdornment,IconButton,useMediaQuery
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import {
  getWeeklyTopSearchesApi,
  getCompanySuggestionsApi,
  deleteRecentSearchApi,
  textSearchDataApi,
} from "@/app/Redux/Slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

const StyledTypography3 = styled(Typography)`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
`;

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "4px 13px",
    "@media (max-width: 639px)": {
      padding: "2px 10px",
    },
    "& .MuiInputBase-input": {
      padding: "7px 8px",
      fontSize: "14px",
      color: "black",
      "&::placeholder": {
        fontSize: "11.5px",
      },
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

const NavbarSearch2 = ({handleSearchClick}) => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [topSearches, setTopSearches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { weeklyTopSearches, suggestedCompanies } = useSelector(
    (store) => store.search
  );
   const isXsScreen = useMediaQuery('(max-width:1040px)'); 
  const { isAuth } = useSelector((store) => store.auth);

  const handleOptionChange = (event, option) => {
    router.push(`/company?q=${option._id}`);
  };

  const handleRemoveRecent = (companyId) => {
    setRecentSearches((prev) => prev.filter((item) => item._id !== companyId));
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };
  
  const handleBackClick = () => {
    setSearchTerm('');
    handleSearchClick();
   
  };
  useEffect(() => {
    if(searchTerm=='')
    dispatch(getWeeklyTopSearchesApi());
  }, [isAuth,searchTerm]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm !== "") {
        dispatch(getCompanySuggestionsApi(searchTerm));
      }
    }, 300); 
  
    
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  useEffect(() => {
    if (
      !Array.isArray(weeklyTopSearches) &&
      weeklyTopSearches?.recent_searches
    ) {
      setRecentSearches([...weeklyTopSearches.recent_searches]);
    }
  }, [weeklyTopSearches?.recent_searches]);

  useEffect(() => {
    if (!Array.isArray(weeklyTopSearches) && searchTerm === "") {
      setTopSearches([...weeklyTopSearches?.top_searches]);
    }
  }, [weeklyTopSearches?.top_searches, searchTerm]);

  useEffect(() => {
    if (searchTerm !== "") {
      setTopSearches([...suggestedCompanies]);
    }
  }, [searchTerm, suggestedCompanies]);

  const dummySearchOption =
    searchTerm !== "" ? [{ isSearchResult: true, keyword: searchTerm }] : [];

  const allOptions =
    searchTerm !== ""
      ? [...dummySearchOption, ...topSearches]
      : [
          ...recentSearches,
          ...topSearches.filter(
            (top) => !recentSearches.some((recent) => recent._id === top._id)
          ),
        ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        {isXsScreen && (
          <IconButton onClick={handleBackClick} sx={{ mr: 1 }}>
            <ArrowBackIcon sx={{color:"black"}} />
          </IconButton>
        )}
    <Autocomplete
      sx={{
        width: { xs: "80vw", sm: "80vw", md: "350px" },
        marginTop: { xs: 0, sm: 0, md: 3 },
        marginLeft: { xs: 0, sm: 0 },
      }}
      disablePortal
      id="combo-box-demo"
      freeSolo
      disableClearable
      inputValue={searchTerm}
      ListboxProps={{
        style: {
          padding: 0,
          marginTop: 0,
          boxShadow: "0px 4px 8px 0px #0000001A",
        },
      }}
      options={allOptions}
      onChange={handleOptionChange}
      groupBy={(option) =>
        option.isSearchResult
          ? null
          : recentSearches.find((item) => item._id === option._id)
          ? "Recently Searched" :
         searchTerm=="" ? "This Week’s Top Searches on Sovrenn" : ""
      }
      getOptionLabel={(option) =>
        option.isSearchResult ? option.keyword : option.company_name
      }
      renderInput={(params) => (
        <CustomTextField
          {...params}
          placeholder="Search for a company"
          InputProps={{
                          ...params.InputProps,
                          endAdornment: searchTerm ? (
                            <InputAdornment position="end">
                              <ClearIcon
                                onClick={handleClearSearch}
                                sx={{ cursor: 'pointer',fontSize:"17px" }}
                              />
                            </InputAdornment>
                          ) : null,
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
          variant="outlined"
          fullWidth
        
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      renderOption={(props, option) => {
        const isRecentSearch = recentSearches.find(
          (item) => item._id === option._id
        );

        if (option.isSearchResult) {
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                gap: 1,
                p: 1,
              }}
            >
              <StyledTypography1 color={colors.neutral700}>
                Search Result
              </StyledTypography1>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: colors.themeGreen,
                  gap: 0.5,
                }}
              >
                <SearchIcon sx={{ fontSize: 24 }} />
                <StyledTypography1
                  color={colors.themeGreen}
                  sx={{
                    borderBottom: "1.4px solid #06A77D",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    router.push(`/text-search?q=${searchTerm}`);
                    dispatch(textSearchDataApi(searchTerm));
                  }}
                >
                  Search for Keyword
                </StyledTypography1>
              </Box>
            </Box>
          );
        }

        return (
          <Box
            component="li"
            key={option._id}
            {...props}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "8px 16px",
              borderBottom: "1px solid #DEDDDD",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <StyledTypography2
                color={colors.navyBlue900}
                sx={{ marginTop: 1 }}
                onClick={() => handleOptionChange(null, option)}
              >
                {option?.company_name}
              </StyledTypography2>
              {recentSearches.find((item) => item._id === option._id) ? null : (
                <Box mt={1} display="flex" gap={1}>
                  {option?.data_available?.map((tag, idx) => (
                    <Chip
                      key={idx}
                      label={tag?.status?.text}
                      sx={{
                        backgroundColor: tag?.status?.background_colors[0],
                        color: tag?.status?.text_color,
                        fontWeight: "400",
                        fontSize: "10px",
                        lineHeight: "12px",
                        letterSpacing: "0.02em",
                        padding: "5px 0px",
                        height: "24px",
                        minWidth: "auto",
                        borderRadius: "10px",
                        marginBottom: 1,
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>

            {/* Show ClearIcon if in recent searches */}
            {recentSearches.find((item) => item._id === option._id) && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  minWidth: "fit-content",
                  ml: 2,
                }}
              >
                <ClearIcon
                  sx={{
                    cursor: "pointer",
                    color: "#aaa",
                    "&:hover": { color: "#555" },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveRecent(option._id);
                    dispatch(deleteRecentSearchApi(option._id));
                  }}
                />
              </Box>
            )}
          </Box>
        );
      }}
      renderGroup={(params) => (
        <Box key={params.key}>
          <ListSubheader
            sx={{
              fontSize: "12px",
              fontWeight: "bold",
              bgcolor: "#F9F9F9",
            }}
          >
            {params.group}
          </ListSubheader>
          {params.children}
        </Box>
      )}
    />
    </div>
  );
};

export default NavbarSearch2;
