"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  FormControl,
  MenuItem,
  Select,
  Container,
} from "@mui/material";
import DiscoveryTableCard from "@/components/Cards/DiscoveryTableCard";
import DiscoveryTable from "../../../components/Discovery/DiscoveryTable";
import styled from "@emotion/styled";
import { colors } from "@/components/Constants/colors";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { discoveryTableApi, discoveryFiltersApiCall } from "@/app/Redux/Slices/discoverySlice";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "next/navigation";
import LoginModal from "../../../components/Modal/LoginModal";
import Spinner from "../../../components/Common/Spinner";
import Head from "next/head";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  white-space: nowrap;
  margin-right: 8px;
`;

const StyledSelectContainer = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%; 
  justify-content:space-between;
  max-width: 300px;
  margin-bottom: 16px; /* Add margin at the bottom for spacing */
`;

const StyledSelect = styled(Select)`
  width: 180px; 
  font-size: 14px;
  box-sizing: border-box; 
  & .MuiInputBase-root {
    padding: 6px 12px;
    font-size: 14px;
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
 
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const { title, isTableDataLoading } = useSelector((store) => store.discovery);
  const dispatch = useDispatch();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const filtersData = useSelector((store) => store.discovery.filtersData);
  const tableData = useSelector((store) => store.discovery.discoveryTableBucket);
  const lastSpaceIndex = title.lastIndexOf(' ');


const part1 = title.substring(0, lastSpaceIndex + 1); 
const part2 = title.substring(lastSpaceIndex + 1);
  const [filter, setFilter] = useState({
    company_type: "all",
    ttm_pe: "all",
    market_cap: "all",
  });

  const handleFilterChange = (ele) => {
    const { value, name } = ele.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  useEffect(() => {
    const filterObj = {};
    if (filter.company_type === "all") {
      filterObj["company_type"] = "";
    } else {
      filterObj["company_type"] = filter.company_type;
    }

    if (filter.ttm_pe === "all") {
      filterObj["ttm_pe"] = {};
    } else {
      filterObj["ttm_pe"] = {
        [filter.ttm_pe]: 40,
      };
    }

    if (filter.market_cap === "all") {
      filterObj["market_cap"] = {};
    } else {
      filterObj["market_cap"] = {
        [filter.market_cap]: 500,
      };
    }

    dispatch(discoveryTableApi({ id: id, body: filterObj }));
  }, [filter]);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(discoveryFiltersApiCall());
  }, []);

  if (isTableDataLoading) {
    return (
      <>
        <Head>
          <title>{title}</title>
          <link
            rel="canonical"
            href={`https://www.sovrenn.com/discovery/${id}`}
            key="canonical"
          />
        </Head>
        <Spinner margin={15} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="canonical"
          href={`https://www.sovrenn.com/discovery/${id}`}
          key="canonical"
        />
      </Head>
      <Container>
        {isOpen ? <LoginModal isOpen={!isOpen} handleClose={handleClose} /> : <></>}
        <Box sx={{ marginTop: "64px" }} marginBottom={{ xs: 3, sm: "28px" }}>
          <Grid container alignItems="center">
            <Grid item paddingY={{ xs: 2, sm: 5 }}>
            <Box marginBottom={1} display="flex" alignItems="center">
              {isSmallScreen && (
                <ArrowBackIcon
                  sx={{
                    fontSize: { xs: 23, sm: 48 },
                    marginRight: { xs: 1, sm: 2 },
                    color: colors.navyBlue500,
                  }}
                />
              )}
              <StyledTypography1
                color={colors.navyBlue500}
                marginRight={1}
                component="span"
              >
           {part1}
              </StyledTypography1>
              <StyledTypography1
                color={theme.palette.primary.main}
                component="span"
              >
             {part2}
              </StyledTypography1>
            </Box>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" alignItems="center">
            <Grid item>
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "flex-end", md: "flex-end" }, 
                  justifyContent: { xs: "flex-start", md: "flex-end" },
                  gap: {xs:0,md:2},
                }}
              >
                {/* Market Cap */}
                <StyledSelectContainer>
                  <StyledInputLabel>{`Market Cap `}</StyledInputLabel>
                  <StyledSelect
                    name="market_cap"
                    value={filter.market_cap}
                    onChange={handleFilterChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    IconComponent={ExpandMoreIcon}
                  >
                    {filtersData[0]?.options.map((element, index) => (
                      <StyledMenuItem
                        key={index}
                        value={index === 0 ? "all" : index === 1 ? "$lte" : "$gt"}
                      >
                        {element.placeholder}
                      </StyledMenuItem>
                    ))}
                  </StyledSelect>
                </StyledSelectContainer>

                {/* PE */}
                <StyledSelectContainer>
                  <StyledInputLabel>{`PE `}</StyledInputLabel>
                  <StyledSelect
                    name="ttm_pe"
                    value={filter.ttm_pe}
                    onChange={handleFilterChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    IconComponent={ExpandMoreIcon}
                  >
                    {filtersData[1]?.options.map((element, index) => (
                      <StyledMenuItem
                        key={index}
                        value={index === 0 ? "all" : index === 1 ? "$lte" : "$gt"}
                      >
                        {element.placeholder}
                      </StyledMenuItem>
                    ))}
                  </StyledSelect>
                </StyledSelectContainer>

                {/* SME/Non-SME */}
                <StyledSelectContainer>
                  <StyledInputLabel>{`SME/Non-SME `}</StyledInputLabel>
                  <StyledSelect
                    name="company_type"
                    value={filter.company_type}
                    onChange={handleFilterChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    IconComponent={ExpandMoreIcon}
                  >
                    {filtersData[2]?.options.map((element, index) => (
                      <StyledMenuItem
                        key={index}
                        value={index === 0 ? "all" : index === 1 ? "SME" : "Non SME"}
                      >
                        {element.placeholder}
                      </StyledMenuItem>
                    ))}
                  </StyledSelect>
                </StyledSelectContainer>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        {isSmallerThanMd ? (
          <DiscoveryTableCard tableData={tableData} id={id} />
        ) : (
          <DiscoveryTable tableData={tableData} id={id} />
        )}
      </Container>
    </>
  );
};

export default DiscoveryBucketContent;