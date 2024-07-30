"use client"
import { Button, FormControl, MenuItem, Select, Typography,Container } from '@mui/material';
import { useState } from 'react';
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; 
import styled from "@emotion/styled";
import { colors } from '../Constants/colors';
import Filters from "../Common/Filters"

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.navyBlue500};
  padding: 8px 16px;
  text-transform: none;
  border-color: ${colors.navyBlue500};
  &:hover {
    background-color: ${colors.navyBlue200};
    color: white;
    border-color: ${colors.navyBlue200};
  }
`;

const StyledInputLabel = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: black;
  margin-right: 8px; /* Space between label and select */
`;

const StyledSelect = styled(Select)`
  width: 130px;
  & .MuiInputBase-root {
    padding: 6px 12px; 
    font-size: 16px;
    color: ${colors.navyBlue200};
    border-radius: 8px;
  }

  & .MuiSelect-select {
    padding: 10px 12px; 
    display: flex;
    align-items: center;
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${colors.navyBlue200};
  }
`;

const IpoFilters = () => {
  const [sort, setSort] = useState('Latest');
  const [isOpen, setIsOpen] = useState(false);
 

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Container>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
      <StyledButton  onClick={toggleDrawer(true)} variant="outlined" startIcon={<FilterAltOutlinedIcon />}>
        Filter
      </StyledButton>
      <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto' }}>
        <StyledInputLabel>
          {`Sort by:`}
        </StyledInputLabel>
        <StyledSelect
          value={sort}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Sort by' }}
          IconComponent={ExpandMoreIcon} // Set custom icon
        >
          <MenuItem value="Latest" defaultValue={true}>Latest</MenuItem>
          <MenuItem value="Oldest">Oldest</MenuItem>
        </StyledSelect>
      </FormControl>
    </div>
    <Filters isOpen={isOpen} setIsOpen={setIsOpen}/>
    </Container>
  );
};

export default IpoFilters;