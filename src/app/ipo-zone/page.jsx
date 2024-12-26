"use client";
import React, { useEffect, useState } from "react";
import IpoHeader from "../../components/Ipo/IpoHeader";
import Head from "next/head";

import IpoFilters from "../../components/Ipo/IpoFilters";
import Spinner from "@/components/Common/Spinner";
import { ipoCompaniesListApi, ipoFilterApi } from "../Redux/Slices/ipoSlice";
import { Box, Container } from "@mui/material";
import Pagination from "../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import IpoCard from "../../components/Cards/IpoCard";
import IpoTableData from "../../components/Ipo/IpoTableData";
import Footer from "@/components/Home/Footer";

const Ipo = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const [windowSize, setWindowSize] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [filterData, setFilterData] = useState({});
  const { ipoCompaniesList, pagination, isIpoCompaniesListLoading } =
    useSelector((store) => store.ipo);
  const { isIpoFilterOpen } = useSelector((store) => store.ipo);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(ipoFilterApi());
    dispatch(ipoCompaniesListApi({ page: page, data: filterData }));
  }, [page, dispatch]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(window.innerWidth > 920);
    }

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  if (isIpoCompaniesListLoading) {
    return (
      <>
        <Head>
          <title>
            Get in on the Action: Find information on all upcoming IPOs
          </title>
          <meta
            name="description"
            content="Discover the latest IPO opportunities. Find information on all upcoming IPOs and make informed investment decisions. Don't miss out!!"
          />

          <meta
            property="og:title"
            content="Get in on the Action: Find information on all upcoming IPOs"
          />
          <meta
            property="og:description"
            content="Discover the latest IPO opportunities. Find information on all upcoming IPOs and make informed investment decisions. Don't miss out!"
          />

          <link
            rel="canonical"
            href={`https://www.sovrenn.com/ipo-zone`}
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
        <title>
          Get in on the Action: Find information on all upcoming IPOs
        </title>
        <meta
          name="description"
          content="Discover the latest IPO opportunities. Find information on all upcoming IPOs and make informed investment decisions. Don't miss out!!"
        />

        <meta
          property="og:title"
          content="Get in on the Action: Find information on all upcoming IPOs"
        />
        <meta
          property="og:description"
          content="Discover the latest IPO opportunities. Find information on all upcoming IPOs and make informed investment decisions. Don't miss out!"
        />

        <link
          rel="canonical"
          href={`https://www.sovrenn.com/ipo-zone`}
          key="canonical"
        />
      </Head>
      <IpoHeader />
      <IpoFilters
        isOpen={isIpoFilterOpen}
        handleModalOpen={handleModalOpen}
        page={page}
        setPage={setPage}
        setFilterData={setFilterData}
      />
      {isSmallerThanMd ? (
        <IpoCard data={ipoCompaniesList} />
      ) : (
        <IpoTableData data={ipoCompaniesList} />
      )}
      <Container>
        {ipoCompaniesList?.length ? (
          <Box mt={2}>
            <Pagination
              currentPage={page}
              setCurrentPage={setPage}
              pagination={pagination}
            />
          </Box>
        ) : (
          <></>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Ipo;
