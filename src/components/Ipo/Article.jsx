"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import convertToHtml from "../../utils/convertToHtml";
import styles from "../../styles/ipo.module.css";
import Link from "next/link";
import { colors } from "../Constants/colors";
import { ipoArticleApi } from "../../app/Redux/Slices/ipoSlice";
import styled from "@emotion/styled";
import { Box, Typography, Divider } from "@mui/material";
import Head from "next/head";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Disclaimer from "../Common/Disclaimer";
import { primeArticleDisclaimer } from "../../utils/Data";

import Spinner from "../../components/Common/Spinner";

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

const Articles = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { ipoArticle, isIpoArticleLoading } = useSelector((store) => store.ipo);

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    dispatch(ipoArticleApi(id));
  }, [dispatch]);

  if (isIpoArticleLoading) {
    return <Spinner margin={15} />;
  }

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

          <Box
            sx={{
              position: "fixed",
              bottom: 50,
              right: 16,
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "#CED6DC",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 3,
              cursor: "pointer",
              display: showScroll ? "flex" : "none",
            }}
            onClick={scrollTop}
          >
            <KeyboardArrowUpIcon />
          </Box>
          <Disclaimer margin={3} text={primeArticleDisclaimer} />
        </Box>
      </article>
    </>
  );
};

export default Articles;
