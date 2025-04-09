// "use client";
// import React, { useState, useEffect } from "react";
// import styled from "@emotion/styled";
// import { Grid, Typography, Container, Box, Button } from "@mui/material";
// import { colors } from "../../components/Constants/colors";
// import SearchTableData from "../../components/HomeSearch/SearchTableData";
// import CompanyCard from "../../components/Cards/CompanyCard";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { useMediaQuery } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import SearchPrimeCard from "../../components/Cards/SearchPrimeCard";
// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// import Head from "next/head";
// import Spinner from "@/components/Common/Spinner";
// import NoData from "../../components/NoData/NoData";
// import Link from "next/link";
// import { useSelector } from "react-redux";

// const url = process.env.NEXT_PUBLIC_API_URL;

// const StyledTypography1 = styled(Typography)`
//   font-weight: 600;
//   font-size: 48px;
//   line-height: 56px;
//   letter-spacing: -0.04em;
//   @media (max-width: 639px) {
//     font-size: 23px;
//     font-weight: 600;
//     line-height: 28px;
//     letter-spacing: -0.02em;
//   }
// `;

// const StyledTypography2 = styled(Typography)`
//   font-weight: 600;
//   font-size: 23px;
//   line-height: 28px;
//   letter-spacing: -0.02em;
// `;

// const StyledTypography3 = styled(Typography)`
//   font-size: 16px;
//   line-height: 19px;
// `;

// const StyledButton = styled(Button)`
//   font-weight: 600;
//   font-size: 14px;
//   line-height: 17px;
//   color: ${colors.navyBlue500};
//   padding: 8px 16px;
//   text-transform: none;
//   border-color: ${colors.navyBlue500};
//   &:hover {
//     background-color: ${colors.navyBlue200};
//     color: white;
//     border-color: ${colors.navyBlue200};
//   }
// `;

// const StyledArrowForwardIosIcon = styled(ArrowForwardIosIcon)`
//   && {
//     font-size: 12px;
//     color: ${colors.navyBlue500};
//   }
// `;

// const CompanyInfo = () => {
//   const theme = useTheme();
//   const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
//   const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm"));
//   const [isLoading, setIsLoading] = useState(true);
//   const { isAuth } = useSelector((store) => store.auth);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const q = searchParams.get("q");
//   const handleNavigation = () => {
//     const searchQuery = encodeURIComponent(companyData.company?.company_name || "");
//     router.push(`/times?search=${searchQuery}`);
//   };
  
