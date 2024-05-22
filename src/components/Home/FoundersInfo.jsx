"use client";
import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import styled from "@emotion/styled";
import FoundersCard from "../Cards/FoundersCard";
import { foundersArray } from "@/utils/Data";
import { colors } from "../Constants/colors";

import { expertDataArray } from "@/utils/Data";
import { usePathname } from "next/navigation";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  @media (max-width: 700px) {
    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  @media (max-width: 700px) {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }
`;

const FoundersInfo = () => {
  const pathname=usePathname();
  
  return (
    <Box
      sx={{
        backgroundImage: `url('/rectangle.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid
        container
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
        paddingTop={3}
        
      >
        <Grid item>
          <Typography textAlign="center">
            <StyledTypography1 component="span" color="#0D1726" marginRight={1}>
            {pathname==="/" ? expertDataArray.foundersH1:expertDataArray.expertH1}
            </StyledTypography1>
            <StyledTypography1 component="span" color={colors.themeGreen}>
            {pathname==="/" ? expertDataArray.foundersH2:expertDataArray.expertH2}
            </StyledTypography1>
          </Typography>
        </Grid>

        <Grid item>
          <StyledTypography2 textAlign="center" component="div" color="#627B8F">
          {pathname==="/" ? expertDataArray.foundersDescription:expertDataArray.expertDescription}
          </StyledTypography2>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        {(pathname==="/" ? foundersArray : foundersArray.slice(0,1)).map((item, index) => {
          return <FoundersCard key={index} item={item} />;
        })}
      </Grid>
    </Box>
  );
};
export default FoundersInfo;
