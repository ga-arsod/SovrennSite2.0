"use client"
import { Grid ,InputBase,Button} from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { colors } from '../Constants/colors';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '2px solid',
  borderColor:colors.navyBlue200,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  color:'#64748B',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '17vw',
      '&:focus': {
        width: '17vw',
      },
    },
    '&::placeholder': { 
      color: '#64748B',
      opacity:1,
    },
  },
  
}));

const StyledButton=styled(Button)`

color:${colors.white};
font-weight:600;
font-size:16px;
line-height:19px;
border-radius:4px;
padding-top:12px;
padding-bottom:12px;
padding-left:18px;
padding-left:18px;
text-transform:none;
@media (max-width: 639px) {
  font-weight:600;
  font-size:14px;
  line-height:17px;
 
  padding-top:8px;
  padding-bottom:8px;
  padding-left:16px;
padding-left:16px;
 
}
background-color:${colors.navyBlue500};
:hover {
  background-color: #20365B;
  color: white;
  border-color:  #20365B;
  outline: #20365B;
}

`;
const SearchBar = () => {
 
  return (
   <Grid container spacing={1} alignItems="center">
    <Grid item>
    <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for a bucket"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

    </Grid>
<Grid item>
<StyledButton variant='contained' backgroundColor="#20365B">
Search
</StyledButton>
</Grid>
   </Grid>
  )
}

export default SearchBar;
