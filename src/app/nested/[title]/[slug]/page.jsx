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
import { useRouter, usePathname, useParams } from "next/navigation";
import ScrollCircle from "../../../../components/Common/ScrollCircle";
import DiscoveryTable from "@/components/Discovery/DiscoveryTable";
import DiscoveryTableCard from "@/components/Cards/DiscoveryTableCard";
import styled from "@emotion/styled";
import { colors } from "@/components/Constants/colors";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  nestedBucketDiscoveryTableApi,
  discoveryFiltersApiCall,
} from "@/app/Redux/Slices/discoverySlice";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pagination from "@/components/Pagination/Pagination";
import Spinner from "../../../../components/Common/Spinner";
import LoginModal from "../../../../components/Modal/LoginModal";
import Head from "next/head";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import NoData from "../../../../components/NoData/NoData";

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
  justify-content: space-between;
  max-width: 300px;
  margin-bottom: 16px;
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
const StyledTypography2 = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-aling: center;
`;

const ChildBucketCompanyContent = () => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname ? decodeURIComponent(pathname).split("/") : [];
  const [currentPage, setCurrentPage] = useState(1);
  const isNestedRoute = pathname.includes("/nested");
  const segments = pathname.split("/");
  const lastSegment = segments.filter(Boolean).pop();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [isOpen, setIsOpen] = useState(true);
  const { isNestedBucketTableDataLoading } = useSelector(
    (store) => store.discovery
  );
  const dispatch = useDispatch();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const filtersData = useSelector((store) => store.discovery.filtersData);
  const title = pathSegments[2];

  const tableData = useSelector(
    (store) => store.discovery.nestedBucketDiscoveryTableBucket
  );
  const pagination = useSelector((store) => store.discovery.pagination);
  const { isAuth } = useSelector((store) => store.auth);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("dec");
  const firstSpaceIndex = tableData?.bucket?.title?.indexOf(" ");
  const part1 = tableData?.bucket?.title.substring(0, firstSpaceIndex);
  const part2 = tableData?.bucket?.title.substring(firstSpaceIndex + 1);
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

  const handleBackClick = () => {
    router.back();
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

    dispatch(
      nestedBucketDiscoveryTableApi({
        id: lastSegment,
        body: filterObj,
        page: currentPage,
        sort_by: sortBy,
        sort_order: sortOrder,
      })
    );
  }, [filter, sortBy, sortOrder, dispatch, isAuth, currentPage]);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(discoveryFiltersApiCall());
  }, []);

  useEffect(() => {
    if (isNestedBucketTableDataLoading) {
      document.title = title;
    } else {
      document.title = title;
    }
    if (typeof window !== "undefined") {
      document.title = title;
      const link = document.querySelector("link[rel='canonical']");
      if (link) {
        link.href = `https://www.sovrenn.com/discovery/${lastSegment}`;
      }
    }
  }, [isNestedBucketTableDataLoading, lastSegment]);
  
  if (isNestedBucketTableDataLoading) {
    return (
      <>
        <Spinner margin={15} />
      </>
    );
  }

  return (
    <>
      <Container>
        <Box sx={{ marginTop: "64px" }} marginBottom={{ xs: 3, sm: "28px" }}>
          <Grid container alignItems="center">
            <Grid item paddingY={{ xs: 2, sm: 5 }}>
              <Box marginBottom={1} display="flex" alignItems="center">
                {isSmallScreen && (
                  <ArrowBackIcon
                    sx={{
                      fontSize: 28,
                      marginRight: { xs: 1, sm: 2 },
                      color: colors.navyBlue500,
                    }}
                    onClick={handleBackClick}
                  />
                )}
                <Box display="flex" flexWrap="wrap" alignItems="center">
                  <StyledTypography1
                    color={colors.navyBlue500}
                    marginRight={1}
                    component="span"
                  >
                    {part1}{" "}
                    <span style={{ color: colors.themeGreen }}>{part2}</span>
                  </StyledTypography1>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {isAuth ? (
            !filtersData ? (
              <></>
            ) : (
              <Grid container justifyContent="flex-end" alignItems="center">
                <Grid item>
                  <FormControl
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: { xs: "flex-end", md: "flex-end" },
                      justifyContent: { xs: "flex-start", md: "flex-end" },
                      gap: { xs: 0, md: 2 },
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
                        MenuProps={{
                          disableScrollLock: true,
                        }}
                      >
                        {filtersData[0]?.options?.map((element, index) => (
                          <StyledMenuItem
                            key={index}
                            value={
                              index === 0 ? "all" : index === 1 ? "lte" : "gt"
                            }
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
                        MenuProps={{
                          disableScrollLock: true,
                        }}
                      >
                        {filtersData[1]?.options?.map((element, index) => (
                          <StyledMenuItem
                            key={index}
                            value={
                              index === 0 ? "all" : index === 1 ? "lte" : "gt"
                            }
                          >
                            {element.placeholder}
                          </StyledMenuItem>
                        ))}
                      </StyledSelect>
                    </StyledSelectContainer>

                    {/* Company Type */}
                    <StyledSelectContainer>
                      <StyledInputLabel>{`Company Type `}</StyledInputLabel>
                      <StyledSelect
                        name="company_type"
                        value={filter.company_type}
                        onChange={handleFilterChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        IconComponent={ExpandMoreIcon}
                        MenuProps={{
                          disableScrollLock: true,
                        }}
                      >
                        {filtersData[2]?.options?.map((element, index) => (
                          <StyledMenuItem
                            key={index}
                            value={index === 0 ? "all" : element.id}
                          >
                            {element.placeholder}
                          </StyledMenuItem>
                        ))}
                      </StyledSelect>
                    </StyledSelectContainer>
                  </FormControl>
                </Grid>
              </Grid>
            )
          ) : (
            ""
          )}
        </Box>
        {isSmallerThanMd ? (
          tableData?.length === 0 ? (
            <NoData text="No data available for this bucket currently." />
          ) : (
            <DiscoveryTableCard tableData={tableData} id={lastSegment} />
          )
        ) : tableData?.length === 0 ? (
          <NoData text="No data available for this bucket currently." />
        ) : (
          <DiscoveryTable
            tableData={tableData}
            id={lastSegment}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            sortBy={sortBy}
            setSortBy={setSortBy}
            isNestedRoute={isNestedRoute}
          />
        )}
        {tableData?.companies?.length ? (
          <Box mt={2}>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pagination={pagination}
            />
          </Box>
        ) : (
          <></>
        )}
        <ScrollCircle />
      </Container>
    </>
  );
};

export default ChildBucketCompanyContent;
