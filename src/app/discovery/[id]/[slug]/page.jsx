"use client";
import styled from "@emotion/styled";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Chip,
  Container,
  IconButton,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Comments from "../../../../components/Prime/Comments";

import Spinner from "../../../../components/Common/Spinner";
import {
  discoveryArticleApi,
  otherBucketsCompanyPresentApi,
  addToWatchlistApi,
  removeFromWatchlistApi,
  isBookmarkedApi,
} from "../../../Redux/Slices/discoverySlice";
import { getCommentsApi } from "@/app/Redux/Slices/commentsSlice";
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
import Disclaimer from "../../../../components/Common/Disclaimer";
import { primeArticleDisclaimer } from "@/utils/Data";
import Snackbar from "../../../../components/Snackbar/SnackBar";
import NoLogin from "../../../../components/Auth/NoLogin";
import NoAccess from "../../../../components/Auth/NoAccess";
import ScrollCircle from "@/components/Common/ScrollCircle";
import { useRouter } from "next/navigation";
import ArticleNavigation from "../../../../components/Common/ArticleNavigation";
import { ArrowForward, ArrowBack } from "@mui/icons-material";

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
  white-space: nowrap;
`;
const StyledTypography3 = styled(Typography)`
  font-size: 16px;

  line-height: 19px;
  white-space: nowrap;
  @media (max-width: 639px) {
    font-size: 14px;
  }
