import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  InputAdornment,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@mui/material';

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: '4px 13px',
    "@media (max-width: 639px)": {
      padding: '2px 10px',
    },
    "& .MuiInputBase-input": {
      padding: '10px 8px',
      fontSize: '16px', 
      color: 'black',
      "&::placeholder": {
        fontSize: '12px', 
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


const NavbarSearch = ({ handleSearchClick }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const isXsScreen = useMediaQuery('(max-width:1040px)'); 

  const getSearchResults = async () => {
    const res = await fetch(
      `https://api.sovrenn.com/company/search?q=${searchText}`
    );
    const data = await res.json();

    if (res.ok) {
      setSearchResults([
        ...data.data,
        {
          _id: searchText,
          company_name: `Search for: ${searchText}`,
          industry: '',
          sector: '',
        },
      ]);
    } 
  };

  useEffect(() => {
    if (searchText.length === 0) {
      setSearchResults([]);
    } else {
      const debounce = setTimeout(() => {
        getSearchResults();
      }, 300);

      return () => clearTimeout(debounce);
    }
  }, [searchText]);

  const handleOptionChange = (event, option) => {
    if (option.company_name.includes('Search for:')) {
      router.push(`/text-search?q=${option._id}`);
    } else if (option?.is_company_covered) {
      router.push(`/company?q=${option._id}`);
    } else {
      router.push(`/company/result?q=${option.company_name}`);
    }
  };

  const handleClearSearch = () => {
    setSearchText('');
    setSearchResults([]);
    handleSearchClick();
  };

  const handleBackClick = () => {
    setSearchText('');
    setSearchResults([]);
    handleSearchClick();
   
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        {isXsScreen && (
          <IconButton onClick={handleBackClick} sx={{ mr: 1 }}>
            <ArrowBackIcon sx={{color:"black"}} />
          </IconButton>
        )}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          freeSolo
          disableClearable
          inputValue={searchText}
          onInputChange={(event, newInputValue) => {
            setSearchText(newInputValue);
          }}
          options={searchResults}
          getOptionLabel={(option) => option.company_name || ''}
          renderOption={(props, option) => (
            <li {...props}>{option.company_name}</li>
          )}
          filterOptions={() => searchResults}
          sx={{
            width: { xs: '80vw',sm:"80vw", md: '350px' },
            marginTop: { xs: 0, sm: 0,md:3 },
            marginLeft: { xs: 0, sm: 0 },
          }}
          onChange={handleOptionChange}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              placeholder="Search for a company"
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
          )}
        />
      </div>
    </>
  );
};

export default NavbarSearch;
