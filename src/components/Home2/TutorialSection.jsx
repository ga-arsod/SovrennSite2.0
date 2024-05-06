"use client"
import React from "react";
import styled from "@emotion/styled";
import { Box,Typography,Grid } from "@mui/material";
import Image from "next/image";

const tutorialArray=[
    {
    image:"/green.svg",
    description:"Identifying Potential Multibaggers",
},
{
    image:"/green.svg",
    description:"Price Targets, Valuation and Float Analysis",
},
]

const StyledTypography1=styled(Typography)`
font-weight:600;
font-size:34px;
line-height:40px

@media (max-width:700px)
{
  font-weight:600;
  font-size:14px;
  line-height:28px
}


`;

const StyledTypography2=styled(Typography)`
font-weight:400;
font-size:20px;
line-height:24px;
text-align:center;
@media (max-width:700px)
{
  font-weight:400;
  font-size:12px;
  line-height:14px;
  text-align:center;
}


`;
const StyledTypography3=styled(Typography)`
font-weight:600;
font-size:24px;
line-height:32px;




`;

const TutorialSection=()=>{
    return(
        <>
      <Box>
  <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1} paddingX={1}>
    <Grid item>
      <Typography sx={{textAlign:'center'}} >
      <StyledTypography1 component="span"  marginRight={1} color="#0D1726">
      Videos to help you kickstart your investing 
  </StyledTypography1>
  <StyledTypography1 component="span"  color="#1DA098">
  journey
  </StyledTypography1>
      </Typography>
   
    </Grid>
    <Grid item sx={{textAlign:'center'}}>
    <StyledTypography2 component="span"  justifyContent="center" wrap="wrap" gutterBottom   color="#627B8F">
    You can understand the basics of investing with these two videos
  </StyledTypography2>
 
  
    </Grid>
    <Grid item  sx={{display:"flex",justifyContent:"center",alignItems:"center",gap:"2rem"}}>
        {
            tutorialArray.map((element,index)=>{
                return(
                    <Box >
                    <Box 
           >
                    <Image 
            src={element.image} 
            alt="..." 
            width={550}
            height={400}
           
            
            
            />
        
                    </Box>
               
            <StyledTypography3 color="#101828" marginLeft={3}>
           {element.description}
           
            </StyledTypography3>
                </Box>

                )
            })
        }
       
      
   
    </Grid>
 
  </Grid>
</Box>

        </>
    )
}
export default TutorialSection;