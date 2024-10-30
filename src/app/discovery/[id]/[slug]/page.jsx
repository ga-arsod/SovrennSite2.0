"use client";
import styled from "@emotion/styled";
import { Box, Typography, Divider, Grid, Chip } from "@mui/material";

import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Comments from "../../../../components/Prime/Comments";

import Head from "next/head";
import Spinner from "../../../../components/Common/Spinner";
import {
  discoveryArticleApi,
  otherBucketsCompanyPresentApi,addToWatchlistApi,removeFromWatchlistApi,isBookmarkedApi
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
import Snackbar from "../../../../components/Snackbar/SnackBar"

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
const StyledTypography3 = styled(Typography)`
  font-size: 16px;

  line-height: 19px;
  white-space: nowrap;
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
  const { id, slug } = useParams();
  const { isArticleDataLoading, articleData, otherBucketsCompanyPresent,isBookmarked} =
    useSelector((store) => store.discovery);

    const { comments, isCommentsDataLoading} =useSelector((store) => store.comments);
   

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
  } = articleData;

  const [showScroll, setShowScroll] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isCommentsModalOpen,setIsCommentsModalOpen]=useState(false)

  useEffect(() => {
    if (slug) {
      dispatch(discoveryArticleApi(slug));
      dispatch(otherBucketsCompanyPresentApi({ company_id: company_id ,component:"discovery"}));
    }
  }, [dispatch, slug]);

  useEffect(() => {
   dispatch(isBookmarkedApi({company_id:company_id}))
   setIsInWatchlist(isBookmarked);
   dispatch(getCommentsApi({company_id:company_id,component:"discovery"}))
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

  const toggleWatchlist = () => {
    setIsInWatchlist((prev) => !prev);
  };

 


  if (isArticleDataLoading  ) {
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
        <Box sx={{ maxWidth: 915, margin: "84px auto 0px auto", padding: 2 }}>
        <Snackbar/>  
          <StyledTypography1>{title}</StyledTypography1>
         
          <CustomDivider1 sx={{ marginTop: 3, marginBottom: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
           
            <HoverBox
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={()=>{setIsCommentsModalOpen(true)}}
            >
              <ChatBubbleOutlineOutlinedIcon sx={{ marginRight: 1 }} />
              <StyledTypography2>{`${comments?.totalComments === "0"? "No" :comments?.totalComments} Comments`}</StyledTypography2>
            </HoverBox>
            <WatchlistBox
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              isInWatchlist={isInWatchlist}
              onClick={()=>{toggleWatchlist()
                
               isInWatchlist ? dispatch(removeFromWatchlistApi(company_id)):dispatch(addToWatchlistApi({company_id:company_id,uptrend_potential:0,expected_price_after_1year:0})) 
              }
              }

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
                    <StyledChip label={item.title} variant="outlined" key={index} />
                    </Link>
                  </>
                );
              })}
            </Box>
            <CustomDivider2 />
            <Box sx={{display:"flex",flexDirection:{xs:"column",sm:"rows"}}}>
            <Grid
              container
              rowGap={1}
              width="60%"
              marginTop={2}
              flexDirection={{xs:"column",sm:"row"}}
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
              flexDirection={{xs:"column",sm:"row"}}
              
            >
              <Grid item xs={6} >
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
              flexDirection={{xs:"column",sm:"row"}}
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

      <Box width="915px" marginX="auto" paddingX={1} marginBottom={3}>
        <Divider sx={{ marginY: 1 }} />
        <Grid container justifyContent="flex-start">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
              gap:"12px",
              flexDirection:{xs:"column",sm:"row"}
            }}
          >
            <StyledTypography2 color="#8198AA" sx={{ cursor: "pointer" }} marginBottom={{xs:0.5,sm:0}}>
              Read More about this company
            </StyledTypography2>
            <StyledLink href="#" >
              <StyledTypography3
                color={colors.themeGreen}
                sx={{ fontWeight: "400" }}
              >
                View in Discovery
              </StyledTypography3>
            </StyledLink>
            <StyledLink href="#" >
              <StyledTypography3
                color={colors.themeGreen}
                sx={{ fontWeight: "400" }}
              >
                View in Prime
              </StyledTypography3>
            </StyledLink>
            <StyledLink href="#" >
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
      <Box sx={{display:'flex',justifyContent:'center'}}>
      <Disclaimer margin="4" text={primeArticleDisclaimer} width="915px" />
      </Box>
      <Comments  isCommentsModalOpen={isCommentsModalOpen} setIsCommentsModalOpen={setIsCommentsModalOpen} comments={comments} company_id={company_id} component="discovery"/>
    </>
  );
};

export default DiscoveryArticle;
