"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
} from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../../components/Constants/colors";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import TimesFilter from "../../components/Common/TimesFilter";
import TimesPdfFilter from "../../components/Common/TimesPdfFilter";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArticleBanner from "../../components/Times/ArticleBanner"
import moment from "moment";
import {
  timesFilterApi,
  timesPdfFilterApi,
  timesArticleApi,
  toggleArticleFilter,
  togglePdfFilter,
} from "../Redux/Slices/timesSlice";
import { useMediaQuery } from "@mui/material";
import LoginModal from "../../components/Modal/LoginModal"
import { useTheme } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/News.module.css";
import NewsDataView from "../../components/Times/NewsDataView";

import TimesHeader from "../../components/Times/TimesHeader";
import Head from "next/head";
import Spinner from "../../components/Common/Spinner";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding-top: 6px;
  padding-bottom: 6px;
  background-color: ${colors.themeGreen};
  text-transform: none;

  :hover {
    background-color: ${colors.themeButtonHover};
  }
`;

const HoverBox = styled(Box)`
  background-color: #f6f5f5;
  border-radius: 4px;
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.neutral900};

    .header-text {
      color: ${colors.white};
    }

    .header-icon {
      color: ${colors.white};
    }
  }

  &.collapsed {
    background-color: ${colors.neutral400};

    .header-text {
      color: ${colors.navyBlue900};
    }

    .header-icon {
      color: ${colors.navyBlue900};
    }

    &:hover {
      background-color: ${colors.neutral900};

      .header-text {
        color: ${colors.white};
      }

      .header-icon {
        color: ${colors.white};
      }
    }
  }
`;

const StyledButton = styled(Button)
`font-weight: 600;
font-size: 14px;
line-height: 17px;
color: ${colors.navyBlue500};
padding: 8px 16px;
text-transform: none;
border-color: ${colors.navyBlue500};
&:hover {
  background-color: ${colors.navyBlue200};
  color: white;
  border-color: ${colors.navyBlue200};
}`
;

const StyledFilterIcon = styled(FilterAltOutlinedIcon)
`&& {
  font-size: 16px;
  color: ${colors.navyBlue500};
}`
;

const StyledTypography3 = styled(Typography)`
  font-weight: 600;
  font-size: 17px;
  line-height: 23px;
  letter-spacing: -0.02em;
  color: ${colors.navyBlue900};
  @media (max-width: 639px) {
    font-size: 23px;
    line-height: 28px;
  }
`;

const Times = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("one");
 
  const dispatch = useDispatch();
  const { isTimesArticleLoading, timesArticle, isArticleFilterOpen,isPdfModalOpen } = useSelector(
    (store) => store.times
  );
  const { isAuth,userDetails } = useSelector(
    (store) => store.auth
  );

  const toggleDrawer = () => {
    if (activeTab === 'one') {
      if (!isArticleFilterOpen) {
        dispatch(toggleArticleFilter());
      }
    } else if (activeTab === 'two') {
      if (!isPdfModalOpen) {
        dispatch(togglePdfFilter());
      }
    }
  };
  const [openArticles, setOpenArticles] = useState({});

  const toggleArticle = (index) => {
    setOpenArticles((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

 
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    dispatch(timesPdfFilterApi());
    dispatch(timesFilterApi());
    dispatch(timesArticleApi({}));
  }, [dispatch]);

  useEffect(() => {
    if (timesArticle) {
      // Initialize all articles as open
      const initialOpenState = {};
      timesArticle.forEach((_, index) => {
        initialOpenState[index] = true;
      });
      setOpenArticles(initialOpenState);
    }
  }, [timesArticle]);
  

  if (isTimesArticleLoading ) {
    return (
      <>
        <Head>
          <title>Be equipped with Sovrenn times Daily Bulletin</title>
          <meta name="description" content="Stay informed with the latest news from Sovrenn times Daily Bulletin." />
          <meta property="og:title" content="Be equipped with Sovrenn times Daily Bulletin" />
          <meta property="og:description" content="Stay informed with the latest news from Sovrenn times Daily Bulletin." />
          <link rel="canonical" href="https://www.sovrenn.com/times" key="canonical" />
        </Head>
        <Spinner margin={15} />
      </>
    );
  }

  return (
    <>
     
      <Grid container marginTop="60px" flexDirection="column">
        {!isSmallerThanMd ? 
        isAuth && 
        (userDetails?.subscriptions?.includes("full-access") ||
          
           
            userDetails?.subscriptions?.includes("life") ) ?""
            :
            (
              <Grid
                item
                paddingY={1.5}
                sx={{
                  backgroundColor: "#FCE1B3",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                width="100%"
              >
                <Box
                  width="1200px"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <StyledTypography1>
                    You are only reading free Sovrenn Times Monday articles. To read daily Sovrenn Times articles, you need to buy a plan.
                  </StyledTypography1>
                  {
                    isAuth ?  <StyledButton2 variant="contained">{`Buy Full Access @ ₹${userDetails?.to_pay_for_fa}/yr`}</StyledButton2>
                    : <StyledButton2 variant="contained">{`Buy Full Access @ ₹5000/yr`}</StyledButton2>
                  }
                 
                </Box>
              </Grid>
            ) 
        :<></>
        }

        <Grid item>
          <TimesHeader setActiveTab={setActiveTab} />
        </Grid>
        <Grid item marginTop={5} marginBottom={3}>
          <Container>
            <StyledButton
              variant="outlined"
              endIcon={<StyledFilterIcon />}
              size="small"
              onClick={toggleDrawer}
            >
              Filter
            </StyledButton>
          </Container>
        </Grid>
        <Container>
          {
            activeTab=='two' ? <ArticleBanner/> :
            <Grid item >
            {timesArticle?.map((item, index) => (
              <div className={styles.newsDiv} key={index}>
                <HoverBox
                  onClick={() => toggleArticle(index)}
                  className={openArticles[index] ? "" : "collapsed"}
                >
                  <Grid container justifyContent="space-between" paddingY={0} paddingX="12px" alignItems="center">
                    <Grid item>
                      <StyledTypography3 className="header-text">
                        {moment(item.date).format("Do MMMM YYYY")}
                      </StyledTypography3>
                    </Grid>
                    <Grid item>
                      <IconButton>
                        {openArticles[index] ? (
                          <KeyboardArrowUpIcon sx={{ color: colors.navyBlue900 }} fontSize="large" className="header-icon" />
                        ) : (
                          <KeyboardArrowDownIcon sx={{ color: colors.navyBlue900 }} fontSize="large" className="header-icon" />
                        )}
                      </IconButton>
                    </Grid>
                  </Grid>
                </HoverBox>

                {openArticles[index] && (
                  <div className={styles.newsCard}>
                    <NewsDataView
                      data={{
                        company_name: item.company_name,
                        company_slug: item.company_slug,
                        content: item.content,
                      }}
                      isAuth={true}
                      discovery_route={
                        Object.keys(item.is_available_in_discovery).length === 0
                          ? ""
                          : `/discovery/${item.is_available_in_discovery?.slug}/${item.company_slug}`
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </Grid>
          }
        
        </Container>
      </Grid>

      {activeTab === "one" ? (
        <TimesFilter isOpen={isArticleFilterOpen} />
      ) : activeTab === "two" ? (
        <TimesPdfFilter isOpen={isPdfModalOpen} />
      ) : null}
    </>
  );
};

export default Times;