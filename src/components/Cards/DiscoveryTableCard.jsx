"use client";
import React from "react";
import { Grid, Typography, Box, Divider, Button } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";

const StyledTypography1 = styled(Typography)`
  font-size: 10px;
  line-height: 12px;
`;
const StyledTypography3 = styled(Typography)`
  font-size: 12px;
  line-height: 14px;
`;
const StyledTypography4 = styled(Typography)`
  font-size: 14px;
  line-height: 17px;
  color: black;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Show only 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
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

const DiscoveryTableCard = ({ tableData }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        marginBottom={5}
        justifyContent="center"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
          },
          gap: 2,
        }}
      >
        {tableData?.companies?.map((item, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#EFF2F4",
              borderRadius: "4px",
              maxWidth: "472px",
              width: "100%",
              padding: 2,
              boxSizing: "border-box",
              margin: "auto", 
            }}
          >
            <StyledTypography1
              color={colors.greyBlue900}
              sx={{ fontWeight: "400" }}
              component="span"
            >
              {`Date Of Info. `}
            </StyledTypography1>
            <StyledTypography1
              color={colors.navyBlue500}
              sx={{ fontWeight: "600" }}
              component="span"
            >
              {item?.date}
            </StyledTypography1>
            <StyledTypography2
              marginTop={1}
              color={colors.navyBlue500}
              component="div"
            >
              {item?.company_name}
            </StyledTypography2>
            <Box marginTop={1}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <StyledTypography3
                    color={colors.greyBlue900}
                    sx={{ fontWeight: "400" }}
                    component="span"
                  >
                    {`Market Cap (in Cr.) :  `}
                  </StyledTypography3>
                  <StyledTypography3
                    color={colors.navyBlue500}
                    sx={{ fontWeight: "600" }}
                    component="span"
                  >
                    {item?.market_cap}
                  </StyledTypography3>
                </Grid>
                <Grid item>
                  <StyledTypography3
                    color={colors.greyBlue900}
                    sx={{ fontWeight: "400" }}
                    component="span"
                  >
                    {`TTM PE : `}
                  </StyledTypography3>
                  <StyledTypography3
                    color={colors.navyBlue500}
                    sx={{ fontWeight: "600" }}
                    component="span"
                  >
                    {item?.ttm_pe}
                  </StyledTypography3>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ paddingBottom: "8px", borderColor: "#E6E6E6" }} />
            <StyledTypography4 textAlign="justify" marginTop={1}>
              {item?.remark}
            </StyledTypography4>
            <Divider sx={{ paddingTop: "8px", borderColor: "#E6E6E6" }} />
            <Grid
              item
              sx={{ display: "flex", justifyContent: "flex-end" }}
              marginBottom={0.5}
              marginTop={1}
            >
              <StyledButton2 variant="contained">Read</StyledButton2>
            </Grid>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default DiscoveryTableCard;