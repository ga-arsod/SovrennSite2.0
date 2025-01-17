"use client";
import React, { useState ,useEffect} from "react";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  MenuItem,Select
} from "@mui/material";
import DiscoveryTableCard from "../Cards/DiscoveryTableCard";
import DiscoveryTable from "../../components/Discovery/DiscoveryTable";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchBar from "../Common/SearchBar";
import {discoveryTableApi} from "../../app/Redux/Slices/discoverySlice"
import { useDispatch } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { discoveryFiltersApiCall } from "../../app/Redux/Slices/discoverySlice";
import Spinner from "../Common/Spinner";

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

const StyledInputLabel = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.greyBlue300};
   margin-left: 32px; 
  margin-right: 8px; 
`;

const StyledSelect = styled(Select)`
  width: 180px;
   font-size: 14px;
  & .MuiInputBase-root {
    padding: 6px 12px;
    font-size: 8px;
    color: ${colors.navyBlue200};
    border-radius: 8px;
  }

  & .MuiSelect-select {
    padding: 10px 12px;
    display: flex;
    align-items: center;
     color: ${colors.greyBlue300};
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${colors.navyBlue200};
  }
`;
const StyledMenuItem = styled(MenuItem)`
  font-size: 14px; 
`;

const DiscoveryBucketContent = () => {
  const theme = useTheme();
  const { id } = useParams();
  
  const {title,isTableDataLoading}=useSelector((store) => store.discovery);
  const dispatch=useDispatch()
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const filtersData = useSelector((store) => store.discovery.filtersData);
  const tableData = useSelector((store) => store.discovery.discoveryTableBucket);
  const [firstWord, ...remainingWordsArray] = title.split(" ");

  const remainingWords = remainingWordsArray.join(" ");
  const [filter, setFilter] = useState({
    company_type: "all",
    ttm_pe: "all",
    market_cap: "all",
  });

  const handleFilterChange = (ele) => {
    const { value, name } = ele.target;

    setFilter({
      ...filter,
      [name]: value
    });

    return;
  };
  useEffect(() => {
   
   
      const filterObj = {};
      if (filter.company_type === "all") {
      
        filterObj["company_type"] = "";
      }
      else {
        filterObj["company_type"] = filter.company_type;
      };

      if (filter.ttm_pe === "all") {
        filterObj["ttm_pe"] = {};
      }
      else {
        filterObj["ttm_pe"] = {
          [filter.ttm_pe]: 40
        };
      };

      if (filter.market_cap === "all") {
        filterObj["market_cap"] = {};
      }
      else {
        filterObj["market_cap"] = {
          [filter.market_cap]: 500
        };
      };

     
        dispatch(discoveryTableApi({id:id,body:filterObj}));
      
    

    return () => {

    }
  }, [filter]);

  useEffect(()=>{
    dispatch(discoveryFiltersApiCall())
  },[])

  return (
    <>
    {
      isTableDataLoading ? <Spinner/>:<>
       <Box sx={{ marginTop: "64px" }} marginBottom={{ xs: 3, sm: "28px" }}>
        <Grid container alignItems="center">
          <Grid item paddingY={{ xs: 2, sm: 5 }}>
            <Box marginBottom={1}>
              <StyledTypography1
                color={colors.navyBlue500}
                marginRight={1}
                component="span"
              >
                {firstWord}
              </StyledTypography1>
              <StyledTypography1
                color={theme.palette.primary.main}
                component="span"
              >
                {remainingWords}
              </StyledTypography1>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          width="100%"
        >
          <Grid item>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "auto",
               
              }}
            >
              <StyledInputLabel>{`Market Cap:`}</StyledInputLabel>
              <StyledSelect
                name="market_cap"
                value={filter.market_cap}
                onChange={handleFilterChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                IconComponent={ExpandMoreIcon} 
              >
                {filtersData[0]?.options.map((element,index) => {
                  return <StyledMenuItem 
                   key={index}
                  value={index==0?"all":index==1 ? "$lte":"$gt"}
                  
                  >{element.placeholder}</StyledMenuItem>;
                })}
              </StyledSelect>
              <StyledInputLabel>{`PE:`}</StyledInputLabel>
              <StyledSelect
                name="ttm_pe"
                value={filter.ttm_pe}
                onChange={handleFilterChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                IconComponent={ExpandMoreIcon} 
              >
                {filtersData[1]?.options.map((element,index) => {
                  return <StyledMenuItem 
                   key={index}
                  value={index==0?"all":index==1 ? "$lte":"$gt"}
                  
                  >{element.placeholder}</StyledMenuItem>;
                })}
              </StyledSelect>
              <StyledInputLabel>{`Company Type:`}</StyledInputLabel>
              <StyledSelect
                name="company_type"
                value={filter.company_type}
                onChange={handleFilterChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                IconComponent={ExpandMoreIcon} 
              >
                {filtersData[2]?.options.map((element,index) => {
                  return <StyledMenuItem 
                  key={index}
                  name="company_type"
                  value={index==0?"all":index==1 ? "SME":"Non SME"}
                  onChange={handleFilterChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  IconComponent={ExpandMoreIcon} 
                  
                  >{element.placeholder}</StyledMenuItem>;
                })}
              </StyledSelect>
            </FormControl>
          </Grid>

       
        </Grid>
      </Box>
      {isSmallerThanMd ? (
        <DiscoveryTableCard tableData={tableData}  id={id} />
      ) : (
        <DiscoveryTable tableData={tableData} id={id}  />
      )}
      </>
    }
     
    </>
  );
};

export default DiscoveryBucketContent;
