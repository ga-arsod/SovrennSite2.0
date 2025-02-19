"use client";
import React, { useState, useEffect, useRef } from "react";
import { colors } from "../../components/Constants/colors";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Typography } from "@mui/material";
import { Grid, Box, Button, Container, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import EmptySelfHelp from "../../components/SelfHelp/EmptySelfHelp";
import SelfHelpChips from "../../components/SelfHelp/SelfHelpChips";
import SelfHelpForm from "../../components/SelfHelp/SelfHelpForm";
import ExpectedResult from "../../components/SelfHelp/ExpectedResult";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import Disclaimer from "../../components/Common/Disclaimer";
import { selfHelpDisclaimer } from "@/utils/Data";
import { useSelector } from "react-redux";
import Spinner from "../../components/Common/Spinner";
import { useDispatch } from "react-redux";
import { resetCalculatedData } from "../Redux/Slices/selfHelpSlice";
import Snackbar from "../../components/Snackbar/SnackBar";
import { addToWatchlistApi } from "../Redux/Slices/discoverySlice";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NoLogin from "../../components/Auth/NoLogin";
import NoAccess from "../../components/Auth/NoAccess";
import Head from "next/head";
import Image from "next/image";
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px); 
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FadeInFormContainer = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  margin-bottom: 0;
  overflow: hidden;
  height: auto;
  animation: ${fadeIn} 0.4s ease-in-out;
`;

const StyledSelfHelpChips = styled(SelfHelpChips)`
  transition: transform 0.4s ease;
  transform: ${({ selectedChip }) =>
    selectedChip !== null ? "translateY(-10px)" : "translateY(0)"};
`;

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 44px;
  line-height: 56px;
  letter-spacing: -0.04em;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;
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

const StyledWatchIcon = styled(WatchLaterOutlinedIcon)`
  && {
    font-size: 16px;
  }
`;

const HoverContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${colors.greyBlue500};
  transition: color 0.3s;

  // &:hover {
  //   color: ${colors.themeGreen};
  // }
`;

const StickyChipsContainer = styled(Grid)`
  position: sticky;
  top: 100px;
  z-index: 10;
`;

const StyledImage = styled.div`
  display: inline-block;
  img {
    filter: grayscale(100%) brightness(0%) sepia(100%) hue-rotate(90deg)
      saturate(1000%) brightness(90%);
    transition: filter 0.3s ease;
  }
  &:hover img {
    filter: grayscale(0%) brightness(100%) sepia(100%) hue-rotate(90deg)
      saturate(300%) brightness(120%);
  }
`;
const WatchlistButton = styled(Button)(({ theme }) => ({
  borderRadius: "4px",
  textTransform: "none",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "19px",
  color: colors.navyBlue500,
  borderColor: colors.navyBlue500,
  padding: "8px 15px",

  "&:hover": {
    borderColor: colors.navyBlue500,
  },
  "&.MuiButton-contained": {
    backgroundColor: colors.themeGreen,
    color: "#fff",
    borderColor: colors.themeGreen,
  },
}));

