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
  Chip,
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
import LoginModal from "../../components/Modal/LoginModal";

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
  line-height: 14px;
  background: linear-gradient(90deg, #4065ac 0%, #2b4371 100%);
  color: white;

  .MuiChip-label {
    padding: 0px 12px;
  }
`;
const SearchHome = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isInPulse, setIsInPulse] = useState(false);
  const company_summary = useSelector((store) => store.search.companySummary);
  const { isAuth } = useSelector((store) => store.auth);
  const {
    discoveryData,
    timesData,
    pulseData,
    ipoData,
    primeData,
    isDiscoveryLoading,
  } = useSelector((store) => store.search);
  const { portfolioCompanies } = useSelector((store) => store.pulse);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const router = useRouter();
  const [pulseCompanies, setPulseCompanies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
  const activeTabs = allTabs.filter((tab) => tab.condition);
  
  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  const handleClose = () => {
    setIsOpen(false);
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
          dispatch(getTimesDataApi({ company_id: q, page: 1 }));
        }
        if (companyData?.data?.is_in_pulse) {
          dispatch(getPulseDataApi({ company_id: q, page: 1 }));
        }
      }
    };

    fetchData();
  }, [q, dispatch]);

  useEffect(() => {
    setIsInWatchlist(company_summary?.is_added_in_watchlist);
    setIsInPulse(company_summary?.is_added_in_pulse);
  }, [
    company_summary?.is_added_in_watchlist,
    company_summary?.is_added_in_pulse,
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = `${company_summary?.company_name}`;
    }
  }, [discoveryData, primeData, timesData, pulseData, ipoData]);

  if (isDiscoveryLoading) {
    return (
      <>
        <Spinner margin={15} />
      </>
    );
  }

  return (
    <>
      <LoginModal isOpen={isOpen} handleClose={handleClose} />
      <Container>
        <Box>
          <Snackbar />

          <Grid
            container
            marginTop={{ xs: "90px", sm: "100px" }}
            flexDirection="column"
          >
            <Grid item>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1, sm: 4 },
                  alignItems: { xs: "flex-start", sm: "center" },
                }}
              >
                <StyledTypography1 color={colors.navyBlue500}>
                  {company_summary?.company_name}
                </StyledTypography1>
                {!company_summary?.has_covered && (
                  <NotCoveredChip label="Not Covered" />
                )}
              </Grid>
            </Grid>

            {/* Summary Data */}
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
                    Prev Close:{" "}
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
                    Sector:{" "}
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
                    Industry:{" "}
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
                    Market Cap:{" "}
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
                    TTM PE:{" "}
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

            <Grid item marginTop={2}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "flex-end",
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 2,
                  paddingY: 2,
                }}
              >
                <StyledButton
                  variant="outlined"
                  startIcon={<AddIcon />}
                  sx={{
                    color: isInPulse ? colors.red500 : colors.themeGreen,
                    borderColor: isInPulse ? colors.red500 : colors.themeGreen,
                    "&:hover": {
                      borderColor: isInPulse
                        ? colors.red500
                        : colors.themeGreen,
                    },
                  }}
                  onClick={() => {
                    if (!isAuth) {
                      setIsOpen(true);
                    } else {
                      togglePulselist();
                      !isInPulse
                        ? dispatch(
                            updatePortfolioApi({
                              data: [
                                ...portfolioCompanies,
                                { _id: company_summary?._id },
                              ],
                              path: "search",
                              router,
                            })
                          )
                        : dispatch(
                            updatePortfolioApi({
                              data: portfolioCompanies.filter(
                                (c) => c._id !== company_summary?._id
                              ),
                              path: "search",
                              router,
                            })
                          );
                    }
                  }}
                >
                  {isInPulse ? "Remove from Pulse" : "Add to Pulse"}
                </StyledButton>

                <StyledButton
                  variant="outlined"
                  sx={{
                    color: isInWatchlist ? colors.red500 : colors.themeGreen,
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
                    if (!isAuth) {
                      setIsOpen(true);
                    } else {
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
                    }
                  }}
                >
                  {isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
                </StyledButton>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              position: "sticky",
              top: "85px",
              zIndex: 101,
              bgcolor: "white",
              paddingY: 1,
            }}
          >
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

          <Box sx={{ paddingY: 2 }}>
            {selectedTab === 0 ? (
              <>
                {activeTabs.map((tab, index) => (
                  <React.Fragment key={index}>{tab?.component}</React.Fragment>
                ))}
              </>
            ) : (
              activeTabs[selectedTab - 1]?.component || null
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SearchHome;
