"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import convertToHtml from "@/utils/convertToHtml";
import styles from "../../../styles/PrimeArticle.module.css";
import { colors } from "@/components/Constants/colors";
import { primeArticleApi, promoterArticleApi } from "@/app/Redux/Slices/primeSlice";
import { getCommentsApi } from "@/app/Redux/Slices/commentsSlice";
import styled from "@emotion/styled";
import { Box, Typography, Tab, Tabs, Divider, Fade } from "@mui/material";
import Head from "next/head";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Comments from "../../../components/Prime/Comments";
import Snackbar from "../../../components/Snackbar/SnackBar";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Disclaimer from "../../../components/Common/Disclaimer";
import { primeArticleDisclaimer } from "@/utils/Data";
import NoLogin from "../../../components/Auth/NoLogin"
import NoAccess from "../../../components/Auth/NoAccess"

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

const StyledTypography2 = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.02em;
`;

const HoverBox = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${colors.neutral500};
  }
`;

const CustomDivider1 = styled(Divider)`
  background-color: ${colors.neutral600};
  height: 1px;
`;

const CustomTabs = styled(Tabs)`
  & .MuiTabs-indicator {
    height: 2px;
    background-color: ${colors.themeGreen};
    width: 100%;
  }
`;

const TabLabel = ({ text, isActive }) => {
  const words = text.split(" ");
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
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "19px",
            whiteSpace: "nowrap",
            marginRight: index === 0 ? { xs: "0.3rem", sm: "0.5rem" } : "0",
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
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const { isAuth,userDetails } = useSelector((store) => store.auth);
  const isPromoterInterviewActive = search === "promoter_interview";
  const { articleData, company_name } = useSelector((store) => store.prime);
  const { comments } = useSelector((store) => store.comments);

  const [value, setValue] = useState(isPromoterInterviewActive ? "two" : "one");
  const [showScroll, setShowScroll] = useState(false);
  const [content, setContent] = useState(null);
  const [fadeIn, setFadeIn] = useState(true);

  const handleChange = (event, newValue) => {
    setFadeIn(false);
    setTimeout(() => {
      setValue(newValue);
      setFadeIn(true);
    }, 300); 

    if (articleData && value === "one") {
      dispatch(promoterArticleApi(articleData?.pi_slug));
    }
     else if (articleData && value === "two") {
      dispatch(primeArticleApi(articleData?.prime_slug));
    }
  };

  useEffect(() => {
    if (isPromoterInterviewActive) {
      dispatch(promoterArticleApi(id));
    } else {
      dispatch(primeArticleApi(id));
    }
  }, []);

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

  useEffect(() => {
    if (articleData) {
      dispatch(getCommentsApi({ company_id: articleData._id, component: "prime" }));
      setContent(convertToHtml(articleData?.content));
    }
  }, [articleData, dispatch]);

  if(!isAuth)
    {
     return <NoLogin/>
    }
    if(isAuth && ( !userDetails?.subscriptions?.includes("full-access") || !userDetails?.subscriptions?.includes("monthly") || !userDetails?.subscriptions?.includes("quarterly") || !userDetails?.subscriptions?.includes("life") || !userDetails?.subscriptions?.includes("trial") || !userDetails?.subscriptions?.includes("basket")))
    {
      return <NoAccess/>
    }
  

  return (
    <>
      <Head>
        <title>{company_name}</title>
      </Head>
      <article>
        <Box sx={{ maxWidth: 990, margin: "84px auto 0px auto", padding: 2 }}>
          <Snackbar />
          <StyledTypography1>{company_name}</StyledTypography1>
          <CustomDivider1 sx={{ marginTop: 3, marginBottom: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <HoverBox onClick={() => setIsCommentsModalOpen(true)}>
              <ChatBubbleOutlineOutlinedIcon sx={{ marginRight: 1 }} />
              <StyledTypography2>{`${comments?.totalComments === "0" ? "No" : comments?.totalComments} Comments`}</StyledTypography2>
            </HoverBox>
          </Box>
          <CustomDivider1 sx={{ marginTop: 1 }} />

          {(value === "one" && articleData?.has_pi_data) || (value === "two" && articleData?.has_prime_data) ? (
            <Box sx={{ width: "100%", marginTop: "17px" }}>
              <CustomTabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "& .MuiTabs-flexContainer": { gap: "0px" },
                }}
              >
                <Tab
                  value="one"
                  label={<TabLabel text="Prime Articles" isActive={value === "one"} />}
                  sx={{ textTransform: "none", minWidth: "auto" }}
                />
                <Tab
                  value="two"
                  label={<TabLabel text="Promoter Interviews" isActive={value === "two"} />}
                  sx={{ textTransform: "none", minWidth: "auto" }}
                />
              </CustomTabs>
            </Box>
          ) : <></>}


            <Box
              sx={{
                opacity: content ? 1 : 0,
                transition: "visibility 0s, opacity 0.3s linear",
                minHeight: "400px",
              }}
            >
              {content && <div id={styles.MainContainer}>{content}</div>}
            </Box>
            <Disclaimer margin={3} text={primeArticleDisclaimer}  />
        </Box>
      </article>
      {articleData && (
        <Comments
          isCommentsModalOpen={isCommentsModalOpen}
          setIsCommentsModalOpen={setIsCommentsModalOpen}
          comments={comments}
          company_id={articleData._id}
          component="prime"
        />
      )}
    </>
  );
};

export default PrimeArticles;