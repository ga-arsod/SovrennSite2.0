"use client"
import { Typography,Box,Grid,List,ListItem,ListItemText,ListItemIcon,Button } from "@mui/material";
import React from "react";
import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/Check';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const StyledTypography1 = styled(Typography)`
font-weight:600;
font-size:34px;
line-height:40px;
@media (max-width:700px)
{
  font-weight:600;
font-size:23px;
line-height:28px;
}

`;

const StyledTypography2 = styled(Typography)`
font-weight:400;
font-size:20px;
line-height:24px;
@media (max-width:700px)
{
  font-weight:400;
font-size:12px;
line-height:14px;
}

`;
const StyledListItemText = styled(ListItemText)`
color:#667085;
`;

const StyledButton1 = styled(Button)`
font-weight:600;
font-size:14px;
line-height:24px;
text-transform:none;
:hover {
  background-color: #20365B;
  color:white;
  border-color:#20365B;
  outline:#1DA098;
};
 
`;

const StyledButton2 = styled(Button)`
color: white;
background-color:#1DA098;
line-height:24px;
text-transform:none;
:hover {
  background-color:#1DA098;
 
  border-color:#1DA098;
  outline:#1DA098
};
 
`;



const sovreenOfferArray=[
  {
    imagePath:"/content.svg",
    Info:{
      heading:"Sovreen discovery",
      listItems:["Daily updates on","Daily updates on","Daily updates on"],
      
    },
    button:{
      first:"Read Free Unlimited Articles",
      second:"Buy Full Access @ ₹5000/yr"
    }
  }
  
]
const Offer=()=>{
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return(
    <Box marginTop={3} sx={{backgroundImage: `url('/rectangle.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',}}>
      <Grid container spacing={2} direction="column" justifyContent='center' alignItems='center' >
        <Grid item> 
        <Typography sx={{textAlign:'center'}}>
        <StyledTypography1 component="span" color="#0D1726" marginRight={1} >This is What we offer</StyledTypography1>
       <StyledTypography1 component="span" color="#1DA098" >You</StyledTypography1>

        </Typography>
      
        </Grid>
        
        <Grid item paddingX={2}> 
       <StyledTypography2 component="div" color="#627B8F">Here is everything that you will get from Sovrenn</StyledTypography2>
        </Grid>
        {
          sovreenOfferArray.map((element,index)=>{
            return(
              <Grid container paddingTop={4} justifyContent="center" key={index} >
              <Grid item xs={12} md={6} >
                <Box  paddingLeft={3} >
                <Image src={element.imagePath} alt="..." 
              width={560}
              height={392}
              layout="responsive"
              />
                </Box>
             
              </Grid>
              <Grid item marginTop={1}> 
              <Grid container justifyContent='center' alignItems='center'>
                <Grid item>
                <StyledTypography1 color="#0D1726">
                {element.Info.heading}
               </StyledTypography1>
               <Grid container direction='column'>
               <Grid item>
               <List>
                {
                  element.Info.listItems.map((item,index)=>{
                    return(
<ListItem key={index}>
                <ListItemIcon>
               
              <CheckIcon fontSize="large" sx={{color:"#1DA098",backgroundColor: '#B9E2DF', // Background color
            borderRadius: '50%', 
            padding: '8px' }}/>
           
                </ListItemIcon>
            
            <StyledListItemText id="" primary={item} />
            
          </ListItem>
                    )
                  })
                }
               
           
        </List>
               </Grid>
               <Grid item>
                <Grid container my={2}>
                  {/* <Grid item >
                  <StyledButton1 variant="outlined"  sx={{ borderColor:"#20365B", color: '#20365B',padding:"6px"}}>{element.button.first}</StyledButton1>
                    </Grid> */}
                    <Grid item>
                    <StyledButton2 variant="contained"  >{element.button.second}</StyledButton2>
                    </Grid>
                </Grid>
              
              
                </Grid>
               </Grid>

                </Grid>
              </Grid>
              
               
              </Grid>
    
            </Grid>
            )
          })
        }
       

      </Grid>
      </Box>
  )
}

export default Offer;