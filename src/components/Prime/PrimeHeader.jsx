"use client";
import styled from "@emotion/styled";
import { Grid, Typography, Box, Button } from "@mui/material";
import React,{useState} from "react";
import { useTheme } from "@mui/material/styles";
import { ArrowBack } from "@mui/icons-material"; 
import { colors } from "../Constants/colors";
import SearchBar from "../Common/SearchBar";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Filters from "../Common/Filters";

const StyledTypography1 = styled(Typography)`
  font-size: 23px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.02em;
`;

const StyledTypography2 = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0.02em;
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

const PrimeHeader = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };
  return (
    <>
    <Box sx={{ marginTop: "54px" }}>
      <Grid container alignItems="center">
        <Grid item paddingY={{ xs: 2, sm: 5 }}>
          <Box display="flex" alignItems="center" marginBottom={1}>
            <ArrowBack sx={{ color: colors.navyBlue500, marginRight: 1 }} /> 
            <StyledTypography1
              color={colors.navyBlue500}
              marginRight={1}
              component="span"
            >
              Sovrenn
            </StyledTypography1>
            <StyledTypography1 color={theme.palette.primary.main} component="span">
              Prime
            </StyledTypography1>
          </Box>
          <StyledTypography2 color={colors.navyBlue400}>
            Access prime stock articles for informed investment decisions
          </StyledTypography2>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SearchBar placeholder="Search for company, sector, or industry" />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <StyledButton
            variant="outlined"
            endIcon={<StyledFilterIcon />}
            size="small"
            onClick={toggleDrawer(true)}
          >
            Filter
          </StyledButton>
        </Grid>
      </Grid>
    </Box>
    <Filters isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
    
  );
};

export default PrimeHeader;