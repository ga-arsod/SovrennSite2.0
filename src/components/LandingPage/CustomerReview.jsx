"use client";
import React from "react";
import { Grid, Box, Typography, Rating } from "@mui/material";
import styled from "@emotion/styled";
import Image from "next/image";

const StyledTypography1 = styled(Typography)`
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: -0.02em;
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
`;
const RoundedBox = styled(Box)`
  border-radius: 16px;
  overflow: hidden; /* This ensures the content inside the box doesn't overflow the rounded corners */
  display: flex;
  justify-content: center;
  width: 100%;
`;
const ImageContainer = styled(Box)`
  height: 100%;
  position: relative;
  border-top-right-radius: 16px; /* Added this line */
  border-bottom-right-radius: 16px; /* Added this line */
  overflow: hidden; /* Added this line to ensure image respects border-radius */
`;
const CenteredGrid = styled(Grid)`
  width: 1150px;
  max-width: 100%;
  border-radius: 16px; /* Added this line */
    @media (max-width: 1024px) {
    width:100%;
  }
`;

const CustomerReview = () => {
  return (
    <>
      <RoundedBox marginBottom={12} marginX={{ xs: "16px", md: 0 }}>
        <CenteredGrid
          container
          sx={{
            backgroundColor: "#20385E",
            borderRadius: "16px",
          }}
        >
          <Grid item xs={7} padding={6}>
            <Rating
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#FEC84B",
                },
              }}
              name="half-rating-read"
              max={5}
              value={5}
              readOnly
              size="small"
            />
            <StyledTypography1 marginBottom={4} marginTop={3} color="white">
              Enabling investors to finding Needle in the Haystack through their
              newsletters. Their inputs are crisp and to the point- All meat and
              no bones! Highly recommended.
            </StyledTypography1>
            <StyledTypography2 color="white">— CM Tyagi</StyledTypography2>
          </Grid>
          <Grid item xs={5}>
            <ImageContainer>
              <Image
                src="/trial-image.png"
                layout="fill"
                objectFit="cover"
                alt="poster"
              />
            </ImageContainer>
          </Grid>
        </CenteredGrid>
      </RoundedBox>
    </>
  );
};

export default CustomerReview;