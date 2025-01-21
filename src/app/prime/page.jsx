"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Button,
  Container,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import PrimeHeading from "@/components/Prime/PrimeHeading";
import PrimeFilter from "@/components/Prime/PrimeFilter";
import PromoterFilter from "@/components/Prime/PromoterFilter";
import PrimeCard from "@/components/Cards/PrimeCard";
import TableData from "@/components/Prime/TableData";
import Pagination from "@/components/Pagination/Pagination";
import Spinner from "@/components/Common/Spinner";
import ScrollCircle from "@/components/Common/ScrollCircle";

import {
  primeCompaniesListApi,
  promoterCompaniesListApi,
  togglePrimeFilter,
  togglePromoterFilter,
  primeFilterApi,
  promoterFilterApi,
} from "../Redux/Slices/primeSlice";
import { colors } from "@/components/Constants/colors";

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
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
    font-size: 16px;
    color: ${colors.navyBlue500};
  }
`;

const Prime = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));

  const [activeTab, setActiveTab] = useState("one");
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [filterData1, setFilterData1] = useState({});
  const [filterData2, setFilterData2] = useState({});
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("dec");
  const [isOpen, setIsOpen] = useState(false);
  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const {
    isPrimeCompanyListLoading,
    primeCompaniesList,
    promoterCompaniesList,
    isPrimeFilterOpen,
    isPromoterFilterOpen,
    primePagination,
    promoterPagination,
  } = useSelector((store) => store.prime);

  const isAuth = useSelector((state) => state.auth.isAuth);

  const isPrimeTab = useMemo(() => activeTab === "one", [activeTab]);
  const currentPage = isPrimeTab ? page1 : page2;
  const currentData = isPrimeTab ? primeCompaniesList : promoterCompaniesList;
  const currentPagination = isPrimeTab ? primePagination : promoterPagination;

  useEffect(() => {
    dispatch(primeFilterApi());
    dispatch(promoterFilterApi());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = () => {
      if (isPrimeTab) {
        dispatch(
          primeCompaniesListApi({
            body: filterData1,
            page: page1,
            sort_by: sortBy,
            sort_order: sortOrder,
          })
        );
      } else {
        dispatch(
          promoterCompaniesListApi({
            body: filterData2,
            page: page2,
            sort_by: sortBy,
            sort_order: sortOrder,
          })
        );
      }
    };
    fetchData();
  }, [isPrimeTab, page1, page2, filterData1, filterData2, sortBy, sortOrder, dispatch]);

  useEffect(() => {
    document.title = "Understand The Role of a Prime in Stock Market";

    const metaTags = [
      { name: "description", content: "Upgrade your stock portfolio with Sovrenn prime stock. Get the latest insights and trends from Sovrenn. Invest with confidence today!" },
      { property: "og:title", content: "Understand The Role of a Prime in Stock Market" },
      { property: "og:description", content: "Upgrade your stock portfolio with Sovrenn prime stock. Get the latest insights and trends from Sovrenn. Invest with confidence today!" },
      { rel: "canonical", href: "https://www.sovrenn.com/prime" },
    ];

    metaTags.forEach(({ name, property, rel, content, href }) => {
      const selector = name ? `meta[name="${name}"]` : property ? `meta[property="${property}"]` : `link[rel="${rel}"]`;
      let element = document.querySelector(selector);

      if (!element) {
        element = document.createElement(rel ? "link" : "meta");
        if (rel) element.setAttribute("rel", rel);
        else if (name) element.setAttribute("name", name);
        else if (property) element.setAttribute("property", property);
        document.head.appendChild(element);
      }

      if (content) element.setAttribute("content", content);
      if (href) element.setAttribute("href", href);
    });
  }, []);

  const handleToggle = () => {
    dispatch(isPrimeTab ? togglePrimeFilter() : togglePromoterFilter());
  };

  if (isPrimeCompanyListLoading) return <Spinner margin={15} />;

  return (
    <Container>
      <PrimeHeading setActiveTab={setActiveTab} />
      <Grid container justifyContent="space-between" marginTop={5}>
        <Grid item>
          <StyledButton
            variant="outlined"
            endIcon={<StyledFilterIcon />}
            onClick={handleToggle}
          >
            Filter
          </StyledButton>
        </Grid>
      </Grid>

      {isSmallerThanMd ? (
        <PrimeCard data={currentData} activeTab={activeTab} />
      ) : (
        <TableData
          data={currentData}
          activeTab={activeTab}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      )}

      {isPrimeTab ? (
        <PrimeFilter
          isOpen={isPrimeFilterOpen}
          page1={page1}
          setPage1={setPage1}
          handleModalOpen={handleModalOpen}
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

      {currentData?.length ? (
        <Box mt={2}>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={isPrimeTab ? setPage1 : setPage2}
            pagination={currentPagination}
          />
        </Box>
      ) : null}

      <ScrollCircle />
    </Container>
  );
};

export default Prime;