"use client";
import React, { useState } from "react";
import {
  Box,
  Drawer,
  Grid,
  Typography,
  FormControl,
  FormControlLabel,
  Divider,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { ipoCompaniesListApi,toggleIpoFilter } from "@/app/Redux/Slices/ipoSlice";
import { useDispatch } from "react-redux";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.greyBlue500};
`;

const UnderlinedTypography = styled(Typography)`
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: ${colors.navyBlue500};
    bottom: -2px;
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
  min-width: 0;
`;

const StyledButton2 = styled(Button)`
  color: white;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  text-transform: none;
  height: 35px;
  border-color: ${colors.navyBlue500};
  background-color: ${colors.navyBlue500};
  margin-left: 15px;
  &:hover {
    border-color: ${colors.navyBlue500};
    color: white;
    background-color: ${colors.navyBlue400};
  }
`;

const StyledButton3 = styled(Button)`
  color: white;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  text-transform: none;
  padding-top: 12px;
  padding-bottom: 12px;
  border-color: ${colors.themeGreen};
  background-color: ${colors.themeGreen};

  &:hover {
    color: white;
    border-color: ${colors.themeGreen};
    background-color: ${colors.themeGreen};
  }
`;

const CustomFormControlLabel = styled(FormControlLabel)`
  & .MuiFormControlLabel-label {
    color: ${colors.navyBlue900};
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
  }
  & .MuiCheckbox-root {
    padding: 8px;
  }
`;

const CustomCheckbox = styled(Checkbox)`
  &.Mui-checked {
    color: ${colors.navyBlue500};
  }
  & .MuiSvgIcon-root {
    border-radius: 4px;
  }
  &.MuiCheckbox-root {
    &.MuiCheckbox-indeterminate {
      color: ${colors.navyBlue500};
    }
  }
  &.MuiCheckbox-root:not(.Mui-checked):not(.MuiCheckbox-indeterminate) {
    color: ${colors.navyBlue500};
  }
`;

const CustomDivider = styled(Divider)`
  background-color: ${colors.neutral500};
  border-color: none;
  border-bottom-width: 0px;
  height: 2px;
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-color: ${colors.navyBlue300};
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${colors.navyBlue300};
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${colors.navyBlue300};
    }
    padding-right: 0;
    .MuiOutlinedInput-input {
      padding: 6px 14px;
      margin-left: 30px;
    }
    .MuiInputAdornment-root {
      position: absolute;
      left: 5px;
      bottom: 15px;
    }
  }
  .MuiOutlinedInput-input::placeholder {
    color: #64748b;
    font-weight: 400;
    font-size: 11px;
    line-height: 17px;
    opacity: 1;
  }
`;

const CustomSearchIcon = styled(SearchIcon)`
  color: #64748b;
`;

const ScrollableBox = styled(Box)`
  width: 100%;
  flex: 1 1 auto;
  overflow: auto;
  padding-bottom: 80px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.neutral700};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${colors.greyBlue100};
  }
`;
const StyledButton = styled(Button)`
  color: ${colors.themeGreen};
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  text-transform: none;
  padding-top: 12px;
  padding-bottom: 12px;
  border-color: ${colors.themeGreen};

  &:hover {
    color: ${colors.themeGreen};
    border-color: ${colors.themeGreen};
  }
