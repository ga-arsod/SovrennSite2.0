import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 19px;
  line-height: 23px;
  color: white;
`;

const Banner = styled(Box)`
  background: linear-gradient(45deg, #0c4340 0%, #06a77d 100%);
  box-shadow: 0px 2px 6px 0px #0000000a;

  padding: 24px 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const StyledButton2 = styled(Button)`
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding: 8px 16px;
  text-transform: none;
  background-color: white;

  :hover {
    background-color: white;
    color: ${colors.themeGreen};
  }
`;

const PrimeArticle = () => {
  return (
    <Box mt={2} mb={10}>
      <StyledTypography1 color={colors.navyBlue500}>
       Prime Article
      </StyledTypography1>

      <Banner my={2}>
        <StyledTypography2>
          Exclusive Promoter Interview Available!
        </StyledTypography2>
        <StyledButton2
          variant="outlined"
          endIcon={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
            </Box>
          }
        >
          Read Now
        </StyledButton2>
      </Banner>

      <Card elevation={0} sx={{ border: "1px solid #E0E0E0", borderRadius: 2 }}>
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

          <Typography
            variant="body2"
            color="textSecondary"
            mt={2}
            fontWeight={600}
          >
            About The Company
          </Typography>
          <Typography variant="body2" color="textSecondary" mt={1}>
            With 28 years of experience in renewable energy, KPI Green is a
            reputable solar energy firm in Gujarat...
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            mt={2}
            fontWeight={600}
          >
            Customers
          </Typography>
          <Typography variant="body2" color="textSecondary" mt={1}>
            KPI Green serves a wide range of esteemed clients, including Cadila
            Healthcare, Colourtex, Meghmani Organics...
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            mt={2}
            fontWeight={600}
          >
            Growth Prospects
          </Typography>
          <Typography variant="body2" color="textSecondary" mt={1}>
            The global renewable electricity capacity is projected to surpass
            4,800 GW by FY26...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PrimeArticle;
