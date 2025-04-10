import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import convertToHtml from "@/utils/convertToHtml";
import styles from "../../styles/searchPrime.module.css";
import Link from "next/link";

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

const PrimeArticle = ({ data }) => {
  return (
    <Box mt={2} mb={10}>
      <StyledTypography1 color={colors.navyBlue500}>
        Prime Article
      </StyledTypography1>

      {data?.has_pi_data ? (
        <Banner my={2}>
          <StyledTypography2>
            Exclusive Promoter Interview Available!
          </StyledTypography2>
          <Link href={`/prime/${data?.pi_slug}`}>
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
          </Link>
        </Banner>
      ) : (
        <></>
      )}

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
              {data?.company_name}
            </StyledTypography1>
            <Link href={`/prime/${data?.slug}` } target="_blank">
              <StyledButton variant="contained">Read More</StyledButton>
            </Link>
          </Box>

          {data ? (
            <Box mt={2}>
              <div id={styles.MainContainer}>
                {convertToHtml(data?.content)}
              </div>
            </Box>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PrimeArticle;
