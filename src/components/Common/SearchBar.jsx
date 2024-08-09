"use client"
import { Grid, Button, TextField, Autocomplete, InputAdornment } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { colors } from '../Constants/colors';

const StyledButton = styled(Button)`
  color: ${colors.white};
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  border-radius: 4px;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 18px;
  padding-right: 18px;
  text-transform: none;
  @media (max-width: 639px) {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 16px;
    padding-right: 16px;
  }
  background-color: ${colors.navyBlue500};
  &:hover {
    background-color: #20365B;
    color: white;
    border-color: #20365B;
    outline: #20365B;
  }
`;

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    padding: '8px 16px',
    "@media (max-width: 639px)": {
      padding: "5px 16px",  
    },
  },
  '& .MuiInputBase-input': {
    padding: '2px 12px', 
    fontSize: '12px', 
    color: 'black',
   
   
    '&::placeholder': {
      fontSize: '12px',
    },
  },
}));

const options = ['Option 1', 'Option 2', 'Option 3']; 

const SearchBar = ({ placeholder }) => {
  return (
    <Grid container spacing={1} width='auto' >
      <Grid item>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          sx={{ width: {xs:"210px",sm:'280px'} }}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              placeholder={placeholder}
              InputProps={{
                ...params.InputProps,
                endAdornment: null,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Grid>
      <Grid item>
        <StyledButton variant='contained'>
          Search
        </StyledButton>
      </Grid>
    </Grid>
  );
};

export default SearchBar;