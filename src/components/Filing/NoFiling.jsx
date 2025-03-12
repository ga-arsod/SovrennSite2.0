import React from "react";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import { Box,Typography,Grid ,Container} from "@mui/material";
import Image from "next/image";

const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;

  
  @media (max-width: 639px) {
    font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  }
`;
const NoFiling = () => {
  return (
    <>
   
    <Box marginY={2}>
    <StyledTypography2 color={colors.navyBlue200}>
            No filing found
          </StyledTypography2>
          <Grid container justifyContent="center">
       
       <Grid item marginY={3}>
       <Image
  src="/no-filing.png"
  alt="filing illustration"
  width={470}
  height={360}
  style={{ maxWidth: "100%", height: "auto" }} 
/>
         <StyledTypography2 color={colors.navyBlue200} marginLeft={{xs:0,sm:6}}>
           Oops! We are unable to find any result, try again.
         </StyledTypography2>
       </Grid>
     </Grid>
    </Box>
   
    </>
  );
};

export default NoFiling;
