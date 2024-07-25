"use client";
import React, { useState } from "react";
import {
  Grid,
  Box,
  Drawer,
  Typography,
  FormControl,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  Container,
  Divider,InputAdornment,IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchBar from "../Common/SearchBar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.greyBlue500};
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
  }
`;
const StyledFilterIcon = styled(FilterAltOutlinedIcon)`
 && {
    font-size: 16px; // Decrease the icon size
    color: ${colors.navyBlue500}; // Ensure the icon color does not change
  }
`;
const UnderlinedTypography = styled(Typography)`
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px; /* Adjust height for underline thickness */
    background-color: ${colors.navyBlue500}; /* Adjust color for underline */
    bottom: -2px; /* Adjust position for underline */
    left: 0;
  }
`;

const StyledViewAllButton = styled(Button)`
  color: ${colors.themeGreen};
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  text-transform: none;
  display: flex;
  align-items: center;
  padding: 8px 0;
    min-width: 0; /* Ensure the button doesn't have extra padding */

//   .MuiButton-endIcon {
//     margin-left: 4px;
//   }
`;

const StyledButton2 = styled(Button)`
  color: ${colors.navyBlue500};
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  text-transform: none;
  height: 35px;
  border-color: ${colors.navyBlue500};
  margin-left: 15px;
  &:hover {
    border-color: ${colors.navyBlue500};
    color: ${colors.navyBlue500};
  }
`;

const CustomFormControlLabel = styled(FormControlLabel)`
  & .MuiFormControlLabel-label {
    color: ${colors.navyBlue900}; // Change the label color
    font-size: 14px; // Change the font size
    font-weight: 400; // Change the font weight
    line-height: 17px;
  }
  & .MuiCheckbox-root {
    padding: 8px; // Change the checkbox padding
  }
`;

const CustomCheckbox = styled(Checkbox)`
  &.Mui-checked {
    color: ${colors.navyBlue500}; // Change the checkmark color
  }
  & .MuiSvgIcon-root {
    border-radius: 4px; // Optional: Add rounded corners
  }
  &.MuiCheckbox-root {
    &.MuiCheckbox-indeterminate {
      color: ${colors.navyBlue500}; // Change the indeterminate state color
    }
  }
  &.MuiCheckbox-root:not(.Mui-checked):not(.MuiCheckbox-indeterminate) {
    color: ${colors.navyBlue500}; // Change the default grey color of the checkbox border
    
  }
`;

const CustomDivider = styled(Divider)`
  background-color: ${colors.neutral500}; /* Adjust the color as needed */
  border-color: none;
  border-bottom-width: 0px;
  height: 2px; /* Adjust the thickness as needed */
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-color: ${colors.navyBlue300}; // Change the border color
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${colors.navyBlue300};
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${colors.navyBlue300};
    }
    padding-right: 0;
    .MuiOutlinedInput-input {
      padding: 6px 14px;
      margin-left: 30px; // Ensure padding leaves space for icon
    }
    .MuiInputAdornment-root {
      position: absolute;
      left: 5px;
      bottom: 15px;
    }
  }
  .MuiOutlinedInput-input::placeholder {
    color: #64748B; // Change the placeholder color
    font-weight: 400; // Change the placeholder font weight
    font-size: 11px; // Change the font weight
    line-height: 17px;
    opacity: 1; // Ensure the placeholder is fully opaque
  }
`;

const CustomSearchIcon = styled(SearchIcon)`
  color: #64748B; // Change the color of the search icon
