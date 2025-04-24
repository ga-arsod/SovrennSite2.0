"use client";
import { Box, Typography, Button, Card, CardContent, Grid } from "@mui/material";
import Image from "next/image";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors"; 
import { DoneOutlined } from "@mui/icons-material";
import Link from "next/link";

const StyledTypography1 = styled(Typography)`
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: -0.04em;
  color: #1C1C1C;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;

const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: white;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding: 12px 20px;
  text-transform: none;
  background-color: ${colors.themeGreen};

  &:hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
  }

  @media (max-width: 639px) {
    width: 100%;
    padding: 12px 0px;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
  }
`;

// Features List
const features = [
  "Unlock Premium Stock Articles – Deep analysis & expert insights to make informed investment decisions.",
  "Real-time Market Data & Alerts – Stay updated instantly.",
  "Discovery Tool – Find high-potential stocks before trends.",
  "Sovren Pulse – Get real-time updates on portfolio companies.",
  "Exclusive Promoter Interviews – Learn from industry leaders.",
  "IPO Zone – In-depth reports on upcoming IPOs.",
];

const mentorshipPoints = [
  "Personalized guidance tailored to your investing goals.",
  "Clear explanations of stock market concepts.",
  "Strategies for stock selection and portfolio building.",
  "Answers to your investing doubts & questions.",
  "Exclusive 1-on-1 mentorship sessions.",
];

const InvestmentCards = () => {
  return (
    <Grid
      container
      gap={6}
      justifyContent="center"
      paddingY="48px"
      sx={{
        backgroundImage: `url('/rectangle.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Sovren Investment Feature Section */}
      <Grid item xs={12} sm={10} paddingX={2}>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            padding: 3,
            height: "100%",
            border: "1px solid #ADADAD",
            boxShadow: "none",
          }}
        >
         
          <Box
            sx={{
              flex: 1,
              minHeight: { xs: "250px",sm: "500px", md: "100%" }, 
              position: "relative",
            }}
          >
            <Image
              src="/knowledge-test-image3.png"
              alt="Investing Feature"
              layout="fill"
              objectFit="cover"
            />
          </Box>

      
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <StyledTypography1>
              Boost Your Investing Game with Sovrenn!
            </StyledTypography1>

            {features.map((feature, index) => (
              <Box key={index} display="flex" alignItems="center" marginTop={2}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "#E8F6F5",
                    marginRight: "8px",
                    flexShrink: 0,
                  }}
                >
                  <DoneOutlined sx={{ fontSize: 22, color: colors.themeGreen }} />
                </Box>

                <Typography
                  sx={{
                    color: "#1C1C1C",
                    fontWeight: "400",
                    fontSize: "18px",
                    lineHeight: "24px",
                  }}
                >
                  {feature}
                </Typography>
              </Box>
            ))}
            <Link href="/pricing">
          
            <StyledButton1 fullWidth sx={{ mt: 3 }}>Upgrade to Sovrenn</StyledButton1>
            </Link>
          </CardContent>
        </Card>
      </Grid>

      {/* 1-on-1 Mentorship Section */}
      {/* <Grid item xs={12} sm={10} paddingX={2}>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            padding: 3,
            height: "100%",
            border: "1px solid #ADADAD",
            boxShadow: "none",
          }}
        >
         
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <StyledTypography1>
              Need Expert Guidance? Get a 1-on-1 Investment Mentor!
            </StyledTypography1>

            {mentorshipPoints.map((point, index) => (
              <Box key={index} display="flex" alignItems="center" marginTop={2}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "#E8F6F5",
                    marginRight: "8px",
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    sx={{
                      color: colors.themeGreen,
                      fontWeight: "600",
                      fontSize: "20px",
                      lineHeight: "24px",
                    }}
                  >
                    {index + 1}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    color: "#1C1C1C",
                    fontWeight: "400",
                    fontSize: "18px",
                    lineHeight: "24px",
                  }}
                >
                  {point}
                </Typography>
              </Box>
            ))}

            <StyledButton1 sx={{ mt: 3 }}>Request a Mentor Now</StyledButton1>
          </CardContent>

          
          <Box
            sx={{
              flex: 1,
              minHeight: { xs: "250px",sm: "500px", md: "100%" },
              position: "relative",
            }}
          >
            <Image
              src="/knowledge-test-image2.png"
              alt="Mentorship"
              layout="fill"
              objectFit="cover"
            />
          </Box>
        </Card>
      </Grid> */}
    </Grid>
  );
};

export default InvestmentCards;
