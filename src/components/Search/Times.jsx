import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;
const StyledTypography3 = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
`;
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

const CustomDivider = styled(Divider)`
  background-color: #f8f7f7;
  border-color: none;
  border-bottom-width: 0px;
  height: 2px;
`;

const Times = () => {
  return (
    <Box mt={2} mb={5}>
      <StyledTypography1 color={colors.navyBlue500}>Times</StyledTypography1>
      <StyledTypography2 color={colors.navyBlue300} mt={1}>
        Read the 56 latest news related to KPI Green Energy Ltd.
      </StyledTypography2>

      <Card variant="outlined" sx={{ mt: 2, borderRadius: 2, p: 2 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <StyledTypography3 color={colors.navyBlue500}>
              23rd Dec 24
            </StyledTypography3>
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
          <CustomDivider sx={{ mt: 2, mb: 2 }} />

          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Recent Filing</strong> (MoU) KPI Green Energy has signed a
            Memorandum of Understanding (MoU) with the Government of Rajasthan
            for the development of Hybrid, Solar & Wind Power Projects at
            Jaisalmer (Ramgarh), Rajasthan.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Times;
