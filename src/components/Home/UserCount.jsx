"use client";
import React from "react";
import { Grid, Typography, IconButton, Paper,Avatar } from "@mui/material";
import styled from "@emotion/styled";
import  Image  from "next/image";

import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import PersonOutlineSharpIcon from "@mui/icons-material/PersonOutlineSharp";


const UserCount = () => {
  const analyticsArray = [
    {
      icon: "/icon1.svg",
      heading: "15k+ Daily Readers",
    },
    {
      icon: "/icon2.svg",
      heading: "1k+ Articles with daily updates",
    },
    {
      icon: "/icon3.svg",
      heading: "Community of 10k+ Investors",
    },
    {
      icon: "/icon4.svg",
      heading: "4.9 Rating on Playstore",
    },
  ];

  const StyledTypography1 = styled(Typography)`
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
     @media (max-width: 700px) {
      font-size: 19px;
    }
  `;

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="row"
      paddingX={{ xs: 6, lg: 10 }}
      paddingY={3}
      spacing={4}
    >
      {analyticsArray.map((element, index) => {
        return (
          <Grid item xs={12} sm={3} key={index} >
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
             
               
            >
              <Grid item>
              <Image
      src={element.icon}
      width={40}
      height={40}
      alt={`icon${index}`}
    />
                
              </Grid>
              <Grid item>
                <StyledTypography1
                  color="#0D1726"
                  align="center"
                  sx={{ fontSize: "18px", fontWeight: 600, lineHeight: "28px" }}
                >
                  {element.heading}
                </StyledTypography1>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};
export default UserCount;