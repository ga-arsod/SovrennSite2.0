"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import convertToHtml from "@/utils/convertToHtml";
import styles from "../../../styles/PrimeArticle.module.css";
import Link from "next/link";
import { colors } from "@/components/Constants/colors";
import { primeArticleApi, promoterArticleApi } from "@/app/Redux/Slices/primeSlice";
import styled from "@emotion/styled";
import { Box, Typography, Tab, Tabs } from "@mui/material";
import Head from "next/head";

const StyledTypography1 = styled(Typography)`
  font-size: 48px;
  font-weight: 600;
  line-height: 56px;
  letter-spacing: -0.02em;
  @media (max-width: 639px) {
    font-size: 26px;
    line-height: 28px;
  }
`;

const CustomTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    height: '2px',
    backgroundColor: colors.themeGreen,
    width: '100%',
    '@media (max-width:639px)': {
      height: '2px',
    },
  },
  '& .MuiButtonBase-root.MuiTab-root:nth-of-type(2)': {
    maxWidth: 'none',
  },
}));

const TabLabel = ({ text, isActive }) => {
  const words = text.split(' ');

  return (
    <Box display="flex" alignItems="center">
      {words.map((word, index) => (
        <Typography
          key={index}
          variant="body1"
          sx={{
            color: isActive
              ? index === 0
                ? colors.navyBlue500
                : colors.themeGreen
              : colors.neutral700,
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '19px',
            whiteSpace: 'nowrap',
            marginRight: index === 0 || 1 ? { xs: '0.3rem', sm: '0.5rem' } : '0',
          }}
        >
          {word}
        </Typography>
      ))}
    </Box>
  );
};

const PrimeArticles = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const search = searchParams.get('s');

  const isPromoterInterviewActive = search === 'promoter_interview';
  const { promoterArticle, primeArticle, company_name } = useSelector(
    (store) => store.prime
  );

  const [value, setValue] = useState(isPromoterInterviewActive ? 'two' : 'one');
  const [showScroll, setShowScroll] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
   
    router.push({ query: { s: newValue === 'two' ? 'promoter_interview' : '' } });
  };

  useEffect(() => {
    if (isPromoterInterviewActive) {
      dispatch(promoterArticleApi(id));
    } else {
      dispatch(primeArticleApi(id));
    }
  }, [dispatch, id, isPromoterInterviewActive]);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 300) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 300) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <>
      <Head>
        {/* <title>{title}</title> */}
        {/* <link rel="canonical" href={`https://www.sovrenn.com/discovery/${id}/${slug}`} key="canonical" /> */}
      </Head>
      <article>
        <Box sx={{ maxWidth: 915, margin: "84px auto 0px auto", padding: 2 }}>
          <StyledTypography1>{company_name}</StyledTypography1>
          <Box sx={{ width: '100%' }} marginTop="17px">
            <Box
              sx={{
                position: 'relative',
                display: 'inline-block',
                width: '100%',
                overflowX: 'auto',
              }}
            >
              <CustomTabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
                sx={{
                  marginLeft: "0px",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '& .MuiTabs-flexContainer': {
                    gap: "10px",
                    position: 'relative',
                  },
                  '& .MuiTab-root': {
                    padding: 0,
                    minWidth: 'auto',
                    overflow: 'visible',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                  },
                }}
              >
                <Tab
                  value="one"
                  label={<TabLabel text="Prime Articles" isActive={value === 'one'} />}
                  sx={{
                    textTransform: 'none',
                    minWidth: 'auto',
                    px: 0,
                    overflow: 'visible',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                />
                <Tab
                  value="two"
                  label={<TabLabel text="Promoter Interviews" isActive={value === 'two'} />}
                  sx={{
                    textTransform: 'none',
                    minWidth: 'auto',
                    px: 0,
                    overflow: 'visible',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                />
              </CustomTabs>
            </Box>
          </Box>

          {isPromoterInterviewActive ? (
            <div id={styles.MainContainer}>{convertToHtml(promoterArticle?.content)}</div>
          ) : (
            <div id={styles.MainContainer}>{convertToHtml(primeArticle?.content)}</div>
          )}
        </Box>
      </article>
    </>
  );
};

export default PrimeArticles;