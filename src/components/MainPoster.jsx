"use client"
import styled from "@emotion/styled";
import {
  Grid,
 
  Typography,
  Box,Button
} from "@mui/material";
import React from "react";
import Image from "next/image";


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
 text-transform:none;
 width:100%;
 :hover {
  background-color: #1DA098;
  color:white;
  border-color:#1DA098;
  outline:#1DA098;
};
@media (max-width:700px)
{
  font-size:14px;
  font-weight:500;
  line-height:21px;
}

`;

const StyledButton2= styled(Button)`
color: white;
font-weight:600;
font-size:18px;
background-color:#1DA098;
text-transform:none;
line-height:35px;
width:100%;
:hover {
  background-color:#1DA098;
 
};
@media (max-width:700px)
{
  font-size:14px;
  font-weight:500;
  line-height:21px;
}
`;





const StyledTypography1=styled(Typography)`
color:#1DA098;
margin-right:8px;


@media (max-width:700px)
{
  font-size:21px;
      font-weight:600;
}
@media (min-width: 701px) and (max-width: 1120px) 
{
  font-size:48px;
  font-weight:700;
}
@media (min-width:1121px)
{
 
      font-size:48px;
      font-weight:700;
}

`;

const StyledTyography2=styled(Typography)`
@media (max-width:700px)
{
  font-size:21px;
      font-weight:600;
}
@media (min-width: 701px) and (max-width: 1120px) 
{
  font-size:34px;
  font-weight:600;
}
@media (min-width:1121px)
{
 
      font-size:34px;
      font-weight:600;
}

`;

const StyledTyography3=styled(Typography)`

@media (max-width:1100px)
{
  text-align:center;
}



`;

const MainPoster = () => {
  return (
    <Box 
    width="100vw"
    sx={{
      backgroundImage: `url('/rectangle.png')`,
      backgroundSize: 'cover',
    
    


    }}
    >
      <Grid container  paddingX={7} spacing={6}>
      <Grid item lg={6} xs={12}  sx={{marginTop:"100px"}}>
        <Grid container justifyContent='center' alignItems='center'>
        <Grid item>
        <StyledTyography3>
        <Typography  component="span" sx={{ fontSize:"16px",fontWeight:"400", marginRight:"3px",color:"#0D1726"}} >
         Sovreen helps 
        </Typography>
        <Typography  component="span" sx={{ fontSize:"16px",color:"#1DA098",fontWeight:"400",marginRight:"3px"}} >
        &quot;You&quot;
        </Typography>
        <Typography component="span" sx={{ fontSize:"16px",fontWeight:"400",color:"#0D1726"}} >
          to
        </Typography>

        </StyledTyography3>
          
         
        
        <Box component="span">
    
          {headingsArray.map((element,index) => {
            return (
              <Box key={index} >
                <StyledTyography3>
                <StyledTypography1
                  variant="h6"
                  component="span"
                
                >
                  {element.h1}
                </StyledTypography1>
                <StyledTyography2 
                
                variant="h1" component="span" >
                  {element.h2}
                </StyledTyography2>
                  
                </StyledTyography3>
                
              </Box>
            );
          })}
        </Box>
        <StyledTyography3 textAlign="center" component="span" sx={{ fontSize:{xs:"12px",sm:"14px"},color:"#0D1726",fontWeight:400,lineHeight:{xs:"17px",sm:"14px"}}} >
        So you can take informed investing decisions to build a secure financial future. 
        </StyledTyography3>
        <Grid container direction={{xs:'column',sm:'row'}} spacing={2} sx={{paddingTop:"12px"}} >
        <Grid item >
        <StyledButton1   variant="outlined">Buy Trial for 2 months @ ₹400</StyledButton1>
        </Grid>
        <Grid item>
        <StyledButton2  variant="contained" >Buy Full Access @ ₹5000/yr</StyledButton2>
        </Grid>
        </Grid>
        </Grid>



        </Grid>
       
      </Grid>
      <Grid item lg={6} xs={12} >
        <Grid container justifyContent='center' paddingTop={6} alignItems="center" sx={{display: 'inline-block',overflow:"hidden",position:'relative' }}> 
       <Grid item>
       <Image src="/hero.svg" 
      width={500}
      height={636}
      alt="poster"
      layout="responsive"
     
      />

       </Grid>

        </Grid>
     
      </Grid>
     
    </Grid>
      
    </Box>

    
  );
};
export default MainPoster;
