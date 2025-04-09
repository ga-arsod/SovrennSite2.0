
"use client"; 
import { useEffect } from "react";
import { Grid,Typography,Button,Container } from "@mui/material";

import Image from "next/image";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
  color:#8A949C;
 @media (max-width: 639px) {
    font-size: 19px;
  line-height: 23px;
  }
`;

const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${colors.themeGreen};
  text-transform: none;

  :hover {
    background-color: ${colors.themeButtonHover};
  }
`;

export default function EmptySearch() {
   

    return (

    <>
     <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          marginTop="100px"
          marginBottom="50px"
        >
          <Grid item style={{ maxWidth: "580px", width: "100%" }}>
            <Image
              src="/search-image.png"
              width={467}
              height={358}
              alt="common_error"
              layout="responsive"
            />
          </Grid>
          <Grid item>
            <StyledTypography1 textAlign="center" mt={1} >
            Oops! We are unable to find any result related to your keyword, try again.
            </StyledTypography1>
           
          </Grid>
          <Grid item marginTop={2}>
            <StyledButton2 href="/">Back to Homepage</StyledButton2>
          </Grid>
        </Grid>
      </Container>
    
       
        </>
    );
}
