"use client";
import React from "react";
import styled from "@emotion/styled";
import {
  Grid,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";
import { colors } from "../../components/Constants/colors";
import TableData from "../../components/Prime/TableData";
import CompanyCard from "../../components/Cards/CompanyCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PrimeCard from "../../components/Cards/PrimeCard";

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
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
`;

const StyledTypography3 = styled(Typography)`
  font-size: 16px;
  line-height: 19px;
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

const StyledArrowForwardIosIcon = styled(ArrowForwardIosIcon)`
  && {
    font-size: 12px;
    color: ${colors.navyBlue500};
  }
`;

const CompanyInfo = () => {
  const theme = useTheme();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm")); // Query for screen sizes smaller than 'sm'

  return (
    <>
      <Container>
        <Grid container marginTop={{ xs: "90px", sm: "100px" }}>
          <Grid item>
            <StyledTypography1 color={colors.navyBlue500}>
              KP Green Engineering Limited
            </StyledTypography1>
          </Grid>
          <Grid item marginTop={3}>
            <Grid container spacing={{ xs: 2, md: 4 }} direction={{ xs: "column", sm: "row" }}>
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
                  ₹506.65
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
                  Capital Goods - Electrical Equipment
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
                  Diversified
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
                  ₹2533 Cr
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
                  71.2x
                </StyledTypography3>
              </Grid>
            </Grid>
          </Grid>
          <Grid item marginTop={4} width="100%">
            <StyledTypography2>Prime Articles</StyledTypography2>
            {isSmallerThanMd ? <PrimeCard /> : <TableData />}
          </Grid>
          <Grid item width="100%">
            <StyledTypography2>Discovery</StyledTypography2>
            <CompanyCard />
          </Grid>
          <Grid item marginTop={4} width="100%">
            <StyledTypography2>Times</StyledTypography2>
            <Box
              sx={{
                paddingX: 2,
                marginY: 3,
                border: `1px solid ${colors.neutral600}`,
                borderRadius: 1,
              }}
            >
              <Grid
                container
                spacing={2}
                direction={isSmallerThanSm ? "column" : "row"} // Adjust direction based on screen size
              // Align items vertically in the center for better alignment
                paddingY={2}
              >
                <Grid item xs>
                  <StyledTypography3
                    sx={{ color: colors.navyBlue500, fontWeight: "600" }}
                  >
                    Read the 2 latest news related to KP Green Engineering Ltd.
                  </StyledTypography3>
                </Grid>
                <Grid item sx={{display:"flex",justifyContent:"flex-end"}}>
                  <StyledButton
                    variant="outlined"
                    endIcon={<StyledArrowForwardIosIcon />}
                    size="small"
                  >
                    Read
                  </StyledButton>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CompanyInfo;