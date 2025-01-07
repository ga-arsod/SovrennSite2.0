"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import convertToHtml from "@/utils/convertToHtml";
import styles from "../../../styles/ipo.module.css";
import ScrollCircle from "../../../components/Common/ScrollCircle";
import { ipoArticleApi } from "@/app/Redux/Slices/ipoSlice";
import styled from "@emotion/styled";
import { Box, Typography, Divider } from "@mui/material";
import Head from "next/head";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Disclaimer from "../../../components/Common/Disclaimer";
import { primeArticleDisclaimer } from "@/utils/Data";
import Spinner from "@/components/Common/Spinner";
import Footer from "@/components/Home/Footer";
import NoLogin from "../../../components/Auth/NoLogin";
import NoAccess from "../../../components/Auth/NoAccess";

const StyledTypography1 = styled(Typography)`
  font-size: 36px;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: -0.02em;
  @media (max-width: 639px) {
    font-size: 26px;
    line-height: 28px;
  }
`;

const IpoArticles = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { ipoArticle, isIpoArticleLoading } = useSelector((store) => store.ipo);
  const { isAuth, userDetails } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(ipoArticleApi(id));
  }, [dispatch]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && (event.key === "p" || event.key === "P")) {
        event.preventDefault();
      }
    };

    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  if (!isAuth) {
    return <NoLogin />;
  }

  if (isAuth && isIpoArticleLoading) {
    return (
      <>
        <Spinner margin={15} />
      </>
    );
  }

  if (
    isAuth &&
    (userDetails?.subscriptions?.includes("full-access") ||
      userDetails?.subscriptions?.includes("monthly") ||
      userDetails?.subscriptions?.includes("quarterly") ||
      userDetails?.subscriptions?.includes("life") ||
      userDetails?.subscriptions?.includes("trial"))
  ) {
    return (
      <>
        <article>
          <Box sx={{ maxWidth: 990, margin: "84px auto 0px auto", padding: 2 }}>
            <StyledTypography1>{ipoArticle?.title}</StyledTypography1>

            {ipoArticle ? (
              <div id={styles.MainContainer}>
                {convertToHtml(ipoArticle?.content)}
              </div>
            ) : (
              <></>
            )}

            <ScrollCircle />
            <Disclaimer margin={3} text={primeArticleDisclaimer} />
          </Box>
        </article>
        <Footer />
      </>
    );
  } else return <NoAccess />;
};

export default IpoArticles;
