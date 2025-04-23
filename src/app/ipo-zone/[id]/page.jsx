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

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Disclaimer from "../../../components/Common/Disclaimer";
import { primeArticleDisclaimer } from "@/utils/Data";
import Spinner from "@/components/Common/Spinner";



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
    if (typeof window !== "undefined") {
      document.title = ipoArticle?.title;
      const link = document.querySelector("link[rel='canonical']");
      if (link) {
        link.href = `https://www.sovrenn.com/ipo-zone/${id}`;
      }
    }
  }, [ipoArticle, id]);

  

  if (isIpoArticleLoading) {
    return (
      <>
        <Spinner margin={15} />
      </>
    );
  }

  return (
    <>
      <article>
        <Box sx={{ maxWidth: 990, margin: "84px auto 0px auto", padding: 2 }}>
          <StyledTypography1 textAlign="center">
            {ipoArticle?.title}
          </StyledTypography1>

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
    </>
  );
};

export default IpoArticles;
