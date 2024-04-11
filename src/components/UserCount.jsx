"use client"
import React from "react";
import { Grid, Typography,IconButton ,Paper} from "@mui/material";
import styled from "@emotion/styled";

import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
const UserCount=()=>{
  const analyticsArray=[
    {
      icon:  <PersonOutlineSharpIcon  sx={{fontSize:'60px',fontWeight:'300'}}/>,
      heading:"15k+ Daily Readers",
    },
    {
      icon:  <ImportContactsOutlinedIcon  sx={{fontSize:'60px',fontWeight:'300'}}/>,
      heading:"1k+ Articles with daily updates",
    },
    {
      icon:  <GroupOutlinedIcon sx={{fontSize:'60px',fontWeight:'300'}}/>,
      heading:"Community of 10k+ Investors",
    },
    {
      icon:  <PlayArrowOutlinedIcon sx={{fontSize:'60px',fontWeight:'300'}}/>,
      heading:"4.9 Rating on Playstore",
    }


  ];

  const StyledTypography1=styled(Typography)`
  font-size:23px;
  font-weight:600;
  line-height:28px


@media (max-width:700px)
{
  font-size:19px;
      
}


`;

  return(

<Grid container 
  alignItems="center" justifyContent="center"   direction="row" paddingX={{xs:6,lg:12}} paddingY={3} >
  
    {
      analyticsArray.map((element,index)=>{
        return (
          <Grid item xs={12} sm={3} key={index}>
<Grid container  direction='column'   alignItems='center' height="20vh" >
   <Grid item>
   <IconButton sx={{ color: '#627B8F' }} >
      {element.icon}
    </IconButton>
   </Grid>
   <Grid item>
   <Typography color='#0D1726' align="center" sx={{fontSize:'23px',fontWeight:600,lineHeight:'28px'}}>{element.heading}</Typography>
   </Grid>
    
  
 
</Grid>
</Grid>
        )
      })
    }
  
  

</Grid>


    


  );
}
export default UserCount;