"use client";
import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";

const stepsArray = [
  {
    serial: "1",
    description:
      "Select a Live Session Slot as per your Convenient date and time",
  },
  {
    serial: "2",
    description: "You will then Receive a Confirmation Mail",
  },
  {
    serial: "3",
    description: "Receive a Zoom Link on Mail 3 hours before session starts",
  },
];

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  letter-spacing:-0.04em;
  @media (max-width: 639px) {
    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
    letter-spacing:-0.02em;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
 
`;

const StyledTypography3 = styled(Typography)`
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color:${colors.black};
  @media (max-width: 639px) {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    
  }
`;

const LiveSessionSteps = () => {
  return (
    <>
      <Box>
        <Grid
          container
          spacing={1}
          direction="column"
          justifyContent="center"
          alignItems="center"
          paddingTop={4}
          paddingY={8}
          paddingX={{xs:3,sm:6}}
        >
          <Grid item>
            <StyledTypography1
              textAlign="center"
              component="span"
              color={colors.headingColor}
              marginRight={1}
            >
              How this Works?
            </StyledTypography1>
          </Grid>

          <Grid item>
            <StyledTypography2
              textAlign="center"
              component="div"
              color={colors.greyBlue500}
            >
              This is how this live session booking process works.
            </StyledTypography2>
          </Grid>
          <Grid item marginTop={4}>
            <Grid container spacing={{xs:1,sm:4}} marginTop={2}>
              {stepsArray.map((element, index) => {
                return (
                  <Grid
                    item
                    key={index}
                    xs={4}
                    sm={4}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      alignItems: "center",
                    }}
                  
                  >
                    <Box
                      sx={{
                        bgcolor:colors.green50,
                        borderRadius: '24px',
                        width:'48px',
                        height:'48px',
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center"
                        
                      }}
                    >
                      <StyledTypography3>{element.serial}</StyledTypography3>
                    </Box>
                    <StyledTypography3 textAlign="center" color="#0D1726">
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
export default LiveSessionSteps;
