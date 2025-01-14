"use client";
import React, { useState, useEffect } from "react";
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
import {
  togglePulseFilter,
  pulseFilteredArticlesApi,
  setPulseFilters,
  clearPulseFilters,
  pulseArticlesApi,
} from "@/app/Redux/Slices/pulseSlice";
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

const PulseFilter = ({
  isOpen,
  handleModalOpen,
  page,
  setPage,
  filterData,
  setFilterData,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [showAllCompanies, setShowAllCompanies] = useState(false);

  const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { pulseFilter, savedFilters } = useSelector((store) => store.pulse);
  const { isAuth } = useSelector((store) => store.auth);

  const toggleFilter = () => {
    dispatch(togglePulseFilter());
  };

  const [isFilterReset, setIsFilterReset] = useState(false);
  const [filter, setFilter] = useState({});
  const [filterBody, setFilterBody] = useState({});

  const updateFilter = (item, key) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const newFilterBody = { ...filterBody };
    const newFilter = { ...filter };

    const isItemSelected =
      newFilter[key] && newFilter[key].includes(item.placeholder);

    if (isItemSelected) {
      newFilterBody[key] = newFilterBody[key].filter(
        (ele) => ele !== item.value
      );
      newFilter[key] = newFilter[key].filter((ele) => ele !== item.placeholder);
    } else {
      newFilterBody[key] = newFilterBody[key]
        ? [...newFilterBody[key], item.value]
        : [item.value];
      newFilter[key] = newFilter[key]
        ? [...newFilter[key], item.placeholder]
        : [item.placeholder];
    }
    
    setFilterBody(newFilterBody);
    setFilter(newFilter);
    setFilterData(newFilterBody);

    return;
  };

  const resetFilters = () => {
    setPage(1);
    setIsFilterReset(true);
   
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    Object.entries(filter).map(([key, value]) => {
      filter[key] = [];
    });

    Object.entries(filterBody).map(([key, value]) => {
      filterBody[key] = [];
    });
  };
  const isFilterEmpty = (filter) => {
    return Object.values(filter).every((value) => Array.isArray(value) && value.length === 0);
  };

  if (!pulseFilter?.length) return <></>;
 
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
                onClick={resetFilters}
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
            <StyledTypography1 variant="subtitle1" sx={{ mb: 1 }}>
              {pulseFilter[0]?.category}
            </StyledTypography1>

            <Grid
              container
              justifyContent="space-between"
              sx={{ width: "80%" }}
            >
              {(pulseFilter[0]?.options).map((month, index) => (
                <Grid item key={index} xs={12}>
                  <CustomFormControlLabel
                    control={
                      <CustomCheckbox
                        checked={
                          filter[pulseFilter[0].key]
                            ? filter[pulseFilter[0].key]?.includes(
                                month.placeholder
                              )
                            : false
                        }
                        onChange={() => {
                          updateFilter(
                            month,
                            pulseFilter[0].key,
                            filter[month.key]
                              ? filter[month.key]?.includes(month.placeholder)
                              : false
                          );
                        }}
                      />
                    }
                    label={month.placeholder}
                  />
                </Grid>
              ))}
            </Grid>

            <CustomDivider sx={{ mt: 2, mb: 2 }} />
            <StyledTypography1 variant="subtitle1" sx={{ mb: 1 }}>
              {pulseFilter[1]?.category}
            </StyledTypography1>

            <Grid
              container
              justifyContent="space-between"
              sx={{ width: "80%" }}
            >
              {(showAllCompanies
                ? pulseFilter[1]?.options
                : pulseFilter[1]?.options.slice(0, 5)
              ).map((company, index) => (
                <Grid item key={index} xs={12}>
                  <CustomFormControlLabel
                    control={
                      <CustomCheckbox
                        checked={
                          (filter[pulseFilter[1]?.key] &&
                            filter[pulseFilter[1]?.key]?.includes(company)) ||
                          false
                        }
                        onChange={() => {
                          updateFilter(
                            company,
                            pulseFilter[0].key,
                            filter[company.key]
                              ? filter[company.key]?.includes(
                                  company.placeholder
                                )
                              : false
                          );
                        }}
                      />
                    }
                    label={company.placeholder}
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
            zIndex: 1400000000,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <StyledButton
                fullWidth
                variant="outlined"
                onClick={() => {
                  dispatch(togglePulseFilter());
                }}
              >
                Cancel
              </StyledButton>
            </Grid>
            <Grid item xs={6}>
              <StyledButton3
                fullWidth
                variant="contained"
                // disabled={isApplyButtonDisabled}
                onClick={() => {
                  if (isAuth) {
                    if (isFilterReset) {
                      dispatch(pulseArticlesApi({ page: 1, pageSize: 20 }));
                      dispatch(togglePulseFilter())
                    } else {
                        dispatch(togglePulseFilter())
                        if(isFilterEmpty(filterData))
                          dispatch(pulseArticlesApi({ page: 1, pageSize: 20 }));
                        else
                      dispatch(
                        pulseFilteredArticlesApi({
                          page: 1,
                          pageSize: 20,
                          filters: filterData,
                        })
                      );
                    }
                  } else {
                    handleModalOpen();
                    dispatch(togglePulseFilter());
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

export default PulseFilter;
