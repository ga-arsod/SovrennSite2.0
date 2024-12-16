"use client";
import React, { useState } from "react";
import { Grid, Container, Typography, Box } from "@mui/material";
import { colors } from "../Constants/colors";
import styled from "@emotion/styled";
import SearchBar from "../Common/SearchBar";
import EmptyWatchlist from "./EmptyWatchlist";
import WatchlistTable from "../Watchlist/WatchlistTable";
import WatchlistEditModal from "../Modal/WatchlistEditModal";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import WatchlistCard from "../Cards/WatchlistCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StyledTypography1 = styled(Typography)`
  font-size: 48px;
  font-weight: 600;
  line-height: 56px;
  letter-spacing: -0.04em;
   @media (max-width: 639px) {
    font-size: 30px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;

const WatchlistMainPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  

  return (
    <>
      {isOpen && <WatchlistEditModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      <Container>
        <Grid container justifyContent="space-between" alignItems="center" marginTop={{xs:"70px",sm:"104px"}} spacing={isSmallerThanMd ? 2 : 0}>
          <Grid item xs={12} md={6}>
            <Box marginBottom={1} display="flex" alignItems="center">
              {isSmallerThanMd && (
                <ArrowBackIcon
                  sx={{
                    fontSize: 28,
                    marginRight: { xs: 1, sm: 2 },
                    color: colors.navyBlue500,
                  }}
                />
              )}
              <StyledTypography1
                color={colors.navyBlue500}
                marginRight={1}
                component="span"
              >
                My
              </StyledTypography1>
              <StyledTypography1
                color={theme.palette.primary.main}
                component="span"
              >
                Wishlist
              </StyledTypography1>
            </Box>
          </Grid>
          {!isSmallerThanMd && (
            <Grid item md={6}>
              <SearchBar placeholder="Search for company, or date" />
            </Grid>
          )}
          {isSmallerThanMd && (
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <SearchBar placeholder="Search for company, or date" />
              </Box>
            </Grid>
          )}
        </Grid>
        {/* <EmptyWatchlist/> */}
        {isSmallerThanMd ? <WatchlistCard /> : <WatchlistTable />}
      </Container>
    </>
  );
};

export default WatchlistMainPage;