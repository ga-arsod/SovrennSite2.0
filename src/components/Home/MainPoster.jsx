"use client";
import styled from "@emotion/styled";
import { Grid, Typography, Box, Button } from "@mui/material";
import React from "react";
import Image from "next/image";
import { useTheme } from '@mui/material/styles';

import { colors } from "../Constants/colors";
const headingsArray = [
  {
    h1: "MASTER",
    h2: "Investing",
  },
  {
    h1: "UNLOCK",
    h2: "Quality Insights",
  },
  {
    h1: "DISCOVER",
    h2: "High-Potential Stocks",
  },
];

const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top:12px;
  padding-bottom:12px;
  text-transform: none;
  background-color:white;
  width: 100%;
  :hover {
    background-color:${colors.themeButtonHover};
    color: white;
    border-color:${colors.themeButtonHover};
    outline:${colors.themeButtonHover};
  }
  @media (max-width: 639px) {
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    padding-top:12px;
  padding-bottom:12px;
  }
`;

const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top:12px;
  padding-bottom:12px;
  background-color:${colors.themeGreen};
  text-transform: none;
 
  width: 100%;
  :hover {
    background-color:${colors.themeButtonHover};
  }
  @media (max-width: 700px) {
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    padding-top:12px;
    padding-bottom:12px;
  }
`;

const StyledTypography1 = styled(Typography)`
  color:${colors.themeGreen};
  margin-right: 8px;

  @media (max-width: 700px) {
    font-size: 23px;
    font-weight: 600;
    line-height:28px;
    letter-spacing: -0.02em;
  }
  @media (min-width: 701px) and (max-width: 1120px) {
    font-size: 48px;
    font-weight: 700;
    letter-spacing: -0.04em;
  }
  @media (min-width: 1121px) {
    font-size: 48px;
    font-weight: 700;
    letter-spacing: -0.04em;
  }
`;

const StyledTyography2 = styled(Typography)`
  @media (max-width: 700px) {
    font-size: 23px;
    font-weight: 600;
    line-height:28px;
    letter-spacing: -0.02em;
  }
  @media (min-width: 701px) and (max-width: 1120px) {
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -0.04em;
  }
  @media (min-width: 1121px) {
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -0.04em;
  }
`;

const StyledTyography3 = styled(Typography)`
  @media (max-width: 1100px) {
    text-align: center;
  }
`;

const MainPoster = () => {
 const theme=useTheme();
  return (
    <Box
      width="100vw"
      sx={{
        backgroundImage: `url('/rectangle.png')`,
        backgroundSize: "cover",
      }}
      marginTop={6}
    >
      <Grid container paddingX={2} justifyContent="space-between" paddingTop={{xs:7,sm:10,lg:0}}>
        <Grid item lg={6} xs={12} sx={{ display:"flex",alignItems:"center" }}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <StyledTyography3 gutterBottom>
                <Typography
                  component="span"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    marginRight: "3px",
                    lineHeight:"19px",
                    color: "#0D1726",
                  }}
                >
                  Sovrenn helps
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontSize: "16px",
                    color: colors.themeGreen,
                    fontWeight: "400",
                    marginRight: "3px",
                  }}
                >
                  &quot;You&quot;
                </Typography>
                <Typography
                  component="span"
                  sx={{ fontSize: "16px", fontWeight: "400", color: "#0D1726" }}
                >
                  to
                </Typography>
              </StyledTyography3>

              <Box component="span">
                {headingsArray.map((element, index) => {
                  return (
                    <Box key={index}>
                      <StyledTyography3 marginTop={{xs:1,sm:0}}>
                        <StyledTypography1 variant="h6" component="span">
                          {element.h1}
                        </StyledTypography1>
                        <StyledTyography2 variant="h1" component="span">
                          {element.h2}
                        </StyledTyography2>
                      </StyledTyography3>
                    </Box>
                  );
                })}
              </Box>
              <Box sx={{textAlign:{xs:"center",lg:"start"}}} marginTop={1}>
              <Typography
            align="justify"
            wrap="wrap"
         
                component="span"
                sx={{
                  fontSize: { xs: "12px", sm: "14px" },
                  color: "#0D1726",
                  fontWeight: 400,
                  lineHeight: { xs: "14px", sm: "14px" },
                }}
              >
                So you can take informed investing decisions to build a secure
                financial future.
              </Typography>

              </Box>
           
              <Grid
                container
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ paddingTop: "12px" }}
              >
                <Grid item>
                  <StyledButton1 variant="outlined">
                    Buy Trial for 2 months @ ₹400
                  </StyledButton1>
                </Grid>
                <Grid item>
                  <StyledButton2 variant="contained">
                    Buy Full Access @ ₹5000/yr
                  </StyledButton2>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid
            container
            justifyContent="center"
            paddingTop={6}
            alignItems="center"
           sx={{
            display:"flex",
           
            position:"relative",
           }}
          >
            <Grid item  >
              <Image
                src="/hero.svg"
                width={500}
                height={636}
                alt="poster"
                layout="responsive"
              />
              
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default MainPoster;
