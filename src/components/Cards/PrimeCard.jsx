"use client";
import React from "react";
import { Grid, Typography, Box, Divider, Button } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import moment from "moment";
import NoData from "../../components/NoData/NoData"
import Link from "next/link";

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

const PrimeCard = ({ data, activeTab }) => {
  return (
    <>
    {
      data.length== 0 ?  <NoData text="No data available" />
      :
      <Box sx={{ flexGrow: 1, paddingY: 2 }}>
      <Grid
        container
        marginBottom={1}
        justifyContent="center"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
          },
          gap: 2,
          padding: { xs: 1 }, 
        }}
      >
        {data?.map((elem, index) => (
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
            {elem.price === 0 ||
                    (activeTab == "one" && elem?.is_promoter_interview_free)
                      ? "Free Sample"
                      : `${moment(elem.createdAt).format("Do MMM YY")}`}
            </StyledTypography1>
            <StyledTypography2
              marginTop={1}
              color={colors.navyBlue500}
              component="div"
            >
            {elem.company_Id?.company_name
                      ? elem.company_Id?.company_name
                      : "NA"}
            </StyledTypography2>
            <Box marginTop={1}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <StyledTypography3
                    color={colors.greyBlue900}
                    sx={{ fontWeight: "400" }}
                    component="span"
                  >
                    {`Sector :  `}
                  </StyledTypography3>
                  <StyledTypography3
                    color={colors.navyBlue500}
                    sx={{ fontWeight: "600" }}
                    component="span"
                  >
                  {elem.company_Id?.sector ? elem.company_Id?.sector : "NA"}
                  </StyledTypography3>
                </Grid>
                <Grid item>
                  <StyledTypography3
                    color={colors.greyBlue900}
                    sx={{ fontWeight: "400" }}
                    component="span"
                  >
                    {`Industry : `}
                  </StyledTypography3>
                  <StyledTypography3
                    color={colors.navyBlue500}
                    sx={{ fontWeight: "600" }}
                    component="span"
                  >
                    {elem.company_Id?.industry
                      ? elem.company_Id?.industry
                      : "NA"}
                  </StyledTypography3>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ paddingBottom: "8px", borderColor: "#E6E6E6" }} />
            
            <Grid
              item
              sx={{ display: "flex", justifyContent: "flex-end" }}
              marginBottom={0.5}
              marginTop={1}
            >
               <Link target="_blank" href={activeTab == 'two' ? `/prime/${elem.slug}?s=promoter_interview` : `/prime/${elem.slug}`}>
              <StyledButton2 variant="contained">    {elem.price === 0 ? "Read Free" : "Read"}</StyledButton2>
              </Link>
            </Grid>
          </Box>
        ))}
      </Grid>
    </Box>
    }
   
   
    </>
  );
};

export default PrimeCard;