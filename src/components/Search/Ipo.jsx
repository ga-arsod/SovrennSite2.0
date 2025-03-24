import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";

const StyledButton2 = styled(Button)`
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding: 8px 16px;
  text-transform: none;
  background-color: white;
  border: 1px solid ${colors.themeGreen};

  :hover {
    background-color: white;
    color: ${colors.themeGreen};
  }
`;
const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
`;

const IpoCard = () => {
  return (
    <Box>
      <StyledTypography2 color={colors.navyBlue500} my={2}>IPO</StyledTypography2>

      <Card variant="outlined" sx={{ borderRadius: 2, px: 1, py: 1.5 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" gap={5}>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                flex={1}
                maxWidth="200px"
              >
                <StyledTypography1 color={colors.themeGreen}>
                  Industry
                </StyledTypography1>
                <StyledTypography1 color={colors.neutral900}>
                  Diversified
                </StyledTypography1>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                flex={1}
                maxWidth="200px"
              >
                <StyledTypography1 color={colors.themeGreen}>
                  Listing Date:
                </StyledTypography1>
                <StyledTypography1 color={colors.neutral900}>
                  7th Oct 23{" "}
                </StyledTypography1>
              </Box>
            </Grid>

            <Grid item xs={12} display="flex" gap={5}>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                flex={1}
                maxWidth="200px"
              >
                <StyledTypography1 color={colors.themeGreen}>
                  Open Date
                </StyledTypography1>
                <StyledTypography1 color={colors.neutral900}>
                  7th Oct 23
                </StyledTypography1>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                flex={1}
                maxWidth="200px"
              >
                <StyledTypography1 color={colors.themeGreen}>
                  Offer Price PE
                </StyledTypography1>
                <StyledTypography1 color={colors.neutral900}>
                  45.5x{" "}
                </StyledTypography1>
              </Box>
            </Grid>

            <Grid item xs={12} display="flex" gap={5}>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                flex={1}
                maxWidth="200px"
              >
                <StyledTypography1 color={colors.themeGreen}>
                  Closing Date
                </StyledTypography1>
                <StyledTypography1 color={colors.neutral900}>
                  7th Oct 23
                </StyledTypography1>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                flex={1}
                maxWidth="200px"
              >
                <StyledTypography1 color={colors.themeGreen}>
                  LY Sales Growth
                </StyledTypography1>
                <StyledTypography1 color={colors.neutral900}>
                  154%{" "}
                </StyledTypography1>
              </Box>
            </Grid>
          </Grid>

          <Box mt={2}>
            <Typography variant="body1" fontWeight={600} color="#0D1B2A">
              Question 1: What are the products/services offered by the company?
            </Typography>
            <Typography variant="body2" color="#4A4A4A" mt={1}>
              With 28 years of experience in renewable energy, KPI Green is a
              reputable solar energy firm in Gujarat. They are recognized as
              Independent Power Producers (IPPs) and Captive Power Producers
              (CPPs) and operate under the "Solarism" brand. They provide a
              consistent and long-lasting supply of solar power to their
              customers thanks to their substantial land bank and excellent 312
              MW capacity. Their committed group of specialists and scientists
              work to improve the efficiency of their solar plants, making them
              a dependable and creative participant in the market.
            </Typography>
          </Box>

          {/* Question 2 */}
          <Box mt={2}>
            <Typography variant="body1" fontWeight={600} color="#0D1B2A">
              Question 2: What are the products/services offered by the company?
            </Typography>
            <Typography variant="body2" color="#4A4A4A" mt={1}>
              With 28 years of experience in renewable energy, KPI Green is a
              reputable solar energy firm in Gujarat. They are recognized as
              Independent Power Producers (IPPs) and Captive Power Producers
              (CPPs) and operate under the "Solarism" brand. They provide a
              consistent and long-lasting supply of solar power to their
              customers thanks to their substantial land bank and excellent 312
              MW capacity. Their committed group of specialists and scientists
              work to improve the efficiency of their solar plants, making them
              a dependable and creative participant in the market.
            </Typography>
          </Box>

          <Box mt={3} display="flex" justifyContent="flex-end">
            <StyledButton2
              variant="outlined"
              size="small"
              endIcon={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
                </Box>
              }
            >
              Read Full Article
            </StyledButton2>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default IpoCard;
