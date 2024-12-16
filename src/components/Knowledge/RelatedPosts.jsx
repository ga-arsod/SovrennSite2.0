"use client";

import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  IconButton,
  Button,
  useTheme,
  useMediaQuery, // Import useMediaQuery
  Container,
  Divider,
} from "@mui/material";
import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import moment from "moment";
import Link from "next/link";
import { colors } from "../Constants/colors";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const StyledTypographyDate = styled(Typography)`
  font-weight: 600;
  font-size: 12px;
  color: ${colors.greyBlue500};
`;

const StyledTypographyTitle = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  margin: 8px 0;
  color: #101828;
`;

const StyledTypographyCategory = styled(Typography)`
  font-size: 10px;
  line-height: 12px;
  color: ${colors.green900};
  font-weight: 600;
  padding: 4px 8px;
  background-color: ${colors.green50};
  border-radius: 4px;
  display: inline-block;
`;

const StyledIconButton = styled(IconButton)`
  border: 1px solid ${colors.grey500};
  border-radius: 50%;
  padding: 2px;
`;

const StyledButton = styled(Button)`
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  text-transform: none;
  color: ${colors.navyBlue500};
`;

const CustomIconButton = styled(IconButton)`
  padding: 0;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #b0b7bc;
  border-radius: 50%;
  background-color: ${colors.white};
  transition: background-color 0.3s, border-color 0.3s, transform 0.3s;

  .arrow-icon {
    color: #3c464f;
    font-size: 16px;
  }
`;

const CustomDivider = styled(Divider)`
  background-color: #dedddd;
  border-color: none;
  border-bottom-width: 0px;
  height: 1px;
`;
const StyledCard = styled(Box)`
  max-width: 678px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  height: 180px; 
  display: flex;
  flex-direction: column;
  justify-content: space-between; 

  &:hover {
    .custom-icon-button {
      background-color: ${colors.themeGreen};
      border-color: ${colors.navyBlue900};
      transform: rotate(-45deg);

      .arrow-icon {
        color: ${colors.white};
        font-size: 14px;
      }
    }
  }
`;

const RelatedPosts = ({ posts }) => {
  console.log(posts,"posts")
  const theme = useTheme();
  const [showScroll, setShowScroll] = useState(false);

  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.down("md"));
  const isMd = useMediaQuery(theme.breakpoints.up("sm"));

  const [currentIndex, setCurrentIndex] = useState(0);

  const visiblePosts = isXs ? 1 : isSm ? 2 : 3;

  const slidesCount = Math.ceil(posts.length / visiblePosts);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesCount);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slidesCount - 1 : prevIndex - 1
    );
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [posts.length]);

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          maxWidth: "990px",
          margin: "0 auto",
          overflowX: "hidden",
        }}
      >
        <Box sx={{ marginTop:{xs:0,md:3}, marginBottom: 2 }}>
          <CustomDivider />
        </Box>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between" }}
          marginBottom={1}
          marginTop={2}
        >
          <Grid item>
            <Typography
              color="#8198AA"
              sx={{ fontWeight: "600", fontSize: "16px", lineHeight: "19px" }}
            >
              Related Posts
            </Typography>
          </Grid>
          <Grid item sx={{ display: "flex", gap: 1 }}>
            <StyledIconButton onClick={prevSlide}>
              <ArrowBackIcon
                sx={{ color: colors.navyBlue500, fontSize: 28, }}
              />
            </StyledIconButton>
            <StyledIconButton onClick={nextSlide}>
              <ArrowForwardIcon
                sx={{ color: colors.navyBlue500, fontSize: "16px" }}
              />
            </StyledIconButton>
          </Grid>
        </Grid>

        <Grid
          container
          marginBottom={1}
          spacing={2}
          sx={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          {posts?.map((ele, index) => (
            <Grid
              item
              key={index}
              sx={{
                flex: {
                  xs: "0 0 100%",
                  sm: "0 0 50%",
                  md: "0 0 33.33%",
                },
                maxWidth: {
                  xs: "100%",
                  sm: "50%",
                  md: "33.33%",
                },
              }}
            >
              <Link
                target="_blank"
                href={`/knowledge/${ele.attributes.slug}`}
                style={{ textDecoration: "none" }}
              >
                <StyledCard>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <StyledTypographyDate>
                      {moment(ele.attributes.publishedAt).format("MMM Do YY")}
                    </StyledTypographyDate>
                  </Grid>
                  <StyledTypographyTitle>
                    {ele.attributes.title}
                  </StyledTypographyTitle>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ marginTop: "auto" }}
                  >
                    <Grid item>
                      <StyledTypographyCategory>
                        {ele?.attributes?.category?.data?.attributes?.name}
                      </StyledTypographyCategory>
                    </Grid>
                    <Grid item sx={{ display: "flex", alignItems: "center" }}>
                      <StyledButton size="small" variant="text" color="primary">
                        Read More
                      </StyledButton>
                      <CustomIconButton className="custom-icon-button">
                        <ArrowForwardIcon
                          fontSize="small"
                          className="arrow-icon"
                          sx={{ fontSize: "16px" }}
                        />
                      </CustomIconButton>
                    </Grid>
                  </Grid>
                </StyledCard>
              </Link>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            width: "100%",
            display:"flex",
            justifyContent: "center",
            position: "relative",
            bottom: "8px",
            marginBottom: theme.spacing(4)
          }}
        >
          {Array.from({ length: slidesCount }).map((_, index) => (
            <IconButton
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                padding: theme.spacing(0.8),
              }}
            >
              <Box
                sx={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor:
                    currentIndex === index
                      ? colors.themeGreen
                      : colors.navyBlue200,
                }}
              ></Box>
            </IconButton>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 50,
          right: 16,
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundColor: "#CED6DC",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 3,
          cursor: "pointer",
          display: showScroll ? "flex" : "none",
        }}
        onClick={scrollTop}
      >
        <KeyboardArrowUpIcon />
      </Box>
    </Container>
  );
};

export default RelatedPosts;
