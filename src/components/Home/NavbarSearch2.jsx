import { Autocomplete, TextField, Box, Typography, Chip, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import styled from '@emotion/styled';
import ClearIcon from '@mui/icons-material/Clear';
import { colors } from "../Constants/colors";
import { getWeeklyTopSearchesApi } from "@/app/Redux/Slices/searchSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const companies = [
  { name: "KPI Green Energy Limited", tags: ["Discovery", "Prime", "Times", "IPO"] },
  { name: "KPT Industries Limited", tags: ["Discovery", "Prime", "Times", "IPO"] },
];

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
    padding: '4px 13px',
    "@media (max-width: 639px)": {
      padding: '2px 10px',
    },
    "& .MuiInputBase-input": {
      padding: '7px 8px',
      fontSize: '14px', 
      color: 'black',
      "&::placeholder": {
        fontSize: '11.5px', 
      },
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: 'none',
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: 'none',
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: 'none',
  },
}));

export default function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
 const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [modifiedOptions,setModifiedOptions]=useState([])
  const {weeklyTopSearches} = useSelector((store) => store.search);
 const dispatch= useDispatch();
  

  useEffect(()=>{
    dispatch(getWeeklyTopSearchesApi())
    if(weeklyTopSearches)
    {
      setModifiedOptions(
       [{ company_name: "Search Result", searchText: searchTerm ? `Search for "${searchTerm}"` : "Search for keyword", isCustom: true },
        ...weeklyTopSearches?.top_searches],
      )
    }
  },[weeklyTopSearches])

  return (
    <Box width={400} mx="auto" p={2}>
      <Autocomplete
       sx={{
        width: { xs: '80vw',sm:"80vw", md: '350px' },
        marginTop: { xs: 0, sm: 0,md:3 },
        marginLeft: { xs: 0, sm: 0 },
       
      }}
      disablePortal
      id="combo-box-demo"
      freeSolo
      disableClearable
     
        options={modifiedOptions}
        ListboxProps={{ style: { padding: 0, marginTop: 0 ,boxShadow:"0px 4px 8px 0px #0000001A"
        } }} 
        getOptionLabel={(option) => option.company_name}
        renderOption={(props, option) => (
          <Box 
          component="li" 
          {...props} 
          sx={{ 
            borderBottom: "1px solid #DEDDDD", 
            display: "flex", 
            justifyContent: "space-between",
          
           
          }}
        >
        
           {
            searchTerm !=="" ?  <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center", gap: 1 }}>
             
            <StyledTypography1 color={colors.neutral700} >
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
              <StyledTypography1 color={colors.themeGreen} sx={{ borderBottom: "1.px solid #06A77D" }}>
              Search for keyword
              </StyledTypography1>
            </Box>
          </Box>
         : <></>
           }
            <Box>
              <StyledTypography2 color={colors.navyBlue900} sx={{ marginTop:1}}>
                {option?.company_name}
              </StyledTypography2>
              <Box mt={1} display="flex" gap={1}>
                {option?.data_available?.map((tag, idx) => (
                  <Chip 
                    key={idx} 
                    label={tag?.status?.text} 
                    sx={{ 
                      backgroundColor:tag?.status?.background_colors[0],
                      
                      color:tag?.status?.text_color,
                      fontWeight: "400",
                      fontSize: "10px",
                      lineHeight: "12px",
                      letterSpacing:"0.02em",
                      padding: "5px 0px", 
                      height: "24px", 
                      minWidth: "auto", 
                      borderRadius: "10px", 
                      marginBottom:1
                    }} 
                  />
                ))}
              </Box>
            </Box>
       
        </Box>
        
        )}
        
        renderInput={(params) => (

           <CustomTextField
                        {...params}
                        placeholder="Search for a company"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: searchText ? (
                            <InputAdornment position="end">
                              <ClearIcon
                                onClick={handleClearSearch}
                                sx={{ cursor: 'pointer' }}
                              />
                            </InputAdornment>
                          ) : null,
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
          // <TextField
          //   {...params}
          //   fullWidth
          //   placeholder="Search"
          //   value={searchTerm}
          //   onChange={(e) => setSearchTerm(e.target.value)}
          //   InputProps={{
          //     ...params.InputProps,
          //     endAdornment: (
          //       <InputAdornment position="end">
          //         <IconButton>
          //           <SearchIcon color="success" />
          //         </IconButton>
          //       </InputAdornment>
          //     ),
          //   }}
          // />
        )}
      />
    </Box>
  );
}
