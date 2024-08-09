"use client";
import styled from "@emotion/styled";
import { Box, Typography, Divider, Grid, Chip } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Comments from "../../../../components/Prime/Comments";
import Snackbar from "../../../../components/Snackbar/SnackBar";
import Head from "next/head";
import Spinner from "../../../../components/Common/Spinner";
import { discoveryArticleApi } from "../../../Redux/Slices/discoverySlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import convertToHtml from "../../../../utils/convertToHtml";
import styles from "../../../../styles/articleHtml.module.css";
import Link from "next/link";
import { colors } from "@/components/Constants/colors";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BlurredContent from "../../../../components/Common/BlurredContent";
import Disclaimer from "../../../../components/Common/Disclaimer"
const StyledTypography1 = styled(Typography)`
  font-size: 48px;
  font-weight: 600;
  line-height: 56px;
  letter-spacing: -0.02em;
`;
const StyledTypography2 = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.02em;
`;
const StyledTypography3 = styled(Typography)`
  font-size: 16px;

  line-height: 19px;
  white-space: nowrap;
`;
const StyledLink = styled(Link)`
  color: ${colors.themeGreen};
  margin: 0 8px;
  text-decoration: none;
  font-family: '"Roboto", "Helvetica", "Arial", sans-serif';
  cursor: pointer;

  &:hover {
    color: ${colors.themeGreen};
  }
`;
const StyledChip = styled(Chip)`
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
  color: ${colors.greyBlue400};
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: #034635;
    color: white;
  }
`;
const HoverBox = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${colors.neutral500};
  }
`;

const WatchlistBox = styled(HoverBox)`
  color: ${({ isInWatchlist }) => (isInWatchlist ? colors.red500 : "inherit")};

  & .MuiSvgIcon-root,
  & .MuiTypography-root {
    color: ${({ isInWatchlist }) =>
      isInWatchlist ? colors.red500 : "inherit"};
  }
`;
const CustomDivider1 = styled(Divider)`
  background-color: ${colors.neutral600};
  border-color: none;
  border-bottom-width: 0px;
  height: 1px;
`;
const CustomDivider2 = styled(Divider)`
  background-color: ${colors.neutral500};
  border-color: none;
  border-bottom-width: 0px;
  height: 1px;
`;

const DiscoveryArticle = () => {
  const dispatch = useDispatch();
  const { id, slug } = useParams();
  const { isArticleDataLoading, articleData } = useSelector(
    (store) => store.discovery
  );
  const { content, date, title,market_cap,ttm_pe,share_price,sector,sectoral_pe_range,pe_remark} = articleData;

  const [showScroll, setShowScroll] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(discoveryArticleApi(slug));
    }
  }, [dispatch, slug]);

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

  const toggleWatchlist = () => {
    setIsInWatchlist((prev) => !prev);
  };

  if (isArticleDataLoading) {
    return (
      <>
        <Head>
          <title>{title}</title>
          <link
            rel="canonical"
            href={`https://www.sovrenn.com/discovery/${id}/${slug}`}
            key="canonical"
          />
        </Head>
        <Spinner margin={15} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="canonical"
          href={`https://www.sovrenn.com/discovery/${id}/${slug}`}
          key="canonical"
        />
      </Head>
      <article>
        <Box sx={{ maxWidth: 915, margin: "84px auto 0px auto", padding: 1 }}>
          <StyledTypography1>{title}</StyledTypography1>
          <CustomDivider1 sx={{ marginTop: 3, marginBottom: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <CalendarToday sx={{ marginRight: 1 }} />
              <StyledTypography2>
                {new Date(date).toLocaleDateString()}
              </StyledTypography2>
            </Box>
            <HoverBox
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <ChatBubbleOutlineOutlinedIcon sx={{ marginRight: 1 }} />
              <StyledTypography2>2 Comments</StyledTypography2>
            </HoverBox>
            <WatchlistBox
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              isInWatchlist={isInWatchlist}
              onClick={toggleWatchlist}
            >
              <BookmarkBorderOutlinedIcon sx={{ marginRight: 1 }} />
              <StyledTypography2>
                {isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
              </StyledTypography2>
            </WatchlistBox>
          </Box>
          <CustomDivider1 sx={{ marginTop: 1 }} />
          <Box sx={{ mb: 2, mt: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <StyledTypography2
                color={colors.greyBlue500}
                sx={{ marginRight: 1 }}
              >
                Also present in buckets:
              </StyledTypography2>
              <StyledChip
                label="Excellent Results (Dec-23)"
                variant="outlined"
              />
              <StyledChip label="Breakout" variant="outlined" />
              <StyledChip
                label="Excellent Results (Jun-24)"
                variant="outlined"
              />
            </Box>
            <CustomDivider2 />
            <Grid
              container
              justifyContent="space-between"
              width="60%"
              marginTop={2}
            >
              <Grid item xs={6}>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`Prev Close: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
                 {share_price}
                </StyledTypography3>
              </Grid>
              <Grid item xs={6}>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`Sector: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
                {sector}
                </StyledTypography3>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              marginTop={1}
              width="60%"
            >
              <Grid item xs={6}>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`Market Cap: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
                {market_cap}
                </StyledTypography3>
              </Grid>
              <Grid item xs={6}>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`TTM PE: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
               {ttm_pe}
                </StyledTypography3>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              marginTop={1}
              width="60%"
            >
              <Grid item xs={6}>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`Sectoral PE Range: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
               {sectoral_pe_range}
                </StyledTypography3>
              </Grid>
              <Grid item xs={6}>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`PE Remark: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
               {pe_remark}
                </StyledTypography3>
              </Grid>
            </Grid>
          </Box>
          <CustomDivider2 />
         
          <div id={styles.MainContainer}>{convertToHtml(content)}</div>
        </Box>
      </article>
      
      <Box width="915px" marginX="auto" paddingX={1} marginBottom={3}>
        <Divider sx={{ marginY: 1 }} />
        <Grid container justifyContent="flex-start">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <StyledTypography2 color="#8198AA" sx={{ cursor: "pointer" }}>
              Read More about this company
            </StyledTypography2>
            <StyledLink href="#" sx={{ mx: 1 }}>
              <StyledTypography3
                color={colors.themeGreen}
                sx={{ fontWeight: "400" }}
              >
                View in Discovery
              </StyledTypography3>
            </StyledLink>
            <StyledLink href="#" sx={{ mx: 1 }}>
              <StyledTypography3
                color={colors.themeGreen}
                sx={{ fontWeight: "400" }}
              >
                View in Prime
              </StyledTypography3>
            </StyledLink>
            <StyledLink href="#" sx={{ mx: 1 }}>
              <StyledTypography3
                color={colors.themeGreen}
                sx={{ fontWeight: "400" }}
              >
                View in Times
              </StyledTypography3>
            </StyledLink>
          </Box>
        </Grid>
        <Divider sx={{ marginY: 1 }} />
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
      </Box>
      <Disclaimer/>
      <Comments />
    </>
  );
};

export default DiscoveryArticle;
