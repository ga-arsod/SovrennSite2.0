"use client";
import React from "react";
import styled from "@emotion/styled";
import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import { colors } from "../Constants/colors";

const tutorialArray = [
  {
    image: "/green.svg",
    description: "Identifying Potential Multibaggers",
  },
  {
    image: "/green.svg",
    description: "Price Targets, Valuation and Float Analysis",
  },
];

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  letter-spacing: -0.04em;
  @media (max-width: 700px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  @media (max-width: 700px) {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
  }
`;
const StyledTypography3 = styled(Typography)`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
`;

const TutorialSection = () => {
  return (
    <>
      <Box>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          paddingTop={4}
        >
          <Grid item>
            <Typography
              sx={{ textAlign: "center" }}
              paddingX={{ xs: 2, sm: 0 }}
            >
              <StyledTypography1
                component="span"
                marginRight={1}
                color={colors.headingColor}
              >
                Videos to help you kickstart your investing
              </StyledTypography1>
              <StyledTypography1 component="span" color={colors.themeGreen}>
                journey
              </StyledTypography1>
            </Typography>
          </Grid>
          <Grid item display="flex" justifyContent="center">
            <StyledTypography2
              textAlign="center"
              gutterBottom
              color={colors.greyBlue500}
              paddingX={{ xs: 2, sm: 0 }}
              paddingY={1}
            >
              You can understand the basics of investing with these two videos
            </StyledTypography2>
          </Grid>
          <Grid
            item
            paddingY={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              direction: { xs: "row", sm: "column" },
            }}
          >
            <Grid
              container
              padding={2}
              gap={4}
              direction={{ xs: "column", sm: "row" }}
              width={{ xs: "100%", md: "85%" }}
              justifyContent="space-between"
            >
              {tutorialArray.map((element, index) => {
                return (
                  <Grid
                    item
                    key={index}
                    sm={5.6}
                    sx={{ border: "1px solid #E4E7EC", borderRadius: "12px" }}
                  >
                    <Box sx={{ borderRadius: "12px", overflow: "hidden" }}>
                      <Image
                        src={element.image}
                        alt="..."
                        width={380}
                        height={350}
                        layout="responsive"
                      />
                    </Box>

                    <StyledTypography3
                      color="#101828"
                      marginLeft={3}
                      paddingBottom={5}
                      paddingTop={3}
                    >
                      {element.description}
                    </StyledTypography3>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default TutorialSection;