`;
const StyledLink = styled(Link)`
  color: ${colors.themeGreen};

  text-decoration: none;
  font-family: '"Inter", "Helvetica", "Arial", sans-serif';
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
  font-family: Inter, sans-serif;
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
  const router = useRouter();
  const theme=useTheme();
  const isGreaterThanSm = useMediaQuery(theme.breakpoints.up("md"));
  const { id, slug } = useParams();
  const companyData = JSON.parse(localStorage.getItem("discoveryTableData"));
  const [slug2, setSlug2] = useState(decodeURIComponent(slug));
  const [currentIndex, setCurrentIndex] = useState(
    companyData?.findIndex((article) => article.slug == decodeURIComponent(slug))
  );

  const handleNavigation = (direction) => {
    const currentIndex = companyData?.findIndex(
      (article) => article.slug === slug2
    );

    if (direction === "next" && currentIndex < companyData.length - 1) {
      setSlug2(companyData[currentIndex + 1].slug);
    } else if (direction === "prev" && currentIndex > 0) {
      setSlug2(companyData[currentIndex - 1].slug);
    }
  };
  const {
    isArticleDataLoading,
    articleData,
    otherBucketsCompanyPresent,
    isBookmarked,
  } = useSelector((store) => store.discovery);

  const { comments, isCommentsDataLoading } = useSelector(
    (store) => store.comments
  );
  const { isAuth, userDetails } = useSelector((store) => store.auth);

  const {
    content,
    date,
    title,
    market_cap,
    ttm_pe,
    share_price,
    sector,
    sectoral_pe_range,
    pe_remark,
    company_id,
    is_available_in_prime,
    is_available_in_times,
  } = articleData;

  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);

  useEffect(() => {
    if (company_id != "") {
      dispatch(
        otherBucketsCompanyPresentApi({
          company_id: company_id,
          component: "discovery",
        })
      );
    }
  }, [company_id]);

  useEffect(() => {
    if (slug2 && isAuth) dispatch(discoveryArticleApi(slug2));
  }, [slug2]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = title;
      const link = document.querySelector("link[rel='canonical']");
      if (link) {
        link.href = `https://www.sovrenn.com/discovery/${id}/${slug}`;
      }
    }
  }, [isAuth, isArticleDataLoading]);

  useEffect(() => {
    const fetchData = async () => {
      if (company_id !== "") {
        await dispatch(isBookmarkedApi({ company_id }));

        if (isBookmarked !== undefined) {
          setIsInWatchlist(isBookmarked);
        }

        dispatch(getCommentsApi({ company_id, component: "discovery" }));
      }
    };

    fetchData();
  }, [dispatch, company_id, isBookmarked]);

  useEffect(() => {
    const index = companyData?.findIndex((article) => article.slug === slug2);
    setCurrentIndex(index);
  }, [slug2, companyData]);

  const toggleWatchlist = () => {
    setIsInWatchlist((prev) => !prev);
  };

  if (!isAuth) {
    return <NoLogin />;
  }
  
  

  if (
    isAuth &&
    (userDetails?.subscriptions?.includes("full-access") ||
      userDetails?.subscriptions?.includes("monthly") ||
      userDetails?.subscriptions?.includes("quarterly") ||
      userDetails?.subscriptions?.includes("life") ||
      userDetails?.subscriptions?.includes("trial") ||
      userDetails?.subscriptions?.includes("basket"))
  ) {
    return (
      <>
        <article>
          <Box sx={{ maxWidth: 915, margin: "84px auto 0px auto", padding: 2 }}>
            <Snackbar />
            <StyledTypography1>{title}</StyledTypography1>

            <CustomDivider1 sx={{ marginTop: 3, marginBottom: 1 }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <HoverBox
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setIsCommentsModalOpen(true);
                }}
              >
                <ChatBubbleOutlineOutlinedIcon sx={{ marginRight: 1 }} />
                <StyledTypography2>{`${
                  comments?.totalComments === "0"
                    ? "No"
                    : comments?.totalComments
                } Comments`}</StyledTypography2>
              </HoverBox>
              <WatchlistBox
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                isInWatchlist={isInWatchlist}
                onClick={() => {
                  toggleWatchlist();

                  isInWatchlist
                    ? dispatch(removeFromWatchlistApi(company_id))
                    : dispatch(
                        addToWatchlistApi({
                          company_id: company_id,
                          uptrend_potential: 0,
                          expected_price_after_1year: 0,
                        })
                      );
                }}
              >
                <BookmarkBorderOutlinedIcon sx={{ marginRight: 1 }} />
                <StyledTypography2>
                  {isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
                </StyledTypography2>
              </WatchlistBox>
            </Box>
            <CustomDivider1 sx={{ marginTop: 1 }} />
            <Box sx={{ mb: 2, mt: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                  flexWrap: "wrap",
                }}
              >
                <StyledTypography2
                  color={colors.greyBlue500}
                  sx={{ marginRight: 1, whiteSpace: "nowrap" }}
                >
                  Also present in buckets:
                </StyledTypography2>
                {otherBucketsCompanyPresent?.map((item, index) => {
                  return (
                    <>
                      <Link href={`/discovery/${item.slug}`}>
                        <StyledChip
                          label={item.title}
                          variant="outlined"
                          key={index}
                        />
                      </Link>
                    </>
                  );
                })}
              </Box>
              <CustomDivider2 />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "rows" },
                }}
              >
                <Grid
                  container
                  rowGap={1}
                  width="60%"
                  marginTop={2}
                  flexDirection={{ xs: "column", sm: "row" }}
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
                  rowGap={1}
                  marginTop={1}
                  width="60%"
                  flexDirection={{ xs: "column", sm: "row" }}
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
                  rowGap={1}
                  flexDirection={{ xs: "column", sm: "row" }}
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
            </Box>
            <CustomDivider2 />

            <div id={styles.MainContainer}>{convertToHtml(content)}</div>
          </Box>
        </article>

        {(is_available_in_prime &&
          Object.keys(is_available_in_prime)?.length) ||
        (is_available_in_times &&
          Object.keys(is_available_in_times)?.length) ? (
          <Box
            width={{ maxWidth: 915 }}
            marginX="auto"
            paddingX={1}
            marginBottom={3}
          >
            <Divider sx={{ marginY: 1 }} />
            <Grid container justifyContent="flex-start">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  gap: "12px",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <StyledTypography2
                  color="#8198AA"
                  sx={{ cursor: "pointer" }}
                  marginBottom={{ xs: 0.5, sm: 0 }}
                >
                  Read More about this company
                </StyledTypography2>

                {is_available_in_prime &&
                Object.keys(is_available_in_prime)?.length ? (
                  <StyledTypography3
                    color={colors.themeGreen}
                    sx={{ fontWeight: "400" }}
                    onClick={() => {
                      router.push(`/prime/${is_available_in_prime?.slug}`);
                    }}
                  >
                    View in Prime
                  </StyledTypography3>
                ) : (
                  <></>
                )}

                {is_available_in_times &&
                Object.keys(is_available_in_times)?.length ? (
                  <StyledTypography3
                    color={colors.themeGreen}
                    sx={{ fontWeight: "400" }}
                    onClick={() => {
                      const searchQuery = encodeURIComponent(
                        is_available_in_times?.company_name || ""
                      );
                      router.push(`/times?search=${searchQuery}`);
                    }}
                  >
                    View in Times
                  </StyledTypography3>
                ) : (
                  <></>
                )}
              </Box>
            </Grid>
            <Divider sx={{ marginY: 1 }} />
           
          </Box>
        ) : (
          <></>
        )}
       {
        isGreaterThanSm ?  <div
        style={{
          position: "fixed",
          right: "10px",
          bottom: "10%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
      
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{
              border:`1px solid ${currentIndex === companyData?.length - 1 ? "#DEDDDD" : colors.themeGreen}`,
              backgroundColor: "white",
              color:`${currentIndex === companyData?.length - 1 ? "#DEDDDD" : colors.themeGreen}`,
              width: 42,
              height: 42,
              boxShadow:"0px 12px 24px 0px #0000001A",

              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
            onClick={() => handleNavigation("next")}
            disabled={currentIndex === companyData?.length - 1}
          >
            <ArrowForward />
          </IconButton>
          <Typography
            sx={{ color:`${currentIndex === companyData?.length - 1 ? "#DEDDDD" : "#ADADAD"}`, fontSize: 14, marginTop: "5px" }}
          >
            Next Article
          </Typography>
        </div>

      
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{
              border: `1px solid ${currentIndex === 0 ? "#DEDDDD" : colors.themeGreen}`,
              backgroundColor:"white",
              color:`${currentIndex === 0 ? "#DEDDDD" : colors.themeGreen}`,
              width: 42,
              height: 42,
              boxShadow:"0px 12px 24px 0px #0000001A",
            }}
            onClick={() => handleNavigation("prev")}
            disabled={currentIndex === 0}
          >
            <ArrowBack />
          </IconButton>
          <Typography
            sx={{ color:`${currentIndex == 0 ? "#DEDDDD" : "#ADADAD"}`, fontSize: 14, marginTop: "5px" }}
          >
            Previous Article
          </Typography>
        </div>
      </div> : <></>
       }
            <ScrollCircle />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Container>
            <Grid container justifyContent="center">
              <Grid
                item
                marginTop={0}
                marginBottom={0}
                sx={{ display: "flex", justifyContent: "center" }}
                width="910px"
              >
                <Disclaimer margin="4" text={primeArticleDisclaimer} />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Comments
          isCommentsModalOpen={isCommentsModalOpen}
          setIsCommentsModalOpen={setIsCommentsModalOpen}
          comments={comments}
          company_id={company_id}
          component="discovery"
        />
      </>
    );
  } else return <NoAccess />;
};

export default DiscoveryArticle;
