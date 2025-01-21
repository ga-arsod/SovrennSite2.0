"use client";
import React, { useEffect } from "react";
import PulseIntro from "../../components/Pulse/PulseIntro";
import { Container } from "@mui/material";
import PulseArticle from "../../components/Pulse/PulseArticle";

import { useSelector } from "react-redux";
import { pulseFilterApi } from "../Redux/Slices/pulseSlice";
import { useDispatch } from "react-redux";

import { getPortfolioCompanies } from "../Redux/Slices/pulseSlice";

const PulsePage = () => {
  const dispatch = useDispatch();
  const { isAuth, userDetails } = useSelector((store) => store.auth);
  const { portfolioCompanies } = useSelector((store) => store.pulse);

  useEffect(() => {
    dispatch(getPortfolioCompanies());
    dispatch(pulseFilterApi());
  }, [dispatch, isAuth]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Sovrenn Pulse";
      const link = document.querySelector("link[rel='canonical']");
      if (link) {
        link.href = `https://www.sovrenn.com/pulse`;
      }
    }
  }, []);
  return (
    <>
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
