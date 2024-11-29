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
import Head from "next/head";
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
import Footer from "@/components/Home/Footer";

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
    primeCompaniesList,
    promoterCompaniesList,
    isPrimeFilterOpen,
    isPromoterFilterOpen,
    primePagination,
    promoterPagination,
  } = useSelector((store) => store.prime);
  const { sortBy, sortOrder } = useSelector((state) => state.sorting);

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
        page: 1,
        data: filterData1,
      })
    );
    dispatch(
      promoterCompaniesListApi({
        page: 1,
        data: filterData2,
      })
    );
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Understand The Role of a Prime in Stock Market</title>
        <meta
          name="description"
          content="Upgrade your stock portfolio with Sovrenn prime stock. Get the latest insights and trends from Sovrenn. Invest with confidence today!"
        />

        <meta
          property="og:title"
          content="Understand The Role of a Prime in Stock Market"
        />
        <meta
          property="og:description"
          content="Upgrade your stock portfolio with Sovrenn prime stock. Get the latest insights and trends from Sovrenn. Invest with confidence today!"
        />

        <link
          rel="canonical"
          href="https://www.sovrenn.com/prime"
          key="canonical"
        />
      </Head>
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
            handleModalOpen={handleModalOpen}
            page2={page2}
            setPage2={setPage2}
            setFilterData2={setFilterData2}
          />
        )}
        <Box mt={2}>
          <Pagination
            currentPage={activeTab == "one" ? page1 : page2}
            setCurrentPage={activeTab == "one" ? setPage1 : setPage2}
            pagination={
              activeTab == "one" ? primePagination : promoterPagination
            }
          />
        </Box>
      </Container>
      <Footer/>
    </>
  );
};

export default Prime;
