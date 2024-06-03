"use client";

import { Grid, Typography, Box } from "@mui/material";
import React,{useState,useEffect} from "react";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import { colors } from "../Constants/colors";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  letter-spacing:-0.04em;
  @media (max-width: 700px) {
    font-size: 23px;
    font-weight: 600;
    line-height:28px;
    letter-spacing: -0.02em;
  }
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 19px;
  line-height: 23px;
  letter-spacing: -0.02em;
  color:${colors.navyBlue400};
  @media (max-width: 639px) {
    font-size: 14px;
    font-weight: 400;
    line-height:17px;
   
  }
`;


const MainHeading = () => {
  const theme = useTheme();
   const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  if (!isLoaded) return null;
  return (
    <>
      <Box
        width="100vw"
       paddingY={{xs:8,sm:14}}
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={6}
       
        sx={{
          backgroundImage: `url('/rectangle.png')`,
          backgroundSize: "cover",
        }}
      >
        <Grid container >
          <Grid item width="100%"  paddingX={3}>
             <Typography textAlign="center"marginBottom={1}>
              <StyledTypography1
                color={colors.navyBlue500}
             
               marginRight={1}
              
             component="span"
             
              >
                Unlock Your
              </StyledTypography1>
              <StyledTypography1
                color={colors.themeGreen}
                marginRight={1}
                component="span"
               
              >
               Investing
              </StyledTypography1>
              <StyledTypography1 color={colors.navyBlue500}
               component="span"
              >
                Potential
              </StyledTypography1>
              </Typography>
              <StyledTypography2 textAlign="center" >
                Empower Your Investing Journey with Expert Guidance at Sovrenn
              </StyledTypography2>
              </Grid>
             
             
           
           
        
        
        </Grid>
      </Box>
    </>
  );
};

export default MainHeading;
