import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
`;

const StyledButton = styled(Button)`
  border-color: ${colors.themeGreen};
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding: 8px 16px;
  text-transform: none;
  background-color: #e6f6f2;

  :hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
`;

const Discovery = () => {
  return (
    <Box mt={2} mb={5}>
      <StyledTypography1 color={colors.navyBlue500}>
        Discovery
      </StyledTypography1>

      <Card
        elevation={0}
        sx={{ border: "1px solid #E0E0E0", borderRadius: 2, mt: 2 }}
      >
        <CardContent>
          
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <StyledTypography1
              color={colors.navyBlue500}
              sx={{ fontWeight: "700" }}
            >
              KPI Green Energy Limited
            </StyledTypography1>

            <StyledButton variant="contained">Read More</StyledButton>
          </Box>

          <Typography variant="body2" color="textSecondary" mt={2}>
            <strong>Key Growth Triggers (Till Q2FY25):</strong>
          </Typography>

          <Typography variant="body2" color="textSecondary" mt={1}>
            1. Management projects a 60% to 70% growth in topline revenue for
            FY25. In a recent NDTV interview, Management mentioned a 50-60% CAGR
            by 2030.
          </Typography>

          <Typography variant="body2" color="textSecondary" mt={1}>
            2. Company has 2.1+ GW of Orders in hand as on Sep 30, 2024, and 11+
            GW of hybrid Orders in hand as on Sep 30, 2024.
          </Typography>

          <Typography variant="body2" color="textSecondary" mt={1}>
            3. (Dec 2024) Company has received a Letter of Award (LOA) worth INR
            1300 Cr from Coal India Limited (CIL).
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Discovery;
