"use client";
import React, { useEffect, useState } from "react";
import IpoHeader from "../../components/Ipo/IpoHeader";

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

import ScrollCircle from "@/components/Common/ScrollCircle";

const Ipo = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const [windowSize, setWindowSize] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { isAuth } = useSelector((store) => store.auth);
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
  }, [page, dispatch, isAuth]);

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

  useEffect(() => {
    const title = "Get in on the Action: Find information on all upcoming IPOs";
    const ogTitle =
      "Get in on the Action: Find information on all upcoming IPOs";
    const description =
      "Discover the latest IPO opportunities. Find information on all upcoming IPOs and make informed investment decisions. Don't miss out!";
    const canonicalUrl = "https://www.sovrenn.com/ipo-zone";

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

      let metaDescriptionOg = document.querySelector(
        "meta[property='og:description']"
      );
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

  if (isIpoCompaniesListLoading) {
    return (
      <>
        <Spinner margin={15} />
      </>
    );
  };

  return (
    <>

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
      <ScrollCircle />
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
    </>
  );
};

export default Ipo;
