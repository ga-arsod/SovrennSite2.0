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

import ArticleBanner from "../../components/Times/ArticleBanner";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import moment from "moment";
import {
  timesFilterApi,
  timesPdfFilterApi,
  timesArticleApi,
  toggleArticleFilter,
  togglePdfFilter,
} from "../Redux/Slices/timesSlice";
import { useMediaQuery } from "@mui/material";
import LoginModal from "../../components/Modal/LoginModal";
import { useTheme } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/News.module.css";
import NewsDataView from "../../components/Times/NewsDataView";

import TimesHeader from "../../components/Times/TimesHeader";
import Head from "next/head";
import Spinner from "../../components/Common/Spinner";
import Footer from "@/components/Home/Footer";

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

const StyledButton = styled(Button)`
  font-weight: 600;
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
  }
`;
const StyledFilterIcon = styled(FilterAltOutlinedIcon)`
  && {
    font-size: 16px;
    color: ${colors.navyBlue500};
  }
`;
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
  const [isOpen, setIsopen] = useState(false);
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [showScroll, setShowScroll] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [groupedArticles, setGroupedArticles] = useState({});
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const dispatch = useDispatch();
  const {   isTimesArticleLoading,
    timesArticle,
    isArticleFilterOpen,
    isPdfModalOpen,
    pagination,} = useSelector(
    (store) => store.times
  );

  const handleModalOpen = () => {
    setIsopen(true);
  };
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleClose = () => {
    setIsopen(false);
  };

  const toggleDrawer = () => {
    if (activeTab === "one") {
      dispatch(toggleArticleFilter());
    } else if (activeTab === "two") {
      dispatch(togglePdfFilter());
    }
  };

  useEffect(() => {
    dispatch(timesPdfFilterApi());
    dispatch(timesFilterApi());
    dispatch(timesArticleApi({ page: page1, data: {} }));
  }, [dispatch]);
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const { isAuth, userDetails } = useSelector((store) => store.auth);

  const groupArticlesByDate = (articles) => {
    const grouped = articles.reduce((acc, item) => {
      const formattedDate = moment(item.createdAt).format("Do MMMM YYYY");
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(item);
      return acc;
    }, {});
    return grouped;
  };

  useEffect(() => {
    if (!isTimesArticleLoading) {
      setGroupedArticles(groupArticlesByDate(timesArticle));
    }
  }, [timesArticle, isTimesArticleLoading]);

  const toggleGroupCollapse = (date) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

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
  

  if (isTimesArticleLoading) {
    return (
      <>
        <Head>
          <title>Be equipped with Sovrenn times Daily Bulletin</title>
          <meta
            name="description"
            content="Stay informed with the latest news from Sovrenn times Daily Bulletin."
          />
          <meta
            property="og:title"
            content="Be equipped with Sovrenn times Daily Bulletin"
          />
          <meta
            property="og:description"
            content="Stay informed with the latest news from Sovrenn times Daily Bulletin."
          />
          <link
            rel="canonical"
            href="https://www.sovrenn.com/times"
            key="canonical"
          />
        </Head>
        <Spinner margin={15} />
      </>
    );
  }

  return (
    <>
      <LoginModal isOpen={isOpen} handleClose={handleClose} />
      <Grid container marginTop="60px" flexDirection="column">
        {!isSmallerThanMd ? (
          isAuth &&
          (userDetails?.subscriptions?.includes("full-access") ||
            userDetails?.subscriptions?.includes("life")) ? (
            ""
          ) : (
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
                  You are only reading free Sovrenn Times Monday articles. To
                  read daily Sovrenn Times articles, you need to buy a plan.
                </StyledTypography1>
                {isAuth ? (
                  <StyledButton2 variant="contained">{`Buy Full Access @ ₹${userDetails?.to_pay_for_fa}/yr`}</StyledButton2>
                ) : (
                  <StyledButton2 variant="contained">{`Buy Full Access @ ₹5000/yr`}</StyledButton2>
                )}
              </Box>
            </Grid>
          )
        ) : (
          <></>
        )}

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
          {activeTab == "two" ? (
            <ArticleBanner
              filterData2={filterData2}
              page2={page2}
              setPage2={setPage2}
            />
          ) : (
            <Grid item>
              {Object.keys(groupedArticles)?.map((date, index) => (
                <div className={styles.newsDiv} key={index}>
                  <HoverBox
                    // onClick={() => toggleArticle(index)}
                    onClick={() => toggleGroupCollapse(date)}
                    className={collapsedGroups[date] ? "collapsed" : ""}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      paddingY={0}
                      paddingX="12px"
                      alignItems="center"
                    >
                      <Grid item>
                        <StyledTypography3 className="header-text">
                          {date}
                        </StyledTypography3>
                      </Grid>
                      <Grid item>
                        <IconButton className="header-icon">
                          {collapsedGroups[date] ? (
                            <KeyboardArrowUpIcon
                              sx={{ color: colors.navyBlue900 }}
                              fontSize="large"
                            
                            />
                          ) : (
                            <KeyboardArrowDownIcon
                              sx={{ color: colors.navyBlue900 }}
                              fontSize="large"
                              
                            />
                          )}
                        </IconButton>
                      </Grid>
                    </Grid>
                  </HoverBox>
                  {!collapsedGroups[date] &&
                      groupedArticles[date].map((item, index) => (
                        <div className={styles.newsCard}>
                        <NewsDataView
                        data={{
                          company_name: item.company_name,
                          company_slug: item.company_slug,
                          content: item.content,
                        }}
                        isAuth={true}
                        discovery_route={
                          Object.keys(item.is_available_in_discovery).length ===
                          0
                            ? ""
                            : `/discovery/${item.is_available_in_discovery?.slug}/${item.company_slug}`
                        }
                        prime_route={
                          Object.keys(item.is_available_in_prime).length ===
                          0
                            ? ""
                            : `/prime/${item.is_available_in_prime?.slug}`
                        }
                      
                        />
                        </div>
                      ))}

                 
                </div>
              ))}
              {pagination?.total_pages === pagination?.page ||
              !Object.keys(timesArticle)?.length ? (
                ""
              ) : (
                <Box
                  sx={{ display: "flex", justifyContent: "center" }}
                  marginBottom={6}
                >
                  <StyledButton2
                    variant="contained"
                    onClick={() => {
                      dispatch(
                        timesArticleApi({ page: page1 + 1, data: filterData })
                      );
                      setPage1(page1 + 1);
                    }}
                  >
                    Load More
                  </StyledButton2>
                </Box>
              )}
            </Grid>
          )}
        </Container>
      </Grid>
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
      {activeTab === "one" ? (
        <TimesFilter
          isOpen={isArticleFilterOpen}
          handleModalOpen={handleModalOpen}
          page1={page1}
          setPage1={setPage1}
          setFilterData={setFilterData}
        />
      ) : activeTab === "two" ? (
        <TimesPdfFilter
          isOpen={isPdfModalOpen}
          handleModalOpen={handleModalOpen}
          page2={page2}
          setPage2={setPage2}
          setFilterData2={setFilterData2}
        />
      ) : null}
      <Footer />
    </>
  );
};

export default Times;
