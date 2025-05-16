"use client";

import { Box, Grid, Typography, Divider, Link, Container } from "@mui/material";
import Image from "next/image";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import DetailedTimelineModal from "../Mentorship/DetailedTimelineModal";

const StyledTypography1 = styled(Typography)`
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;
const StyledTypography2 = styled(Typography)`
  font-size: 19px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: -0.02em;
  @media (max-width: 639px) {
    font-size: 16px;

    line-height: 19px;
  }
`;
const TimelineSection = ({data}) => {
  const items = [
    {
      image: "/mentorship-timeline-image1.png",

      description:
        "4 Expert Teaching Sessions – Basics of investing, understanding market trends, how to use Sovrenn for building wealth, etc.",
    },
    {
      image: "/mentorship-timeline-image2.png",

      description:
        " 4 Live Doubt-Clearing Sessions – Get personalized guidance.",
    },
    {
      image: "/mentorship-timeline-image3.png",

      description:
        "WhatsApp/Community Group Access – Stay connected and get extra insights.",
    },
  ];

  return (
    <>
      {/* <DetailedTimelineModal/> */}
      <Box
        sx={{
          backgroundImage: `url('/rectangle.png')`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
        py={6}
      >
        <Container>
          <Grid container justifyContent="center">
            <Grid item width="750px">
              <StyledTypography2 mb={4} textAlign="center" px={6}>
               {data?.header}
              </StyledTypography2>

              {data?.details?.map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                  <Box key={i}>
                    <Grid
                      container
                      direction={isEven ? "row" : "row-reverse"}
                      alignItems="center"
                      justifyContent={{ xs: "center", sm: "flex-start" }}
                      px={5}
                      spacing={2}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={5}
                        display="flex"
                        justifyContent={{ xs: "center", sm: "flex-start" }}
                      >
                        <Image
                          src={item?.image_url}
                          alt={`timeline image${i+1}`}
                          width={230}
                          height={220}
                          style={
                            i === 2
                              ? { objectFit: "cover", width: "250px" }
                              : { objectFit: "contain" }
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={7}>
                        <StyledTypography1
                          textAlign={{ xs: "center", sm: "left" }}
                          my={1.5}
                          color={colors.neutral900}
                        >
                          {item?.text}
                        </StyledTypography1>
                      </Grid>
                    </Grid>

                    {i !== items.length - 1 && (
                      <Divider
                        sx={{
                          my: 1,
                          borderColor: "#DEDDDD",
                          borderBottomWidth: "2px",
                        }}
                      />
                    )}
                  </Box>
                );
              })}

              <Box textAlign="center" mt={3}>
                <Link
                  href="#"
                  underline="always"
                  sx={{
                    fontFamily: "Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: "19px",
                    lineHeight: "23px",
                    color: colors.themeGreen,
                    letterSpacing: "-0.02em",
                  }}
                >
                  View Detailed Timeline &gt;
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default TimelineSection;
