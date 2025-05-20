"use client";
import {
  Box,
  Typography,
  Grid,
  Button,
  Divider, Container
} from "@mui/material";

import { colors } from "../Constants/colors";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ApplyButton from "./ApplyButton";

const StyledTypography1 = styled(Typography)`
  font-size: 48px;
  font-weight: 600;
  line-height: 56px;
  letter-spacing: -0.04em;
   @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;
const StyledTypography2 = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: -0.02em;
`;
const StyledTypography3 = styled(Typography)`
  font-size: 19px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: -0.02em;
`;
const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: #f4f3f3;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding: 14px 20px;
  text-transform: none;
  background: linear-gradient(45deg, #0c4340 0%, #06a77d 100%);
  margin-top: 28px;

  :hover {
    color: #f4f3f3;
    background: linear-gradient(45deg, #0c4340 0%, #06a77d 100%);
  }
`;




export default function LandingSection({ data }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const next = calculateTimeLeft();
      setTimeLeft(prev =>
        JSON.stringify(prev) === JSON.stringify(next) ? prev : next
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = +new Date(data?.last_enrollment_date) - +new Date();
    let timeLeft = {
      Days: "00",
      Hrs: "00",
      Mins: "00",
      Secs: "00",
    };

    if (difference > 0) {
      timeLeft = {
        Days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        Hrs: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
        Mins: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
        Secs: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    }

    return timeLeft;
  };

  return (

    <Box mt="60px" textAlign="center">
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
          gap={2}
          mb={2}
          pt={2}
        >
          <Typography
            color={colors.grey400}
            sx={{ fontSize: "16px", lineHeight: "19px", pb: "6px" }}
          >
            Enrollment Closes in
          </Typography>

          <Box>
            <Box display="flex" justifyContent="center" gap={2} mb={0.5}>
              {["Day", "Hr", "Min", "Sec"].map((label) => (
                <Typography
                  key={label}
                  variant="caption"
                  sx={{ fontSize: "14px", lineHeight: "17px" }}
                  width={40}
                  textAlign="center"
                >
                  {label}
                </Typography>
              ))}
            </Box>

            <Box display="flex" justifyContent="center" gap={2}>
              {[timeLeft.Days, timeLeft.Hrs, timeLeft.Mins, timeLeft.Secs].map((val, idx) => (
                <Box
                  key={idx}
                  px={1}
                  py={1}
                  bgcolor="#FEF3E2"
                  border="1px solid #F7B13C"
                  borderRadius={1}
                  width={40}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{
                      fontSize: "14px",
                      lineHeight: "17px",
                      textAlign: "center",
                    }}
                  >
                    {val}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <StyledTypography1 mt={3}>
          {data?.course?.heading}<br />
          <Box
            component="span"
            sx={{
              display: "inline-block",
              background: "linear-gradient(45deg, #0C4340 0%, #06A77D 100%)",
              color: "white",
              paddingY: "4px",
              paddingX: "6px",
              mt: "2px",
            }}
          >
            {data?.course?.title}
          </Box>
        </StyledTypography1>

        <StyledTypography2
          variant="body1"
          maxWidth="600px"
          color={colors.neutral900}
          mx="auto"
          mt={2}
        >
          {data?.course?.description}
        </StyledTypography2>
      </Container>
      <Box
        sx={{
          backgroundImage: `url('/rectangle.png')`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
        mt={5}
        pb={6}
      >
        <Container>
          <Grid container mt={4} maxWidth="600px" mx="auto">
            {data?.course?.details?.map((item, i, arr) => (
              <Grid item xs={12} key={i}>
                <Box display="flex" alignItems="center">
                  <Box
                    mr={2}
                    sx={{
                      width: "35px",
                      height: "35px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={item?.prefix_icon_url}
                      alt="icon"
                      width={35}
                      height={35}
                    />
                  </Box>
                  <StyledTypography3 textAlign="left" color={colors.neutral900}>
                    {item?.text}
                  </StyledTypography3>
                </Box>

                {i !== arr.length - 1 && (
                  <Divider
                    sx={{ my: 2, borderColor: "#DEDDDD", borderBottomWidth: "2px" }}
                  />
                )}
              </Grid>
            ))}
          </Grid>

        </Container>
      </Box>

      <Box bgcolor="#F7B13C" py={0.5} >
        <Typography
          variant="h6"
          sx={{ fontSize: "20px", lineHeight: "24px", textAlign: "center" }}
        >
          {data?.course?.info?.leading} <del>{`₹${data?.course?.info?.mrp}`}</del>{" "}
          <span style={{ fontWeight: "bold" }}>{`₹${data?.course?.info?.offer_price}`}</span>
          <Box
            component="span"
            sx={{
              display: { xs: "block", sm: "inline" },
            }}
          >
            {" "}
            {data?.course?.info?.trailing}
          </Box>
        </Typography>
      </Box>


      <Box mb={5}>
        <ApplyButton />
      </Box>
    </Box>

  );
}
