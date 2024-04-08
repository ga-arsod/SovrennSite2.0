"use client"
import { Typography,Box,Grid,List,ListItem,ListItemText,ListItemIcon,Button } from "@mui/material";
import React from "react";
import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/Check';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledTypography = styled(Typography)`
font-weight:600;
font-size:34px;
line-height:40px;
`;
const StyledListItemText = styled(ListItemText)`
color:#667085;
`;

const StyledButton = styled(Button)`
font-weight:600;
font-size:14px;
line-height:17px
 
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
    <Box sx={{backgroundImage: `url('/rectangle.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',}}>
      <Grid container spacing={2} direction="column" justifyContent='center' alignItems='center'>
        <Grid item> 
       <StyledTypography component="span" color="#0D1726" marginRight={1} >This is What we offer</StyledTypography>
       <Typography component="span" color="#1DA098" sx={{fontWeight:"600",fontSize:"34px",lineHeight:"40px"}}>You</Typography>
        </Grid>
        
        <Grid item> 
       <Typography component="div" color="#627B8F"  sx={{fontWeight:"400",fontSize:"20px",lineHeight:"24px"}}>Here is everything that you will get from Sovrenn</Typography>
        </Grid>
        {
          sovreenOfferArray.map((element)=>{
            return(
              <Grid container paddingTop={6} spacing={8} justifyContent="center">
              <Grid item>
              <img src={element.imagePath} alt="..." />
              </Grid>
              <Grid item marginTop={3}> 
               <StyledTypography color="#0D1726">
                {element.Info.heading}
               </StyledTypography>
               <Grid container direction='column'>
               <Grid item>
               <List>
                {
                  element.Info.listItems.map((item)=>{
                    return(
<ListItem>
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
                <Grid container spacing={2} my={2}>
                  <Grid item >
                  <StyledButton variant="outlined"  sx={{ borderColor:"#20365B", color: '#20365B',padding:"6px"}}>{element.button.first}</StyledButton>
                    </Grid>
                    <Grid item>
                    <StyledButton variant="contained"  sx={{ color: 'white',backgroundColor:"#1DA098",lineHeight:"35px" }}>{element.button.second}</StyledButton>
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