"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PrimeHeading from "../../components/Prime/PrimeHeading";
import PrimeFilter from "../../components/Prime/PrimeFilter";
import PromoterFilter from "../../components/Prime/PromoterFilter";
import PrimeCard from "@/components/Cards/PrimeCard";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TableData from "@/components/Prime/TableData";
import { Grid, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "@/components/Constants/colors";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Spinner from "@/components/Common/Spinner";
import ScrollCircle from "@/components/Common/ScrollCircle";
import { Container, Box } from "@mui/material";
import {
  primeCompaniesListApi,
  promoterCompaniesListApi,
  togglePrimeFilter,
  togglePromoterFilter,
  primeFilterApi,
  promoterFilterApi,
} from "../Redux/Slices/primeSlice";
import { useDispatch } from "react-redux";
import Pagination from "@/components/Pagination/Pagination";

import { setSortBy } from "../Redux/Slices/sortingSlice";

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

const Prime = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("one");
  const [isOpen, setIsOpen] = useState(false);
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [filterData1, setFilterData1] = useState({});
  const [filterData2, setFilterData2] = useState({});
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const {
    isPrimeCompanyListLoading,
    primeCompaniesList,
    promoterCompaniesList,
    isPrimeFilterOpen,
    isPromoterFilterOpen,
    primePagination,
    promoterPagination,
  } = useSelector((store) => store.prime);

  const { isAuth } = useSelector((state) => state.auth);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("dec");
  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleToggle = () => {
    if (activeTab == "one") dispatch(togglePrimeFilter());
    else dispatch(togglePromoterFilter());
  };

  useEffect(() => {
    dispatch(primeFilterApi());
    dispatch(promoterFilterApi());

    dispatch(
      primeCompaniesListApi({
        body: filterData1,
        page: page1,
        sort_by: sortBy,
        sort_order: sortOrder,
      })
    );
    dispatch(
      promoterCompaniesListApi({
        body: filterData1,
        page: page2,
        sort_by: sortBy,
        sort_order: sortOrder,
      })
    );
  }, [sortBy, sortOrder, page1, page2, isAuth, dispatch]);

  useEffect(() => {
    const title = "Understand The Role of a Prime in Stock Market";
    const ogTitle = "Understand The Role of a Prime in Stock Market";
    const description = "Upgrade your stock portfolio with Sovrenn prime stock. Get the latest insights and trends from Sovrenn. Invest with confidence today!";
    const canonicalUrl = "https://www.sovrenn.com/prime";


    if (typeof document !== "undefined") {
      document.title = title;


      let metaDescription = document.querySelector("meta[name='description']");
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        metaDescription.setAttribute("content", description);
        document.head.appendChild(metaDescription);
      }

      let metaTitle = document.querySelector("meta[property='og:title']");
      if (metaTitle) {
        metaTitle.setAttribute("content", ogTitle);
      } else {
        metaTitle = document.createElement("meta");
        metaTitle.setAttribute("property", "og:title");
        metaTitle.setAttribute("content", ogTitle);
        document.head.appendChild(metaTitle);
      }

      let metaDescriptionOg = document.querySelector("meta[property='og:description']");
      if (metaDescriptionOg) {
        metaDescriptionOg.setAttribute("content", description);
      } else {
        metaDescriptionOg = document.createElement("meta");
        metaDescriptionOg.setAttribute("property", "og:description");
        metaDescriptionOg.setAttribute("content", description);
        document.head.appendChild(metaDescriptionOg);
      }

      let canonicalLink = document.querySelector("link[rel='canonical']");
      if (canonicalLink) {
        canonicalLink.setAttribute("href", canonicalUrl);
      } else {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        canonicalLink.setAttribute("href", canonicalUrl);
        document.head.appendChild(canonicalLink);
      }
    }
  }, []);

  if (isPrimeCompanyListLoading) {
    return (
      <>
        <Spinner margin={15} />
      </>
    );
  }

  return (
    <>

      <Container>
        <PrimeHeading setActiveTab={setActiveTab} />
        <Grid
          container
          justifyContent="space-between"
          width="100%"
          marginTop={5}
        >
          <Grid item>
            <StyledButton
              variant="outlined"
              endIcon={<StyledFilterIcon />}
              size="small"
              onClick={handleToggle}
            >
              Filter
            </StyledButton>
          </Grid>
        </Grid>

        {isSmallerThanMd ? (
          <PrimeCard
            data={
              activeTab == "one" ? primeCompaniesList : promoterCompaniesList
            }
            activeTab={activeTab}
          />
        ) : (
          <TableData
            data={
              activeTab == "one" ? primeCompaniesList : promoterCompaniesList
            }
            activeTab={activeTab}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        )}

        {activeTab == "one" ? (
          <PrimeFilter
            isOpen={isPrimeFilterOpen}
            handleModalOpen={handleModalOpen}
            page1={page1}
            setPage1={setPage1}
            setFilterData1={setFilterData1}
          />
        ) : (
          <PromoterFilter
            isOpen={isPromoterFilterOpen}
            setIsOpen={setIsOpen}
            handleModalOpen={handleModalOpen}
            page2={page2}
            setPage2={setPage2}
            setFilterData2={setFilterData2}
          />
        )}
        {(activeTab == "one" && primeCompaniesList?.length) ||
          (activeTab == "two" && promoterCompaniesList?.length) ? (
          <Box mt={2}>
            <Pagination
              currentPage={activeTab == "one" ? page1 : page2}
              setCurrentPage={activeTab == "one" ? setPage1 : setPage2}
              pagination={
                activeTab == "one" ? primePagination : promoterPagination
              }
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

export default Prime;
