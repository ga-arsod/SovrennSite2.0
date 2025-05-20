"use client";

import { Box, Grid, Typography, Divider, Link, Container } from "@mui/material";
import Image from "next/image";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import DetailedTimelineModal from "../Mentorship/DetailedTimelineModal";
import { useState } from "react";

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
     letter-spacing: -0.02em;
    line-height: 19px;
  }
`;
const TimelineSection = ({data}) => {
 const [timelineOpen,setTimelineOpen]=useState(false)

  return (
    <>
      <DetailedTimelineModal timelineOpen={timelineOpen} setTimelineOpen={setTimelineOpen} data={data?.detailed_timeline}/>
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

              {data?.details?.map((item, i,arr) => {
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

                    {i !== arr.length - 1 && (
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
              <Typography
  component="span"
  sx={{
    fontFamily: "Arial, sans-serif",
    fontWeight: 700,
    fontSize: "19px",
    lineHeight: "23px",
    color: colors.themeGreen,
    letterSpacing: "-0.02em",
    textDecoration: "underline", 
    cursor: "pointer",
  }}
  onClick={() => setTimelineOpen(true)}
>
  View Detailed Timeline &gt;
</Typography>

              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default TimelineSection;
