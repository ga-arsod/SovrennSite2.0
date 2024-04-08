"use client"
import styled from "@emotion/styled";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,Button
} from "@mui/material";
import React from "react";

const headingsArray = [
  {
    h1: "MASTER",
    h2: "Investing",
  },
  {
    h1: "UNLOCK",
    h2: "Quality Insights",
  },
  {
    h1: "DISCOVER",
    h2: "High-Potential Stocks",
  },
];

const StyledButton1 = styled(Button)`
border-color:#1DA098;
 color: #1DA098;
 font-weight:600;
 font-size:18px;
 line-height:35px;
 :hover {
  background-color: #1DA098;
  color:white;
  border-color:#1DA098;
  outline:#1DA098;
};

`;

const StyledButton2= styled(Button)`
color: white;
font-wight:600;
font-size:"16px";
background-color:#1DA098;
line-height:35px;
:hover {
  background-color:#1DA098;
 
};
`;

const MainPoster = () => {
  return (
    <Grid container id="container" spacing={10} sx={{
      backgroundImage: `url('/rectangle.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
     paddingTop:"20px"
    }}>
      <Grid item  sx={{display: 'inline-block',marginLeft:"60px",marginTop:"50px"}}>
        <Typography  component="span" sx={{ fontSize:"16px",marginRight:"3px",color:"#0D1726"}} >
         Sovreen helps 
        </Typography>
        <Typography  component="span" sx={{ fontSize:"16px",color:"#1DA098",marginRight:"3px"}} >
           "You"
        </Typography>
        <Typography component="span" sx={{ fontSize:"16px",color:"#0D1726"}} >
          to
        </Typography>
        <Box component="span">

          {headingsArray.map((element,index) => {
            return (
              <Box key={index}>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ fontSize:"48px",color:"#1DA098",
                  fontWeight:"700",marginRight:"6px" }}
                >
                  {element.h1}
                </Typography>{" "}
                <Typography variant="h1" component="span" sx={{ fontSize:"38px",
                  fontWeight:"600"}}>
                  {element.h2}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Typography variant="body2" component="span" sx={{ fontSize:"14px",color:"#0D1726",fontWeight:400,lineHeight:"17px"}} >
        So you can take informed investing decisions to build a secure financial future. 
        </Typography>
        <Grid container spacing={2} sx={{paddingTop:"12px"}}>
        <Grid item>
        <StyledButton1 variant="outlined">Buy Trial for 2 months @ ₹400</StyledButton1>
        </Grid>
        <Grid item>
        <StyledButton2 variant="contained" >Buy Full Access @ ₹5000/yr</StyledButton2>
        </Grid>
        </Grid>
      </Grid>
      <Grid item  sx={{display: 'inline-block' }} component="span">
      <img src="/hero.svg" alt="..." />
      </Grid>
     
    </Grid>
  );
};
export default MainPoster;