//   const [companyData, setCompanyData] = useState({
//     company: {},
//     news: [],
//     prime: [],
//     discovery: [],
//     ipo: [],
//     is_ipo_company: false,
//   });
 
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalData, setModalData] = useState({
//     company_name: "",
//     sector: "",
//     industry: "",
//     one_month_return: 0,
//     one_week_return: 0,
//     price: 0,
//   });

//   useEffect(() => {
//     getCompanyData(q);

//     return () => {};
//   }, [q]);

//   const getCompanyData = async (q) => {
//     const res = await fetch(
//       `${url}/company/search/company-data/${q}`,
//       {
//         method: 'GET', 
//         headers: {
//           Authorization: isAuth ?  "Bearer " + localStorage.getItem("token") : null,
//         },
//       }
//     );

//     const data = await res.json();

//     if (res.ok) {
//       setIsLoading(false);
//       setCompanyData({
//         company: data.company,
//         news: data.news,
//         prime: data.prime,
//         discovery: data.discovery,
//         ipo: data.ipo,
//         is_ipo_company: data.is_ipo_company,
//       });
//     }
//   };

//   if (isLoading) {
//     return (
//       <>
//         <Head>
//           <title>{companyData?.company?.slug}</title>

//           <link
//             rel="canonical"
//             href="https://www.sovrenn.com/company"
//             key="canonical"
//           />
//         </Head>
//         <Spinner margin={15} />
//       </>
//     );
//   }
  
//   return (
//     <>
//       <Head>
//         <title>{companyData?.company?.company_name}</title>

//         <link
//           rel="canonical"
//           href="https://www.sovrenn.com/company"
//           key="canonical"
//         />
//       </Head>
//       <Container>
//         <Grid
//           container
//           marginTop={{ xs: "90px", sm: "100px" }}
//           flexDirection="column"
//         >
//           <Grid item>
//             <StyledTypography1 color={colors.navyBlue500}>
//               {companyData?.company?.company_name}
//             </StyledTypography1>
//           </Grid>
//           <Grid item marginTop={3}>
//             <Grid
//               container
//               spacing={{ xs: 2, md: 4 }}
//               direction={{ xs: "column", sm: "row" }}
//             >
//               <Grid item>
//                 <StyledTypography3
//                   color={colors.navyBlue500}
//                   sx={{ fontWeight: "600" }}
//                   component="span"
//                 >
//                   {`Prev Close: `}
//                 </StyledTypography3>
//                 <StyledTypography3
//                   color={colors.greyBlue500}
//                   sx={{ fontWeight: "400" }}
//                   component="span"
//                 >
//                   {companyData?.company?.share_price}
//                 </StyledTypography3>
//               </Grid>
//               <Grid item>
//                 <StyledTypography3
//                   color={colors.navyBlue500}
//                   sx={{ fontWeight: "600" }}
//                   component="span"
//                 >
//                   {`Sector: `}
//                 </StyledTypography3>
//                 <StyledTypography3
//                   color={colors.greyBlue500}
//                   sx={{ fontWeight: "400" }}
//                   component="span"
//                 >
//                   {companyData?.company?.sector}
//                 </StyledTypography3>
//               </Grid>
//               <Grid item>
//                 <StyledTypography3
//                   color={colors.navyBlue500}
//                   sx={{ fontWeight: "600" }}
//                   component="span"
//                 >
//                   {`Industry: `}
//                 </StyledTypography3>
//                 <StyledTypography3
//                   color={colors.greyBlue500}
//                   sx={{ fontWeight: "400" }}
//                   component="span"
//                 >
//                   {companyData?.company?.industry}
//                 </StyledTypography3>
//               </Grid>
//               <Grid item>
//                 <StyledTypography3
//                   color={colors.navyBlue500}
//                   sx={{ fontWeight: "600" }}
//                   component="span"
//                 >
//                   {`Market Cap: `}
//                 </StyledTypography3>
//                 <StyledTypography3
//                   color={colors.greyBlue500}
//                   sx={{ fontWeight: "400" }}
//                   component="span"
//                 >
//                   {companyData?.company?.market_cap}
//                 </StyledTypography3>
//               </Grid>
//               <Grid item>
//                 <StyledTypography3
//                   color={colors.navyBlue500}
//                   sx={{ fontWeight: "600" }}
//                   component="span"
//                 >
//                   {`TTM PE: `}
//                 </StyledTypography3>
//                 <StyledTypography3
//                   color={colors.greyBlue500}
//                   sx={{ fontWeight: "400" }}
//                   component="span"
//                 >
//                   {companyData?.company?.ttm_pe}
//                 </StyledTypography3>
//               </Grid>
//             </Grid>
//           </Grid>

//           <Grid item marginTop={4} width="100%">
//             <StyledTypography2>Prime Articles</StyledTypography2>
//             {!companyData?.prime?.length ? (
//               <NoData text="No Prime article available." />
//             ) : isSmallerThanMd ? (
//               <SearchPrimeCard data={companyData?.prime} />
//             ) : (
//               <SearchTableData data={companyData?.prime} />
//             )}
//           </Grid>

//           <Grid item width="100%" marginTop={2}>
//             <StyledTypography2>Discovery</StyledTypography2>
//             {!companyData?.discovery?.length ? (
//               <NoData text="No bucket available currently." />
//             ) : (
//               <CompanyCard
//                 data={companyData?.discovery}
//                 slug={companyData?.company?.slug}
//               />
//             )}
//           </Grid>

//           <Grid item marginTop={4} width="100%">
//             <StyledTypography2>Times</StyledTypography2>
//             {!companyData?.news?.length ? (
//               <NoData text="No Times article available." />
//             ) : (
//               <Box
//                 sx={{
//                   paddingX: 2,
//                   marginY: 3,
//                   border: `1px solid ${colors.neutral600}`,
//                   borderRadius: 1,
//                 }}
//               >
//                 <Grid
//                   container
//                   spacing={2}
//                   direction={isSmallerThanSm ? "column" : "row"}
//                   paddingY={2}
//                 >
//                   <Grid item xs>
//                     <StyledTypography3
//                       sx={{ color: colors.navyBlue500, fontWeight: "600" }}
//                     >
//                       {`Read the ${companyData?.news?.length} latest news related to ${companyData?.company?.company_name}.`}
//                     </StyledTypography3>
//                   </Grid>
//                   <Grid
//                     item
//                     sx={{ display: "flex", justifyContent: "flex-end" }}
//                   >
                   
//                       <StyledButton
//                         variant="outlined"
//                         endIcon={<StyledArrowForwardIosIcon />}
//                         size="small"
//                         onClick={handleNavigation}
//                       >
//                         Read
//                       </StyledButton>
                    
//                   </Grid>
//                 </Grid>
//               </Box>
//             )}
//           </Grid>

//           <Grid item marginTop={4} width="100%">
//             <StyledTypography2>Ipo</StyledTypography2>
//             {!companyData?.ipo?.length ? (
//               <NoData text="No IPO data available." />
//             ) : (
//               <Box
//                 sx={{
//                   paddingX: 2,
//                   marginY: 3,
//                   border: `1px solid ${colors.neutral600}`,
//                   borderRadius: 1,
//                 }}
//               >
//                 <Grid
//                   container
//                   spacing={2}
//                   direction={isSmallerThanSm ? "column" : "row"}
//                   paddingY={2}
//                 >
//                   <Grid item xs>
//                     <StyledTypography3
//                       sx={{ color: colors.navyBlue500, fontWeight: "600" }}
//                     >
//                       {`Read the IPO Article of ${companyData?.company?.company_name}.`}
//                     </StyledTypography3>
//                   </Grid>
//                   <Grid
//                     item
//                     sx={{ display: "flex", justifyContent: "flex-end" }}
//                   >
                   
//                       <StyledButton
//                         variant="outlined"
//                         endIcon={<StyledArrowForwardIosIcon />}
//                         size="small"
//                         onClick={()=>{router.push(`/ipo-zone/${companyData?.ipo[0]?.slug}`)}}
//                       >
//                         Read
//                       </StyledButton>
                    
//                   </Grid>
//                 </Grid>
//               </Box>
//             )}
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default CompanyInfo;
"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Tab,
  Tabs,
Chip
} from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "@/components/Constants/colors";
import AddIcon from "@mui/icons-material/Add";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Discovery from "../../components/Search/Discovery";
import PrimeArticle from "../../components/Search/PrimeArticle";
import Times from "../../components/Search/Times";
import Ipo from "../../components/Search/Ipo";
import Pulse from "../../components/Search/Pulse";
import {
  getCompanyDataApi,
  getDiscoveryDataApi,
  getTimesDataApi,
  getPrimeDataApi,
  getIpoDataApi,
  getPulseDataApi,
} from "../Redux/Slices/searchSlice";
import {
  addToWatchlistApi,
  removeFromWatchlistApi,
} from "../Redux/Slices/discoverySlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Snackbar from "../../components/Snackbar/SnackBar";
import { updatePortfolioApi } from "../Redux/Slices/pulseSlice";
import Spinner from "@/components/Common/Spinner";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  letter-spacing: -0.04em;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;

const StyledTypography3 = styled(Typography)`
  font-size: 16px;
  line-height: 19px;
`;

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  padding: 8px 16px;
  text-transform: none;
`;

const CustomTabs = styled(Tabs)`
  min-height: 40px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  white-space: nowrap;

  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.grey300};
    border-radius: 3px;
  }

 
  .MuiTabs-scrollButtons.Mui-disabled {
    display: none;
  }