const SelfHelp = () => {
  const dispatch = useDispatch();
  const [companyId, setCompanyId] = useState(null);
  const expectedResultRef = useRef(null);
  const [selectedChip, setSelectedChip] = useState(null);
  const router = useRouter();
  const { isCalculatedDataAvailable, isCalculationLoading } = useSelector(
    (store) => store.selfHelp
  );
  const { isAuth, userDetails } = useSelector((store) => store.auth);

  const handleChipSelect = (chip) => {
    setSelectedChip(chip);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };
  useEffect(() => {
    dispatch(resetCalculatedData());
  }, [dispatch]);
  useEffect(() => {
    if (isCalculatedDataAvailable && expectedResultRef.current) {
      expectedResultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isCalculatedDataAvailable]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleBackClick = () => {
    router.back();
  };

useEffect(() => {
   
  if (typeof window !== "undefined") {
    document.title ="Sovrenn Self Help";
    const link = document.querySelector("link[rel='canonical']");
    if (link) {
      link.href = `https://www.sovrenn.com/self-help`;
    }
  }
}, []);

  if (!isAuth) {
    return <NoLogin />;
  }
  if (
    isAuth &&
    (userDetails?.subscriptions?.includes("full-access") ||
      userDetails?.subscriptions?.includes("monthly") ||
      userDetails?.subscriptions?.includes("quarterly") ||
      userDetails?.subscriptions?.includes("life") ||
      userDetails?.subscriptions?.includes("trial"))
  ) {
    return (
      <>
        
        <Container>
          <Snackbar />
          <Grid container marginTop="60px" direction="column" marginBottom={4}>
            <Grid item paddingY={{ xs: 2, sm: 5 }}>
              <Box marginBottom={1} display="flex" alignItems="center">
                {isSmallScreen && (
                  <ArrowBackIcon
                    sx={{
                      fontSize: 28,
                      marginRight: { xs: 1, sm: 2 },
                      color: colors.navyBlue500,
                    }}
                    onClick={handleBackClick}
                  />
                )}
                <StyledTypography1
                  color={colors.navyBlue500}
                  marginRight={1}
                  component="span"
                >
                  Self Help
                </StyledTypography1>
                <StyledTypography1
                  color={theme.palette.primary.main}
                  component="span"
                >
                  Tool
                </StyledTypography1>
              </Box>
            </Grid>

            <Grid item color={colors.navyBlue900}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: { xs: "", sm: "center" },
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                 
                    <StyledTypography2
                      sx={{ whiteSpace: "nowrap" }}
                    >{`Calculate For :`}</StyledTypography2>
                 

                  
                    <StickyChipsContainer container justifyContent="center">
                      <StyledSelfHelpChips
                        onChipSelect={handleChipSelect}
                        selectedChip={selectedChip}
                        justify="start"
                      />
                    </StickyChipsContainer>
                  
                </Grid>

                <Grid
                  item
                  order={{ xs: -1, sm: 0 }}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: { xs: 2, sm: 0 },
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  <Link href="/watchlist">
                    <WatchlistButton
                      variant="outlined"
                      startIcon={<AccessTimeIcon />}
                    >
                      My Watchlist
                    </WatchlistButton>
                  </Link>
                </Grid>
              </Grid>
            </Grid>

            {selectedChip !== null && (
              <>
                <FadeInFormContainer>
                  <SelfHelpForm
                    selectedChip={selectedChip}
                    setCompanyId={setCompanyId}
                  />
                </FadeInFormContainer>

                {isCalculationLoading ? (
                  <Spinner margin={2} />
                ) : isCalculatedDataAvailable ? (
                  <Grid container justifyContent="center" marginY={3}>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      width="200px"
                    >
                      <HoverContainer
                        onClick={() => window.scrollTo({ top: 0 })}
                      >
                        <Image
                          src="/scrollupicon.png"
                          alt="Scroll Up"
                          width={30}
                          height={30}
                        />
                        <StyledTypography2>Scroll Up</StyledTypography2>
                      </HoverContainer>
                    </Grid>
                  </Grid>
                ) : (
                  <></>
                )}
              </>
            )}

            {selectedChip === null && (
              <Grid item>
                <EmptySelfHelp />
              </Grid>
            )}

            {/* {selectedChip === null && (
              <Grid
                item
                marginTop={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <StyledSelfHelpChips
                  onChipSelect={handleChipSelect}
                  selectedChip={selectedChip}
                  justify="center"
                />
              </Grid>
            )} */}

            {isCalculatedDataAvailable && (
              <Grid
                item
                marginTop={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 0,
                }}
              >
                <div ref={expectedResultRef}>
                  <ExpectedResult company_id={companyId} />
                </div>
              </Grid>
            )}

            <Grid
              item
              marginTop={0}
              marginBottom={0}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Disclaimer margin="90px" text={selfHelpDisclaimer} />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  } else return <NoAccess />;
};

export default SelfHelp;
