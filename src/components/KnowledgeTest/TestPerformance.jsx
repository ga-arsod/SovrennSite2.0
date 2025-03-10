"use client";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,Container
} from "@mui/material";
import Image from "next/image";
import styled from "@emotion/styled";
import ShareIcon from '@mui/icons-material/Share';
import { colors } from "../Constants/colors";
import { useState } from "react";
import ShareKnowledgeScore from "../Modal/ShareKnowledgeScore";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  letter-spacing: -0.02em;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
`;
const StyledTypography3 = styled(Typography)`
  font-weight: 700;
  font-size: 34px;
  line-height: 40px;
  letter-spacing: -0.04em;
`;
const StyledTypography4 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`;
const StyledButton2 = styled(Button)`
  color:${colors.themeGreen};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding:12px 20px;
 
  text-transform: none;

 
 
  @media (max-width: 639px) {
  width:100%;
   padding-top:12px;
   padding-bottom:12px;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
   
  }
`;
const TestPerformance = () => {
    const [open,setOpen]=useState(false)
    const handleClose=()=>{
        setOpen(false)
    }
  return (
    <>
    <ShareKnowledgeScore open={open} handleClose={handleClose}/>
    <Container>
    <Grid container marginTop="60px" justifyContent="center" alignItems="center">
      <Grid item sx={{display:"flex",justifyContent:"center"}}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          width={{ xs: "80%", md: "1000px" }}
          paddingTop={4}
          paddingBottom={{xs:0,sm:4}}
        >
          <StyledTypography1 color={colors.themeGreen}>
            Here’s how you performed in the test!
          </StyledTypography1>

          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems="center"
            gap={2}
            mt={3}
          >
        <Card 
  sx={{ 
    width: { xs: "50%", sm: 600, md: 600, lg: 600, xl: 700 }, 
    maxWidth: "100%", 
    minWidth: 400,
    display: "flex",
    justifyContent: "center",
    boxShadow:"none"
  }}
>
  <Box sx={{ width: { xs: "90%", sm: "80%",md:"100%" }, display: "flex", justifyContent: "center" }}>
    <Image
      src="/test-performance-image1.png"
      alt="Test Result"
      width={700} 
      height={700} 
      layout="intrinsic"
      style={{ borderRadius: 4, width: "100%" }}
    />
  </Box>
</Card>






            <CardContent>
              <StyledTypography2>You Scored</StyledTypography2>
              <StyledTypography3 color="#F60909">
                10<span style={{ color: "black" }}>/</span>
                <span style={{ color: "#6A7891" }}>50</span>
              </StyledTypography3>
              <StyledTypography4 mt={1} color={colors.navyBlue500} paddingX={1}>
                "Investing is a skill, and every expert starts as a beginner.
                It’s time to level up your knowledge and make smarter investment
                decisions!"
              </StyledTypography4>

              <StyledButton2 variant="outlined" startIcon={<ShareIcon />}  sx={{ mt: 3 }} onClick={()=>{setOpen(true)}}>
                Challenge Your Friends
              </StyledButton2>
            </CardContent>
          </Box>
        </Box>
      </Grid>
    </Grid>
    </Container>
    </>
  );
};

export default TestPerformance;
