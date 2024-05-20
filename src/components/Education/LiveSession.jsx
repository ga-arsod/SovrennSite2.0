"use client";
import styled from "@emotion/styled";
import React from "react";
import { Grid, Box, Typography,Button } from "@mui/material";
import { gradientColors ,colors} from "../Constants/colors";

const StyledTypography1 = styled(Typography)`
  color: white;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  letter-spacing:-0.02em;
  color:${colors.white},
  @media (max-width: 700px) {
    font-size: 23px;
    font-weight: 600;
    line-height:28px;
    letter-spacing: -0.02em;
  }

`;
const StyledButton2 = styled(Button)`
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 18px;
  background-color: ${colors.white};
  text-transform: none;
  padding-top:14px;
  padding-bottom:14px;
  line-height: 21px;
  border-color:${colors.themeGreen};

  :hover {
    background-color: ${colors.themeButtonHover};
    color: ${colors.white};
  }
 
`;
const StyledTypography2 = styled(Typography)`

  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color:${colors.white}
`;
const LiveSession = ({button}) => {
  return (
    <>
      <Box
        height={{xs:"42vh",sm:"25vh",md:"30vh"}}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ background:  `linear-gradient(45deg, ${gradientColors.c1}, ${gradientColors.c2})`}}
        marginTop={3}
      >
        <Grid container width="100%" alignItems="center">
          <Grid item width="100%" sx={{display:"flex",alignItems:"center",flexDirection:"column"}}>
            <StyledTypography1 component="h2" textAlign="center" gutterBottom  paddingX={2} >
              Book a live session
            </StyledTypography1>
            <StyledTypography2 textAlign="center" paddingX={4} gutterBottom>
              Join over 1,000+ learners who already started investing after this
              session
            </StyledTypography2>
            {
              button &&  <StyledButton2 variant="contained">
              Book Now
            </StyledButton2>
            }
           
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default LiveSession;
