"use client";
import styled from "@emotion/styled";
import { Grid, Typography, Box, Button,Container } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { colors } from "../Constants/colors";
import SearchBar from "../Common/SearchBar";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Filters from "../Common/Filters"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import IpoFilters from "../Common/IpoFilters"
import { useSelector } from "react-redux";
import { toggleIpoFilter } from "@/app/Redux/Slices/ipoSlice";
import { useDispatch } from "react-redux";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  letter-spacing: -0.04em;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 19px;
  line-height: 23px;
  letter-spacing: 0.02em;
  @media (max-width: 639px) {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0.02em;
  }
`;


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
      & .MuiSvgIcon-root {
      color: white; 
    }
  }
`;
const StyledFilterIcon = styled(FilterAltOutlinedIcon)`
  && {
    font-size: 16px;
    color: ${colors.navyBlue500};
  }
`;

const IpoHeader = () => {
 const dispatch=useDispatch();
  const theme = useTheme();
  const [isOpen,setIsOpen]=useState(false);

  const toggleDrawer = () => {
   dispatch(toggleIpoFilter())
  }
  const { isIpoFilterOpen, } = useSelector(
    (store) => store.ipo
  );

  const handleModalOpen=()=>{
    setIsOpen(true)
  }

  return (
    <>
     <Container>
      <Box sx={{ marginTop: "54px" }} marginBottom={{ xs: 3, sm: "28px" }}>
        <Grid container alignItems="center">
          <Grid item paddingY={{ xs: 2, sm: 5 }}>
            <Box marginBottom={1}>
            <Box display="flex" alignItems="center">
                <Box display={{ xs: 'block', sm: 'block', md: 'none' }} marginRight={1}>
                  <ArrowBackIcon sx={{fontSize:{xs:'14px',sm:'24px'}}} />
                </Box>
                <StyledTypography1
                  color={colors.navyBlue500}
                  marginRight={1}
                  component="span"
                >
                IPO
                </StyledTypography1>
                <StyledTypography1
                  color={theme.palette.primary.main}
                  component="span"
                >
                 Zone
                </StyledTypography1>
              </Box>
            </Box>
            <StyledTypography2 color={colors.navyBlue400}>
            We are bringing to you IPO stock articles to make you better equipped with information before making investment decisions.
            </StyledTypography2>
          </Grid>
        </Grid>
        <Grid container>
        
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <StyledButton
            variant="outlined"
            endIcon={<StyledFilterIcon />}
            size="small"
            onClick={toggleDrawer}
          >
            Filter
          </StyledButton>
        </Grid>
      </Grid>
      </Box>
     
      </Container>
      <IpoFilters isOpen={isIpoFilterOpen} handleModalOpen={handleModalOpen}/>
      
    </>
  );
};

export default IpoHeader;