`;

const Filters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAllSectors, setShowAllSectors] = useState(false);
  const [showAllIndustries, setShowAllIndustries] = useState(false);
  const theme = useTheme();

  const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const sectors = [
    "Advertising",
    "Beverages",
    "Capital Goods",
    "Chemicals",
    "Energy",
    "Capital Goods",
    "Chemicals",
    "Energy",
  ];

  const industries = [
    "Aquaculture",
    "Breweries & Distilleries",
    "Communications Equipment",
    "Construction Materials",
    "Diversified",
    "Electrical Equipments",
    "Engineering",
    "Electronics",
    "Event Management",
  ];

  return (
    <Container>
      {
        !isSmallerThanSm &&  <Grid container justifyContent="space-between" width="100%" marginTop={5}>
        <Grid item>
          <StyledButton
            variant="outlined"
            endIcon={<StyledFilterIcon />}
            size="small"
            onClick={toggleDrawer(true)}
          >
            Filter
          </StyledButton>
        </Grid>
       
          <Grid item>
          <SearchBar placeholder={"Search for company, sector, or industry"} />
        </Grid>
        
       
      </Grid>
      }
     
      <Box>
        <Drawer
          anchor="left"
          open={isOpen}
          onClose={toggleDrawer(false)}
          sx={{
            zIndex: 1400,
            "& .MuiDrawer-paper": {
              width: 350,
              padding: 2,
              "&::-webkit-scrollbar": {
                width: 4,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: colors.neutral700,
                borderRadius: 4,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
              },
            },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Grid container justifyContent="space-between" alignItems="center" marginTop={3}>
              <Grid item>
                <Typography
                  color={colors.navyBlue500}
                  sx={{
                    fontWeight: "600",
                    fontSize: "23px",
                    lineHeight: "28px",
                    letterSpacing: "-0.02em",
                  }}
                  component="span"
                >
                  Filter
                </Typography>
              </Grid>
              <Grid item>
                <UnderlinedTypography
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600", fontSize: "14px", lineHeight: "17px" }}
                  component="span"
                >
                  Reset Filter
                </UnderlinedTypography>
              </Grid>
            </Grid>
            <CustomDivider sx={{ mt: 1, mb: 3 }} />
            <FormControl component="fieldset" sx={{ width: "100%" }}>
              <StyledTypography1>Company type</StyledTypography1>
              <Grid container justifyContent="space-between" sx={{ width: "80%" }}>
                <Grid item>
                  <CustomFormControlLabel control={<CustomCheckbox />} label="SME" />
                </Grid>
                <Grid item>
                  <CustomFormControlLabel control={<CustomCheckbox />} label="Non-SME" />
                </Grid>
              </Grid>
              <CustomDivider sx={{ mt: 2, mb: 2 }} />
              <StyledTypography1 variant="subtitle1" sx={{ mb: 1 }}>
                Sector
              </StyledTypography1>
              <Box display="flex" marginBottom={2}>
                <StyledTextField
                  variant="outlined"
                  size="small"
                  placeholder="Search for Sector"
                  fullWidth
                  sx={{ mb: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton>
                          <CustomSearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledButton2 variant="outlined">Search</StyledButton2>
              </Box>
              {(showAllSectors ? sectors : sectors.slice(0, 5)).map((sector, index) => (
                <CustomFormControlLabel key={index} control={<CustomCheckbox />} label={sector} />
              ))}
              <Grid container justifyContent="flex-start">
                <StyledViewAllButton
                  endIcon={showAllSectors ? <KeyboardArrowUpOutlinedIcon /> : <ExpandMoreIcon />}
                  onClick={() => setShowAllSectors(!showAllSectors)}
                >
                  {showAllSectors ? "Hide" : "View All"}
                </StyledViewAllButton>
              </Grid>
              <CustomDivider sx={{ mt: 2, mb: 2 }} />
              <StyledTypography1 variant="subtitle1" sx={{ mb: 1 }}>
                Industry
              </StyledTypography1>
              <Box display="flex" marginBottom={2}>
                <StyledTextField
                  variant="outlined"
                  size="small"
                  placeholder="Search for Industry"
                  fullWidth
                  sx={{ mb: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton>
                          <CustomSearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledButton2 variant="outlined">Search</StyledButton2>
              </Box>
              {(showAllIndustries ? industries : industries.slice(0, 5)).map((industry, index) => (
                <CustomFormControlLabel key={index} control={<CustomCheckbox />} label={industry} />
              ))}
              <Grid container justifyContent="flex-start">
                <StyledViewAllButton
                  endIcon={showAllIndustries ? <KeyboardArrowUpOutlinedIcon /> : <ExpandMoreIcon />}
                  onClick={() => setShowAllIndustries(!showAllIndustries)}
                >
                  {showAllIndustries ? "Hide" : "View All"}
                </StyledViewAllButton>
              </Grid>
            </FormControl>
          </Box>
        </Drawer>
      </Box>
    </Container>
  );
};

export default Filters;