`;


const CustomTab = styled(Tab)`
  text-transform: none;
  min-width: 0;
  margin-right: 15px;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  padding: 6px 10px;
  color: #bac1cc;
  white-space: nowrap;

  &:hover {
    color: ${colors.themeGreen};
  }

  &.Mui-selected {
    color: ${colors.themeGreen};
  }
`;

const NotCoveredChip = styled(Chip)`
  height: 22px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  line-height:14px;
  background: linear-gradient(90deg, #4065ac 0%, #2b4371 100%);
  color: white;

  .MuiChip-label {
    padding:0px 12px;
  }
`;
const SearchHome = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isInPulse, setIsInPulse] = useState(false);
  const company_summary = useSelector((store) => store.search.companySummary);
  const { discoveryData, timesData, pulseData, ipoData, primeData ,isDiscoveryLoading} =
    useSelector((store) => store.search);
  const { portfolioCompanies } = useSelector((store) => store.pulse);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const router = useRouter();
  const [pulseCompanies, setPulseCompanies] = useState([]);
  const allTabs = [
    {
      label: "Discovery",
      component: discoveryData ? <Discovery data={discoveryData} /> : null,
      condition: true,
    },
    {
      label: "Prime",
      component: primeData ? <PrimeArticle data={primeData} /> : null,
      condition: company_summary?.is_in_prime,
    },
    {
      label: "Times",
      component: timesData ? <Times data={timesData} /> : null,
      condition: company_summary?.is_in_times,
    },
    {
      label: "IPO",
      component: ipoData ? <Ipo data={ipoData} /> : null,
      condition: company_summary?.is_in_ipo,
    },
    {
      label: "Pulse",
      component: pulseData ? <Pulse data={pulseData} /> : null,
      condition: company_summary?.is_in_pulse,
    },
  ];
  const activeTabs = allTabs.filter(tab => tab.condition);
  
  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };


  const toggleWatchlist = () => {
    setIsInWatchlist((prev) => !prev);
  };
  const togglePulselist = () => {
    setIsInPulse((prev) => !prev);
  };
 
  useEffect(() => {
    const fetchData = async () => {
      const companyRes = await dispatch(getCompanyDataApi(q));
  
    
      const companyData = companyRes?.payload;
    
      if (companyData.data) {
        dispatch(getDiscoveryDataApi(q));
  
        if (companyData?.data?.is_in_prime) {
          dispatch(getPrimeDataApi(q));
        }
        if (companyData?.data?.is_in_ipo) {
          dispatch(getIpoDataApi(q));
        }
        if (companyData?.data?.is_in_times) {
          dispatch(getTimesDataApi({company_id:q,page:1}));
        }
        if (companyData?.data?.is_in_pulse) {
          dispatch(getPulseDataApi({company_id:q,page:1}));
        }
      }
    };
  
    fetchData();
  }, [q, dispatch]);
  

  useEffect(() => {
    setIsInWatchlist(company_summary?.is_added_in_watchlist);
    setIsInPulse(company_summary?.is_added_in_pulse)
  }, [company_summary?.is_added_in_watchlist,company_summary?.is_added_in_pulse]);
  
   if (isDiscoveryLoading) {
      return (
        <>
         
          <Spinner margin={15} />
        </>
      );
    }

  return (
    <>
      <Container>
        <Grid
          container
          marginTop={{ xs: "90px", sm: "100px" }}
          flexDirection="column"
        >
          <Grid>
            <Snackbar />
          </Grid>
          <Grid item sx={{display:"flex",flexDirection:{xs:"column",sm:"row"},gap:{xs:1,sm:4} ,alignItems:{xs:"flex-start",sm:"center"}}}>
            <StyledTypography1 color={colors.navyBlue500}>
              {company_summary?.company_name}
            </StyledTypography1>
            {
              !company_summary?.has_covered ?  <NotCoveredChip label="Not Covered" /> : <></>
            }
           
          </Grid>
          <Grid item marginTop={3}>
            <Grid
              container
              spacing={{ xs: 2, md: 4 }}
              direction={{ xs: "column", sm: "row" }}
            >
              <Grid item>
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
                  {company_summary?.share_price}
                </StyledTypography3>
              </Grid>
              <Grid item>
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
                  {company_summary?.sector}
                </StyledTypography3>
              </Grid>
              <Grid item>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`Industry: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
                  {company_summary?.industry}
                </StyledTypography3>
              </Grid>
              <Grid item>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`Market Cap: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
                  {company_summary?.market_cap}
                </StyledTypography3>
              </Grid>
              <Grid item>
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
                  {company_summary?.ttm_pe}
                </StyledTypography3>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Box
              sx={{
                display: "flex",
                flexDirection:{xs:"column",sm:"row"},
                justifyContent: "flex-end",
                alignItems:{xs:"flex-start",sm:"cenetr"},
                gap: 2,
                paddingY: 2,
              }}
            >
              <StyledButton
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{
                  color: isInPulse
                    ? colors.red500
                    : colors.themeGreen,
                  borderColor: isInPulse
                    ? colors.red500
                    : colors.themeGreen,
                  "&:hover": {
                    borderColor: isInPulse
                      ? colors.red500
                      : colors.themeGreen,
                  },
                }}
                onClick={() => {
                 togglePulselist();

                 !isInPulse ?
                    dispatch(updatePortfolioApi({data:[...portfolioCompanies,{_id:company_summary?._id}],path:"search",router:router}))
                    : dispatch(updatePortfolioApi({data:portfolioCompanies.filter(c => c._id !== company_summary?._id),path:"search",router:router}))
                }}
              >
               
                  {isInPulse ? "Remove from Pulse" : "Add to Pulse"}
              </StyledButton>
              <StyledButton
                variant="outlined"
                sx={{
                  color:isInWatchlist
                    ? colors.red500
                    : colors.themeGreen,
                  borderColor: isInWatchlist
                    ? colors.red500
                    : colors.themeGreen,
                  "&:hover": {
                    borderColor: isInWatchlist
                      ? colors.red500
                      : colors.themeGreen,
                  },
                }}
                startIcon={<BookmarkBorderIcon />}
                onClick={() => {
                  toggleWatchlist();

                  isInWatchlist
                    ? dispatch(removeFromWatchlistApi(q))
                    : dispatch(
                        addToWatchlistApi({
                          company_id: q,
                          uptrend_potential: 0,
                          expected_price_after_1year: 0,
                        })
                      );
                }}
              >
                {isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
              </StyledButton>
            </Box>
          </Grid>

          <Grid item width="100%">
  <Box sx={{ maxWidth: "100%", bgcolor: 'background.paper' }}>
    <CustomTabs
      value={selectedTab}
      onChange={handleTabChange}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      aria-label="scrollable force tabs example"
    >
      <CustomTab label="All" />
      {activeTabs.map((tab, index) => (
        <CustomTab key={index} label={tab.label} />
      ))}
    </CustomTabs>
  </Box>
</Grid>


{selectedTab === 0 ? (
  <>
    {activeTabs.map((tab, index) => (
      <React.Fragment key={index}>{tab.component}</React.Fragment>
    ))}
  </>
) : (
  activeTabs[selectedTab - 1]?.component || null
)}

        </Grid>
      </Container>
    </>
  );
};

export default SearchHome;

