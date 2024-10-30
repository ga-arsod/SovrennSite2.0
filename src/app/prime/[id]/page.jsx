"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import convertToHtml from "@/utils/convertToHtml";
import styles from "../../../styles/PrimeArticle.module.css";
import Link from "next/link";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { colors } from "@/components/Constants/colors";
import { primeArticleApi, promoterArticleApi } from "@/app/Redux/Slices/primeSlice";
import { getCommentsApi } from "@/app/Redux/Slices/commentsSlice";
import styled from "@emotion/styled";
import { Box, Typography, Tab, Tabs,Divider } from "@mui/material";
import Head from "next/head";
import Spinner from "@/components/Common/Spinner";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Comments from "../../../components/Prime/Comments"
import Snackbar from "../../../components/Snackbar/SnackBar"

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
  const [isCommentsModalOpen,setIsCommentsModalOpen]=useState(false)
  const searchParams = useSearchParams();
  const search = searchParams.get('s');

  const isPromoterInterviewActive = search === 'promoter_interview';
  const { articleData, company_name,isPromoterArticleLoading,isPrimeArticleLoading } = useSelector(
    (store) => store.prime
  );
  const { comments} = useSelector(
    (store) => store.comments
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

  useEffect(()=>{
    if(articleData)
    dispatch(getCommentsApi({company_id:articleData._id, component:"prime"}))
  },[articleData,dispatch])
 

  useEffect(() => {
    const handleKeyDown = (event) => {
        if (event.ctrlKey && (event.key === 'p' || event.key === 'P')) {
            event.preventDefault();
        }
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('contextmenu', handleContextMenu);
    };
}, []);

if (isPromoterArticleLoading && isPrimeArticleLoading) {
  return (
      <>
          <Head>
              <title>{company_name}</title>

              <link
                  rel="canonical"
                  href={`https://www.sovrenn.com/prime/${id.replace('&amp;','&')}`}
                  key="canonical"
              />
          </Head>
          <Spinner margin={15} />
          
      </>
  );
};

  return (
    <>
       <Head>
                <title>{company_name}</title>

                <link
                    rel="canonical"
                    href={`https://www.sovrenn.com/prime/${id}`}
                    key="canonical"
                />
            </Head>
      <article>
        <Box sx={{ maxWidth: 915, margin: "84px auto 0px auto", padding: 2 }}>
        <Snackbar/> 
          <StyledTypography1>{company_name}</StyledTypography1>
          <CustomDivider1 sx={{ marginTop: 3, marginBottom: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
           
            <HoverBox
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={()=>{setIsCommentsModalOpen(true)}}
            >
              <ChatBubbleOutlineOutlinedIcon sx={{ marginRight: 1 }} />
              <StyledTypography2>{`${comments?.totalComments === "0"? "No" :comments?.totalComments} Comments`}</StyledTypography2>
            </HoverBox>
            
          </Box>
          <CustomDivider1 sx={{ marginTop: 1 }} />
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

          {
           articleData ? <div id={styles.MainContainer}>{convertToHtml(articleData?.content)}</div>
         
           : <></>
          }
        </Box>
      </article>
      <Comments  isCommentsModalOpen={isCommentsModalOpen} setIsCommentsModalOpen={setIsCommentsModalOpen} comments={comments} company_id={articleData._id } component="prime"/>
    </>
  );
};

export default PrimeArticles;