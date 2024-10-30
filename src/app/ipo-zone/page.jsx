"use client";
import React, { useEffect ,useState} from "react";
import IpoHeader from "../../components/Ipo/IpoHeader";
import Head from "next/head";

import IpoFilters from "../../components/Ipo/IpoFilters";

import { ipoCompaniesListApi,ipoFilterApi } from "../Redux/Slices/ipoSlice";

import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import IpoCard from "../../components/Cards/IpoCard";
import IpoTableData from "../../components/Ipo/IpoTableData";

const Ipo = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const [windowSize, setWindowSize] = useState(undefined);
 
  const { ipoCompaniesList } = useSelector((store) => store.ipo);
  const { isIpoFilterOpen, } = useSelector(
    (store) => store.ipo
  );

  const handleModalOpen=()=>{
    setIsOpen(true)
  }

  useEffect(() => {
    dispatch(ipoFilterApi())
    dispatch(ipoCompaniesListApi({}));
  }, []);

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
      <IpoFilters isOpen={isIpoFilterOpen} handleModalOpen={handleModalOpen}/>
      {isSmallerThanMd ? (
        <IpoCard data={ipoCompaniesList} />
      ) : (
        <IpoTableData data={ipoCompaniesList} />
      )}
    </>
  );
};

export default Ipo;
