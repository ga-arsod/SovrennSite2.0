import React from "react";
import { Box,Grid, Typography,IconButton ,Paper} from "@mui/material";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
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

  return(

<Grid container 
  alignItems="center" justifyContent="center" direction="row" spacing={10} >
  
    {
      analyticsArray.map((element,index)=>{
        return (
          <Grid item sx={{ width: 250, height: 250 }} key={index} marginTop={3}>
<Grid container  direction='column'  justifyContent='center'  alignItems='center' >
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