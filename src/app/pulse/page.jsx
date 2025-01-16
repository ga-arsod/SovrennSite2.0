"use client";
import React, { useEffect } from "react";
import PulseIntro from "../../components/Pulse/PulseIntro";
import { Container } from "@mui/material";
import PulseArticle from "../../components/Pulse/PulseArticle";

import { useSelector } from "react-redux";
import { pulseFilterApi } from "../Redux/Slices/pulseSlice";
import { useDispatch } from "react-redux";

import { getPortfolioCompanies } from "../Redux/Slices/pulseSlice";
import Head from "next/head";

const PulsePage = () => {
  const dispatch = useDispatch();
  const { isAuth, userDetails } = useSelector((store) => store.auth);
  const { portfolioCompanies } = useSelector((store) => store.pulse);

  useEffect(() => {
    dispatch(getPortfolioCompanies());
    dispatch(pulseFilterApi());
  }, [dispatch,isAuth]);

  return (
    <>
      <Head>
        <title>Sovrenn Pulse</title>

        <link
          rel="canonical"
          href="https://www.sovrenn.com/pulse"
          key="canonical"
        />
      </Head>
      <Container>
        {!isAuth || !portfolioCompanies?.length ? (
          <PulseIntro />
        ) : (
          <PulseArticle />
        )}
      </Container>
    </>
  );
};

export default PulsePage;
