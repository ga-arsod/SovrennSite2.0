"use client";
import React from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import { colors } from "../Constants/colors";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styled from "@emotion/styled";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 33px;
  line-height: 40px;
  text-align: center;
  letter-spacing: -0.02em;
`;

const StyledTypography2 = styled(Typography)`
  font-size: 14px;
  line-height: 24px;
  white-space:nowrap;
`;

const CustomIconButton = styled(IconButton)`
  padding: 0;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #b0b7bc;
  border-radius: 50%;
  background-color: ${colors.white};
  transition: background-color 0.3s, border-color 0.3s, transform 0.3s;

 
  &.custom-icon-button {
   
  }
`;

const StyledBox = styled(Box)`
  border: 1px solid ${colors.neutral600};
  border-radius: 4px;
  height: 160px;

  &:hover {
    .custom-icon-button {
      background-color: ${colors.themeGreen}; 
      border-color: ${colors.navyBlue500};
      transform: rotate(-45deg); 
      
      .arrow-icon {
        color: ${colors.white};
        font-size:14px;
      }
    }
  }
`;

const UpdateBox = ({ name, number }) => {
  return (
    <StyledBox>
      <Grid container paddingY={3} paddingX={4} justifyContent={"center"}>
        <Grid item>
          <StyledTypography1 textAlign="center" color={colors.themeGreen}>
            {number}
          </StyledTypography1>
          <Typography
            color={colors.greyBlue500}
            sx={{
              fontWeight: "600",
              fontSize: { xs: "14px", sm: "20px" },
              lineHeight: { xs: "17px", sm: "24px" },
              whiteSpace:"nowrap"
            }}
          >
            {name}
          </Typography>
        </Grid>
        <Grid
          item
          width="100%"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          gap="12px"
          marginTop={2}
          marginBottom="12px"
        >
          <StyledTypography2
            component="span"
            color={colors.navyBlue500}
            sx={{ fontWeight: "700" }}
          >
            Read More
          </StyledTypography2>
          <CustomIconButton className="custom-icon-button">
            <ArrowForwardIcon
              fontSize="small"
              className="arrow-icon"
              sx={{ color: "#3C464F" }}
            />
          </CustomIconButton>
        </Grid>
      </Grid>
    </StyledBox>
  );
};

export default UpdateBox;