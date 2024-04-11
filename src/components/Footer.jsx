"use client"
import styled from "@emotion/styled";
import { Box ,Grid,ListItem,ListItemText,ListHeader,List, Typography,ListSubheader,IconButton} from "@mui/material";
import React from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import Image from "next/image";

const listArray=[
  {
    products:[{
      name:"Prime Articles",
      hot:false,
    },
    {
      name:"Sovreen Times",
      hot:false,
    },
    {
      name:"Knowledge",
      hot:true,
    },
    {
      name:"IPO",
      hot:false,
    },
    {
      name:"Education",
      hot:false,
    }
  ]
  },
  {
    company:["About us","News","Contact us"],

  },
  {
    legal:["Terms & Conditions","Privacy Policy","Refund Policy"],
    
  }
  
]
const iconsArray=[{icon:<TwitterIcon/>},{icon:<LinkedInIcon/>},{icon:<YouTubeIcon/>},{icon:<InstagramIcon/>}]
const StyledSubheader = styled(ListSubheader)`
  background-color: transparent;
  color:#96A7B4;
  font-weight:600;
  font-size:14px;
  line-height:17px;
`;

const StyledBox = styled(Box)`
@media (max-width:700px)
{
  visibility:hidden;
}
`;

const Footer=()=>{
  return(
    <Box bgcolor='#0D1726' height='70vh' sx={{position:"relative"}}>
      <StyledBox>
      <Grid container  justifyContent='space-between'  sx={{position:"absolute",bottom:'6rem'}} paddingX={18}>

<Grid item  >

<List

subheader={
  <StyledSubheader component="div" id="nested-list-subheader">
   Product
  </StyledSubheader>
}

>

{
listArray[0].products.map((item,index)=>{
  return(<>
   
    <ListItem key={index}>
      <Typography color='#E4E7EC' marginRight={1} sx={{fontWeight: '400', fontSize:"16px",lineHeight:"19px"}}>
        {item.name}
      </Typography>
      <Box sx={{bgcolor:"#F2F4F7",visibility:item.hot ? "":"hidden",borderRadius:"15px"}}>
      <Typography color='#344054' sx={{fontWeight: '500', fontSize:"12px",lineHeight:"18px",paddingX:"8px",paddingY:"4px"
          }}>New</Typography>
      </Box>
      
    
    </ListItem>
    </>

  )
})
}


</List>
</Grid>
<Grid item  >

<List

subheader={
  <StyledSubheader component="div" id="nested-list-subheader">
  Company
  </StyledSubheader>
}

>

{
listArray[1].company.map((item,index)=>{
  return(<>
   
    <ListItem key={index}>
      <Typography color='#E4E7EC' marginRight={1} sx={{fontWeight: '400', fontSize:"16px",lineHeight:"19px"}}>
        {item}
      </Typography>
      
      
    
    </ListItem>
    </>

  )
})
}


</List>
</Grid>
<Grid item  >

<List

subheader={
  <StyledSubheader component="div" id="nested-list-subheader">
 Legal
  </StyledSubheader>
}

>

{
listArray[2].legal.map((item,index)=>{
  return(<>
   
    <ListItem key={index}>
      <Typography color='#E4E7EC' marginRight={1} sx={{fontWeight: '400', fontSize:"16px",lineHeight:"19px"}}>
        {item}
      </Typography>
      
      
    
    </ListItem>
    </>

  )
})
}


</List>
</Grid>
<Grid item>
  <Grid container color='white' direction='column' spacing={1}>
    <Grid item>
     <Typography sx={{fontWeight:'600',fontSize:'14px',lineHeight:'17px'}}>Get the app</Typography>
    </Grid>
    <Grid item>
    <Image src="/appStore2.png"
    width={135}
    height={40}
    alt="..." />
    </Grid>
    <Grid item>
    <Image src="/playStore2.png"
    width={135}
    height={40}
    alt="..." />
    </Grid>

  </Grid>

</Grid>

</Grid>
<Grid container justifyContent='space-between' paddingX={18} alignItems='center' sx={{position:"absolute",bottom:'2rem'}}>
<Grid item>
<Typography color='#8195A5' sx={{fontWeight:'600',fontSize:'16px',lineHeight:'19px'}}>
© 2023 by Sovrenn Financial Technologies Pvt Ltd
</Typography>
</Grid>
<Grid item>
<Grid container>
  {
    iconsArray.map((item,index)=>{
      return(
        <Grid item key={index}>
        <IconButton sx={{ color: '#98A2B3' }} >
   {item.icon}
</IconButton>
        </Grid>
      )
    })
   
  }



</Grid>

</Grid>

</Grid>

      </StyledBox>
      
   

  </Box>

  )
  
  
  

}

export default Footer;