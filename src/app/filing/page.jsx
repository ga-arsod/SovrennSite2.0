"use client";
import styled from "@emotion/styled";
import {
  Grid,
  Typography,
  Box,
  useMediaQuery,
  Container,
  Button,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import { Search, FilterList, Notifications } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import React from "react";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { colors } from "../../components/Constants/colors";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FilingArticle from "../../components/Filing/FilingArticle";
import FilingIntro from "../../components/Filing/FilingIntro";
import { toggleFilingFilter } from "../Redux/Slices/filingSlice";
import { useDispatch } from "react-redux";

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

const StyledTypography2 = styled(Typography)`
  font-weight: 700;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
  @media (max-width: 639px) {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
  }
`;
const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.navyBlue500};
  padding: 6px 18px;
  text-transform: none;
  border-color: ${colors.navyBlue500};
  width: fit-content;

  &:hover {
    background-color: ${colors.navyBlue200};
    color: white;
    border-color: ${colors.navyBlue200};
    & .MuiSvgIcon-root {
      color: white;
    }
  }
`;

const StyledButton2 = styled(Button)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: "white";
  padding: 8px 16px;
  text-transform: none;
  background-color: ${colors.themeGreen};
  border-radius: 4px;
  white-space: nowrap;
`;
const StyledFilterIcon = styled(FilterAltOutlinedIcon)`
  && {
    font-size: 16px;
    color: ${colors.navyBlue500};
  }
`;
const StyledTextField = styled(TextField)`
  min-width: 220px;

  .MuiOutlinedInput-root {
    padding: 0px;
  }

  .MuiOutlinedInput-input {
    padding: 12px 14px 12px 6px;
    font-size: 10px;
    line-height: 12px;
    color: #64748b;
  }

  .MuiInputAdornment-root {
    margin-right: 2px;
  }

  input::placeholder {
    font-size: 14px;
  }
`;
const Filing = () => {
  const theme = useTheme();
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch=useDispatch()
  const [tabValue, setTabValue] = useState(0);

  const handleBackClick = () => {
    router.back();
  };

  return (
    <>
      <Container>
        <Box sx={{ marginTop: "54px" }} marginBottom={{ xs: 2, sm: "14px" }}>
          <Grid container alignItems="center">
            <Grid item paddingY={3}>
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
                  All Recent
                </StyledTypography1>
                <StyledTypography1
                  color={theme.palette.primary.main}
                  component="span"
                >
                  Filing
                </StyledTypography1>
              </Box>
              <StyledTypography2 color={colors.navyBlue300}>
                Stay Informed by Exploring Recent Company Filings Here
              </StyledTypography2>
            </Grid>
          </Grid>
        </Box>
        <Grid container flexDirection="column" gap={4}>
          <Grid item>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              indicatorColor="primary"
            >
              <Tab
                label="All Filing"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "24px",
                  color: tabValue === 0 ? colors.themeGreen : "#BAC1CC",
                }}
              />
              <Tab
                label="My Filing"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "24px",
                  color: tabValue === 1 ? colors.themeGreen : "#BAC1CC",
                }}
              />
            </Tabs>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
            }}
            gap={2}
          >
            <StyledButton
              variant="outlined"
              endIcon={<StyledFilterIcon />}
              size="small"
              sx={{
                padding: "10px 18px",
                height: "auto !important",
                minHeight: "unset !important",
              }}
               onClick={() => dispatch(toggleFilingFilter())}
            >
              Filter
            </StyledButton>
            <Box display="flex" gap={2}>
              <StyledTextField
                variant="outlined"
                placeholder="Search by words"
                size="small"
                InputProps={{
                  startAdornment: (
                    <Box display="flex" alignItems="center" marginLeft={1.5}>
                      <Search sx={{ color: "#64748B" }} />
                    </Box>
                  ),
                }}
              />
              <StyledButton2
                variant="contained"
                startIcon={<Notifications />}
                sx={{
                  backgroundColor: "#008D60",
                  textTransform: "none",
                  borderRadius: 1,
                }}
              >
                Set Alert
              </StyledButton2>
            </Box>
          </Grid>
        </Grid>
        <FilingArticle />
        {/* <FilingIntro/> */}
      </Container>
    </>
  );
};

export default Filing;
