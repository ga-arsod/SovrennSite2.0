import React from "react";
import { Grid, Typography, Box, Button, Container } from "@mui/material";
import styled from "@emotion/styled";
import Image from "next/image";
import { colors } from "../Constants/colors";
import { useSelector } from "react-redux";

import { changeExamState } from "@/app/Redux/Slices/examSlice";
import { useDispatch } from "react-redux";
import TutorialSection from "../Education/TutorialSection";
import Link from "next/link";


const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  letter-spacing: -0.04em;
  @media (max-width: 600px) {
    font-size: 32px;
    line-height: 42px;
  }
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 21px;
  }
`;
const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: ${colors.themeGreen};
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding: 12px 20px;
  text-transform: none;
  background-color: white;
  width: 100%;

  @media (max-width: 639px) {
    width: 100%;
    padding: 12px 0px;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding: 12px 20px;
  background-color: ${colors.themeGreen};
  text-transform: none;
  width: 100%;

  :hover {
    background-color: ${colors.themeButtonHover};
  }
  @media (max-width: 700px) {
    width: 100%;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
  }
`;
const StyledTypography3 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 24px;
  letter-spacing: -0.02em;
`;

const Score = ({ setViewAnswers }) => {
  const { examAnswers } = useSelector((store) => store.exam);
  const dispatch = useDispatch();
  const timeConversion = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  const handleOpenCertificate = () => {
    if (examAnswers?.certificate_url) {
      const url = examAnswers.certificate_url;
      
    
      const newTab = window.open(url, "_blank", "noopener,noreferrer");
  
    
      if (!newTab) {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.download = "Certificate.pdf"; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } 
  };
  
  return (
    <>
      <Container>
        <Box
          sx={{ display: "flex", justifyContent: "center" }}
          marginTop={{ xs: "100px", sm: "100px" }}
        >
          <Grid container width="518px">
            <Grid item paddingX={2}>
              <StyledTypography1 textAlign="center" color={colors.themeGreen}>
                {examAnswers?.is_passed ? "Congratulations" : "Nice Try, But"}
              </StyledTypography1>
              <StyledTypography2
                textAlign="center"
                color="#4D5E7C"
                marginTop={0.5}
              >
                {examAnswers?.is_passed
                  ? "You Passed the test"
                  : "You did not select all the correct answers"}
              </StyledTypography2>
              <Image
                src={
                  examAnswers?.is_passed
                    ? "/happy-student.png"
                    : "/bad-score.png"
                }
                width={290}
                height={284}
                alt="..."
                layout="responsive"
              />
              <StyledTypography3
                textAlign="center"
                color="#1C1C1C"
                marginTop={4}
              >
                You Scored
              </StyledTypography3>
              <Typography textAlign="center" marginTop={0.5}>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "34px",
                    lineHeight: "40px",
                    letterSpacing: "-0.04em",
                    color: examAnswers?.is_passed ? "#43CB43" : "#F60909",
                  }}
                >
                  {examAnswers?.score}
                </span>{" "}
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "34px",
                    lineHeight: "40px",
                    letterSpacing: "-0.04em",
                    color: "#20365B",
                  }}
                >
                  /
                </span>{" "}
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "34px",
                    lineHeight: "40px",
                    letterSpacing: "-0.04em",
                    color: "#6A7891",
                  }}
                >
                  {examAnswers?.total_score}
                </span>
              </Typography>
              <Typography
                textAlign="center"
                color="#1C1C1C"
                sx={{ fontWeight: "400", fontSize: "12px", lineHeight: "14px" }}
              >
                {`Time : ${timeConversion(examAnswers?.time_taken)}`}
              </Typography>
              <Typography
                textAlign="center"
                marginTop={3}
                color={colors.themeGreen}
                sx={{
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "21px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setViewAnswers(true);
                  dispatch(changeExamState());
                }}
              >
                View Answers &gt;
              </Typography>
            </Grid>
            <Grid
              item
              width="100%"
              marginY={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                justifyContent: "center",
              }}
            >
               <Link href="/exam/leaderboard">
              <StyledButton1 variant="outlined">Check Your Rank</StyledButton1>
              </Link>
              <StyledButton2
                variant="contained"
                onClick={handleOpenCertificate}
              >
                View Certificate
              </StyledButton2>
            </Grid>
          </Grid>
        </Box>
        {!examAnswers?.is_passed ? <TutorialSection /> : <></>}
      </Container>
    </>
  );
};

export default Score;
