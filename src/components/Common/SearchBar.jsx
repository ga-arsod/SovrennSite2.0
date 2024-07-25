"use client"
import { Grid ,InputBase,Button} from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { colors } from '../Constants/colors';
import { lineHeight } from '../Constants/fontWeight';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid',
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
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  color:'#64748B',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#64748B',
  width: '100%',
  '& .MuiInputBase-input': {
    fontWeight:'400',
    fontSize:'10px',
    lineHeight:'12px',
    padding: theme.spacing(1, 1, 1, 0), // Default padding


    paddingLeft: `calc(1em + ${theme.spacing(3)})`, // Default padding-left for the search icon
    transition: theme.transitions.create('width'),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 3, 3, 0), // Padding for small screens and up
      paddingLeft: `calc(1em + ${theme.spacing(4.5)})`,
    
      '&:focus': {
        width: '350px',
      },
      
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1.4, 1.5, 1.4, 0), // Padding for medium screens and up
      paddingLeft: `calc(1em + ${theme.spacing(3.5)})`,
      width: '225px',
      '&:focus': {
        width: '225px',
      },
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
const SearchBar = ({placeholder}) => {
 
  return (
   <Grid container spacing={1} alignItems="center">
    <Grid item width={{xs:"215px",sm:"253px"}}>
    <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={placeholder}
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
