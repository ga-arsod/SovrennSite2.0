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
import { timesPdfListApi,togglePdfFilter } from "../../app/Redux/Slices/timesSlice";
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
    white-space: nowrap;
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





const TimesPdfFilter = ({ isOpen,handleModalOpen,page2,setPage2,setFilterData2 }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const [showAllMonths, setShowAllMonths] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState(false);
 
  const [findCompany, setFindCompany] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { timesPdfFilter } = useSelector((store) => store.times);
  const { isAuth } = useSelector((store) => store.auth);
 
    const toggleDrawer = () => {
      dispatch(togglePdfFilter());
    };
 
    const optionsFilterArray=(arr,key)=>{
      const newArray=arr.map((item)=>{
        return {
          placeholder:item.placeholder.toLowerCase(),
          value:item.value
        }
      }).filter((item)=>{
        return item.placeholder.includes(key.toLowerCase())
      })
      return newArray;
    }

    const [filter, setFilter] = useState({});
    const [filterBody, setFilterBody] = useState({});
   
    const updateFilter = (item, key, status) => {
      console.log(item,key,status)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
  
      const filterObj = new Object(filterBody);
  
      if (status) {
        let arr = filterObj[key].filter(ele => ele !== item.value);
  
        let arr2 = filter[key].filter(ele => ele !== item.placeholder);
  
        filterObj[key] = arr;
  
        setFilterBody(filterObj);
  
        setFilter({
          ...filter,
          [key]: arr2
        })
      }
      else {
  
        filterObj[key] = filterObj[key] ? [...filterObj[key], item.value] : [item.value];
  
        setFilterBody(filterObj);
  
        setFilter({
          ...filter,
          [key]: filter[key] ? [...filter[key], item.placeholder] : [item.placeholder]
        })
      };
  
      let flag = true;
  
      Object.entries(filterObj).map(([key, value]) => {
  
        if (filterObj[key].length) flag = false;
      });
  
  setFilterData2(filterObj)
    
  
      return;
    };
  
    const resetFilters = () => {
    
     
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      setFilter({});
      setFilterBody({});
      setFilterData2({})
      setPage2(1)
      
    };


  if (!timesPdfFilter?.length) {
    return <></>;
  }

  return (
    <Box>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
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
                onClick={resetFilters}
              >
                Reset Filter
              </UnderlinedTypography>
            </Grid>
          </Grid>
          <CustomDivider sx={{ mt: 1, mb: 3 }} />
          <FormControl component="fieldset" sx={{ width: "100%", padding: 2 }}>
            <StyledTypography1 variant="subtitle1" sx={{ mb: 1 }}>
              {timesPdfFilter[0]?.category}
            </StyledTypography1>
            <Box display="flex" marginBottom={2}>
              <StyledTextField
                variant="outlined"
                size="small"
                placeholder="Search for company"
                onChange={(ele) => setFindIndustry(ele.target.value)}
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
              <StyledButton2 variant="contained">Search</StyledButton2>
            </Box>
            <Grid
              container
              justifyContent="space-between"
              sx={{ width: "80%" }}
            >
              {(showAllCompanies
                ? optionsFilterArray(timesPdfFilter[0]?.options,findCompany)
                : optionsFilterArray(timesPdfFilter[0]?.options,findCompany).slice(0, 5)
              ).map((company, index) => (
                <Grid item key={index} xs={12}>
                  <CustomFormControlLabel
                    control={
                      <CustomCheckbox
                      checked={filter[timesPdfFilter[0].key] ? filter[timesPdfFilter[0].key]?.includes(company.placeholder) : false}
                      onChange={() => {
                        const isChecked = filter[timesPdfFilter[0].key]?.includes(company.placeholder);
                        updateFilter(company, timesPdfFilter[0].key, isChecked);
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
            <CustomDivider sx={{ mt: 2, mb: 2 }} />

            <StyledTypography1 variant="subtitle1" sx={{ mb: 1 }}>
              {timesPdfFilter[1]?.category}
            </StyledTypography1>
           
            {(showAllMonths
              ? timesPdfFilter[1]?.options
              : timesPdfFilter[1]?.options.slice(0, 5)
            ).map((month, index) => (
              <CustomFormControlLabel
                key={index}
                control={
                  <CustomCheckbox
                  checked={filter[timesPdfFilter[1].key] ? filter[timesPdfFilter[1].key]?.includes(month.placeholder) : false}
                  onChange={() => {
                    const isChecked = filter[timesPdfFilter[1].key]?.includes(month.placeholder);
                    updateFilter(month, timesPdfFilter[1].key, isChecked);
                  }}
                  />
                }
                label={month.placeholder}
              />
            ))}
            <Grid container justifyContent="flex-start">
              <StyledViewAllButton
                endIcon={
                  showAllMonths ? (
                    <KeyboardArrowUpOutlinedIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )
                }
                onClick={() => setShowAllMonths(!showAllMonths)}
              >
                {showAllMonths ? "Hide" : "View All"}
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
            zIndex: 1401,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <StyledButton
                fullWidth
                variant="outlined"
                onClick={toggleDrawer}
              >
                Cancel
              </StyledButton>
            </Grid>
            <Grid item xs={6}>
              <StyledButton3
                fullWidth
                variant="contained"
               
                onClick={() => {
                  if(isAuth)
                  {
                    dispatch(timesPdfListApi({page:1,data:filterBody}))
                    setPage2(1)
                  }
                    
                  else
                 {
                  handleModalOpen()
                 
                 }
                 dispatch(togglePdfFilter())
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

export default TimesPdfFilter;
