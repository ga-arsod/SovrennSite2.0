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
import { primeArticleDisclaimer } from "@/utils/Data";
import { colors } from "../../components/Constants/colors";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import TimesFilter from "../../components/Common/TimesFilter";
import TimesPdfFilter from "../../components/Common/TimesPdfFilter";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSearchParams } from "next/navigation";
import ArticleBanner from "../../components/Times/ArticleBanner";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import moment from "moment";
import NoData from "@/components/NoData/NoData";
import {
  timesFilterApi,
  timesPdfFilterApi,
  timesArticleApi,
  toggleArticleFilter,
  togglePdfFilter,
} from "../Redux/Slices/timesSlice";
import { useMediaQuery } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import PaymentButton from "../../components/Common/PaymentButton";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/News.module.css";
import NewsDataView from "../../components/Times/NewsDataView";

import TimesHeader from "../../components/Times/TimesHeader";
import Head from "next/head";
import Spinner from "../../components/Common/Spinner";
import LoginModal from "../../components/Modal/LoginModal";
import Disclaimer from "@/components/Common/Disclaimer";
import Link from "next/link";
import Snackbar from "@/components/Snackbar/SnackBar";


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
    & .MuiSvgIcon-root {
      color: white;
    }
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
  const [isOpen, setIsOpen] = useState(false);
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);

  const [showScroll, setShowScroll] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [filterData2, setFilterData2] = useState({});
  const [groupedArticles, setGroupedArticles] = useState({});
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const { isAuth, userDetails } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const {
    timesArticle,
    isArticleFilterOpen,
    isPdfModalOpen,
    isTimesArticleLoading,
    isPdfListLoading,
    pagination,
  } = useSelector((store) => store.times);

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
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
    if (searchQuery)
      dispatch(
        timesArticleApi({ page: 1, data: { company_name: [searchQuery] } })
      );
    else dispatch(timesArticleApi({ page: page1, data: {} }));
  }, [isAuth, dispatch]);
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

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
      const title = "Be equipped with Sovrenn times Daily Bulletin";
      const description = "Stay informed with the latest news from Sovrenn times Daily Bulletin.";
      const canonicalUrl = "https://www.sovrenn.com/times";
  
     
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
          metaTitle.setAttribute("content", title);
        } else {
          metaTitle = document.createElement("meta");
          metaTitle.setAttribute("property", "og:title");
          metaTitle.setAttribute("content", title);
          document.head.appendChild(metaTitle);
        }
  
        let metaDescriptionOg = document.querySelector("meta[property='og:description']");
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

  return (
    <>
     
      
      <Grid container marginTop="64px" flexDirection="column">
        <Snackbar/>
        {!isSmallerThanMd ? (
          isAuth &&
          (userDetails?.subscriptions?.includes("full-access") ||
            userDetails?.subscriptions?.includes("life") ||
            userDetails?.subscriptions?.includes("trial")) ? (
            ""
          ) : (
            <Grid
              item
              paddingY={1}
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

                <Box
                 
                >
                  <PaymentButton />
                </Box>
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
            Object.keys(groupedArticles).length==0 ?   <NoData text="No data available" />
             :
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
                      <div className={styles.newsCard} key={index}>
                        <NewsDataView
                          data={{
                            company_name: item.company_name,
                            company_slug: item.company_slug,
                            content: item.content,
                          }}
                          isAuth={true}
                          discovery_route={
                            Object.keys(item.is_available_in_discovery)
                              .length === 0
                              ? ""
                              : `/discovery/${item.is_available_in_discovery?.slug}/${item.company_slug}`
                          }
                          prime_route={
                            Object.keys(item.is_available_in_prime).length === 0
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
          <Disclaimer margin={3} text={primeArticleDisclaimer} />
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
    </>
  );
};

export default Times;
