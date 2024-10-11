"use client";
import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Box, Container,IconButton } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../../components/Constants/colors";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import TimesFilter from "../../components/Common/TimesFilter";
import TimesPdfFilter from "../../components/Common/TimesPdfFilter";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import moment from "moment";
import {
  timesFilterApi,
  timesPdfFilterApi,
  timesArticleApi,
} from "../Redux/Slices/timesSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/News.module.css";
import NewsDataView from "../../components/Times/NewsDataView";
import ArticleBanner from "../../components/Times/ArticleBanner";
import TimesHeader from "../../components/Times/TimesHeader";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
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
  background-color: #F6F5F5;
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

const StyledFilterIcon = styled(FilterAltOutlinedIcon)`
  && {
    font-size: 16px;
    color: ${colors.navyBlue500};
  }
`;

const Times = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("one");
  const dispatch = useDispatch();
  const { isTimesArticleLoading, timesArticle } = useSelector(
    (store) => store.times
  );

  const [isGridOpen, setIsGridOpen] = useState(true);

  const handleToggle = () => {
    setIsGridOpen(!isGridOpen);
  };

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  useEffect(() => {
    dispatch(timesPdfFilterApi());

    dispatch(timesFilterApi());

    dispatch(timesArticleApi({}));
  }, []);
  console.log(activeTab, "active tab");
  return (
    <>
      <Grid container marginTop="60px" flexDirection="column">
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
              You are only reading free Sovrenn Times Monday articles. To read
              daily Sovrenn Times articles, you need to buy a plan.
            </StyledTypography1>
            <StyledButton2 variant="contained">
              Buy Full Access @ ₹5000/yr
            </StyledButton2>
          </Box>
        </Grid>
        <Grid item>
          <TimesHeader setActiveTab={setActiveTab} />
        </Grid>
        <Grid item marginTop={5} marginBottom={3}>
          <Container>
            <StyledButton
              variant="outlined"
              endIcon={<StyledFilterIcon />}
              size="small"
              onClick={toggleDrawer(true)}
            >
              Filter
            </StyledButton>
          </Container>
        </Grid>
        <Container>
          {activeTab == "two" ? (
            <Grid item>
              <ArticleBanner />
            </Grid>
          ) : (
            <Grid item>
              {timesArticle.map((item, index) => {
                return (
                  <div className={styles.newsDiv} key={index}>
                    <HoverBox onClick={handleToggle} className={isGridOpen ? "" : "collapsed"}>
        <Grid container justifyContent="space-between" paddingY={0} paddingX="12px" alignItems="center">
          <Grid item>
            <StyledTypography3 className="header-text">{moment(item.date).format("Do MMMM YYYY")}</StyledTypography3>
          </Grid>
          <Grid item>
            <IconButton>
              {isGridOpen ? (
                <KeyboardArrowUpIcon
                  sx={{ color: colors.navyBlue900 }}
                  fontSize="large"
                  className="header-icon"
                />
              ) : (
                <KeyboardArrowDownIcon
                  sx={{ color: colors.navyBlue900 }}
                  fontSize="large"
                  className="header-icon"
                />
              )}
            </IconButton>
          </Grid>
        </Grid>
      </HoverBox>

                    <div className={styles.newsCard} key={index}>
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
                        // prime_route={ele?.primes?.length ? `/prime/${ele?.primes[0].slug}` : ""}
                      />
                    </div>
                  </div>
                );
              })}
            </Grid>
          )}
        </Container>
      </Grid>

      {activeTab == "one" ? (
        <TimesFilter isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : activeTab == "two" ? (
        <TimesPdfFilter isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        ""
      )}
    </>
  );
};

export default Times;
