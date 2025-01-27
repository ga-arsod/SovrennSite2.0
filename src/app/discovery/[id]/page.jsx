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
import { useRouter } from "next/navigation";
import DiscoveryTableCard from "@/components/Cards/DiscoveryTableCard";
import DiscoveryTable from "../../../components/Discovery/DiscoveryTable";
import styled from "@emotion/styled";
import { colors } from "@/components/Constants/colors";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NoData from "../../../components/NoData/NoData";
import {
  discoveryTableApi,
  myBucketDiscoveryTableApi,
  discoveryFiltersApiCall,
} from "@/app/Redux/Slices/discoverySlice";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Spinner from "../../../components/Common/Spinner";
import Head from "next/head";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usePathname } from "next/navigation";
import Pagination from "@/components/Pagination/Pagination";
import ScrollCircle from "@/components/Common/ScrollCircle";

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
  text-align: center;
`;

const DiscoveryBucketContent = () => {
  const theme = useTheme();
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const pathname = usePathname();
  const formattedId = decodeURIComponent(id)
    .replace(/&/g, "and")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
    const [sortBy, setSortBy] = useState("date");
    const [sortOrder, setSortOrder] = useState("dec");
  const { isTableDataLoading } = useSelector((store) => store.discovery);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const containsDiscovery = pathname.includes('discovery');
  const bucket = searchParams.get("bucket");
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const filtersData = useSelector((store) => store.discovery.filtersData);
  const tableData = useSelector(
    (store) => store.discovery.discoveryTableBucket
  );
  const pagination = useSelector((store) => store.discovery.pagination);
  const { userDetails, isAuth } = useSelector((store) => store.auth);
  const title = formattedId;

  const firstSpaceIndex = title?.indexOf(" ");
  const part1 = title.substring(0, firstSpaceIndex);
  const part2 = title.substring(firstSpaceIndex + 1);
  const [filter, setFilter] = useState({
    company_type: "all",
    ttm_pe: "all",
    market_cap: "all",
  });

  const handleFilterChange = (ele) => {
    console.log(ele,"ele")
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

    if (typeof window !== "undefined") {
      const fullPath = window.location.href;

      const url = new URL(fullPath);

      const bucketValue = url.searchParams.get("bucket");
      if (bucketValue) {
        dispatch(
          myBucketDiscoveryTableApi({
            id: id,
            body: filterObj,
            page: currentPage,
            sort_by:
              sortBy,
            sort_order: sortOrder,
          })
        );
      } else {
        dispatch(
          discoveryTableApi({
            id: id,
            body: filterObj,
            page: currentPage,
            sort_by:
             sortBy,
            sort_order: sortOrder,
          })
        );
      }
    }
    console.log(filterObj,"filter obj")
  }, [filter, sortBy, sortOrder, dispatch, isAuth, currentPage]);

  useEffect(() => {
    dispatch(discoveryFiltersApiCall());
  }, [dispatch, isAuth]);
console.log(filtersData,"filters data")
  useEffect(() => {
   
    if (typeof window !== "undefined") {
      document.title = `Stocks to Check in ${title}`;
      const link = document.querySelector("link[rel='canonical']");
      if (link) {
        link.href = `https://www.sovrenn.com/discovery/${id}`;
      }
    }
  }, [title, id]);

  if (isTableDataLoading) {
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
                <StyledTypography1
                  color={colors.navyBlue500}
                  marginRight={1}
                  component="span"
                >
                  {part1}{" "}
                  <span style={{ color: colors.themeGreen }}>{part2}</span>
                </StyledTypography1>
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
                            {element?.placeholder}
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
                            {element?.placeholder}
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
                            value={index === 0 ? "all" : element?.value}
                           
                          >
                            {element?.placeholder}
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
          tableData?.companies?.length === 0 ? (
            <NoData text="No data available for this bucket currently." />
          ) : (
            <DiscoveryTableCard tableData={tableData} id={id} />
          )
        ) : tableData?.companies?.length === 0 ? (
          <NoData text="No data available for this bucket currently." />
        ) : (
          <DiscoveryTable tableData={tableData} id={id} 
          sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            sortBy={sortBy}
            setSortBy={setSortBy}
            bucket={bucket}
            containsDiscovery={containsDiscovery}
          />
        )}
        <ScrollCircle />
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
      </Container>
    </>
  );
};

export default DiscoveryBucketContent;