`;



const IpoFilters = ({ isOpen, handleModalOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [showAllSectors, setShowAllSectors] = useState(false);
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const {  ipoFilter } = useSelector((store) => store.ipo);
  const { isAuth } = useSelector((store) => store.auth);

  const toggleFilter = () => {
    dispatch(toggleIpoFilter());
  };

  const [filter, setFilter] = useState({
    sector_id: [],

    company_name: [],

    company_type: [],
  });

  const handleChange = (category, option) => (event) => {
    const { checked } = event.target;

    setFilter((prevFilter) => {
      const updatedOptions = prevFilter[category] || [];
      const newOptions = checked
        ? [...updatedOptions, option]
        : updatedOptions.filter((item) => item !== option);

      return {
        ...prevFilter,
        [category]: newOptions,
      };
    });
  };

  const isApplyButtonDisabled =
    filter.sector_id.length === 0 &&
    filter.company_name.length === 0 &&
    filter.company_type.length === 0;


    if(!ipoFilter.length)
        return <></>
  return (
    <Box>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleFilter}
        sx={{
          zIndex: 1400,
          "& .MuiDrawer-paper": {
            width: isSmallerThanSm ? "100%" : "350px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <ScrollableBox>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            marginTop={3}
            padding={2}
          >
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
                sx={{
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "17px",
                  cursor: "pointer",
                }}
                component="span"
              >
                Reset Filter
              </UnderlinedTypography>
            </Grid>
          </Grid>
          <CustomDivider sx={{ mt: 1, mb: 3 }} />
          <FormControl component="fieldset" sx={{ width: "100%", padding: 2 }}>
            <StyledTypography1>{ipoFilter[0]?.category}</StyledTypography1>
            <Grid
              container
              justifyContent="space-between"
              sx={{ width: "80%" }}
            >
              {ipoFilter[0]?.options.map((item, index) => {
                return (
                  <>
                    <Grid item xs={12} key={index}>
                      <CustomFormControlLabel
                        checked={filter[item.key]?.includes(item.value)}
                        onChange={handleChange(ipoFilter[0]?.key, item.value)}
                        control={<CustomCheckbox />}
                        label={item.placeholder}
                      />
                    </Grid>
                  </>
                );
              })}
            </Grid>
            <CustomDivider sx={{ mt: 2, mb: 2 }} />
            <StyledTypography1 variant="subtitle1" sx={{ mb: 1 }}>
              {ipoFilter[1]?.category}
            </StyledTypography1>

            <Grid
              container
              justifyContent="space-between"
              sx={{ width: "80%" }}
            >
              {(showAllSectors
                ? ipoFilter[1]?.options
                : ipoFilter[1]?.options.slice(0, 5)
              ).map((sector, index) => (
                <Grid item key={index} xs={12}>
                  <CustomFormControlLabel
                    control={
                      <CustomCheckbox
                        checked={filter[sector.key]?.includes(sector.value)}
                        onChange={handleChange(
                          ipoFilter[1]?.key,
                          sector.value
                        )}
                      />
                    }
                    label={sector.placeholder}
                  />
                </Grid>
              ))}
            </Grid>

            <Grid container justifyContent="flex-start">
              <StyledViewAllButton
                endIcon={
                  showAllSectors ? (
                    <KeyboardArrowUpOutlinedIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )
                }
                onClick={() => setShowAllSectors(!showAllSectors)}
              >
                {showAllSectors ? "Hide" : "View All"}
              </StyledViewAllButton>
            </Grid>
            <CustomDivider sx={{ mt: 2, mb: 2 }} />
            <StyledTypography1 variant="subtitle1" sx={{ mb: 1 }}>
              {ipoFilter[2]?.category}
            </StyledTypography1>

            <Grid
              container
              justifyContent="space-between"
              sx={{ width: "80%" }}
            >
              {(showAllCompanies
                ? ipoFilter[2]?.options
                : ipoFilter[2]?.options.slice(0, 5)
              ).map((sector, index) => (
                <Grid item key={index} xs={12}>
                  <CustomFormControlLabel
                    control={
                      <CustomCheckbox
                        checked={filter[sector.key]?.includes(sector.value)}
                        onChange={handleChange(
                          ipoFilter[2]?.key,
                          sector.value
                        )}
                      />
                    }
                    label={sector.placeholder}
                  />
                </Grid>
              ))}
            </Grid>

            <Grid container justifyContent="flex-start">
              <StyledViewAllButton
                endIcon={
                  showAllCompanies ? (
                    <KeyboardArrowUpOutlinedIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )
                }
                onClick={() => setShowAllCompanies(!showAllCompanies)}
              >
                {showAllCompanies ? "Hide" : "View All"}
              </StyledViewAllButton>
            </Grid>
            <CustomDivider sx={{ mt: 2, mb: 2 }} />
          </FormControl>
        </ScrollableBox>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "8px 12px",
            boxShadow: "0px -2px 12px 0px #0000001F",
            backgroundColor: "white",
            zIndex: 1401,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <StyledButton fullWidth variant="outlined" onClick={toggleFilter}>
                Cancel
              </StyledButton>
            </Grid>
            <Grid item xs={6}>
              <StyledButton3
                fullWidth
                variant="contained"
                disabled={isApplyButtonDisabled}
                onClick={()=>{
                    if(isAuth)
                    dispatch(ipoCompaniesListApi(filter))
                  else
                 {
                  handleModalOpen()
                  dispatch(toggleIpoFilter())
                 }
                  }}
              >
                Apply Filter
              </StyledButton3>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </Box>
  );
};

export default IpoFilters;
