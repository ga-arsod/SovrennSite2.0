import React from "react";
import { Typography,Box ,Grid} from "@mui/material";
const Information=()=>{
  return(
<>
<Box m={6}>
  <Grid container justifyContent="center" alignItems="center" spacing={1}>
    <Grid item>
    <Typography component="span" textAlign="center" marginRight={1} color="#0D1726" sx={{fontWeight:"600",fontSize:"34px",lineHeight:"40px"}}>
  Everything You Need to Know About 
  </Typography>
  <Typography component="span"  color="#1DA098" sx={{fontWeight:"600",fontSize:"34px",lineHeight:"40px"}}>
  Sovreen
  </Typography>
    </Grid>
    <Grid item >
    <Typography component="span" justifyContent="center" wrap="wrap"  color="#627B8F" sx={{fontWeight:"400",fontSize:"20px",lineHeight:"24px"}}>
    Here is a video that will quickly enable you to understand what you can expect 
  </Typography>
  <Typography component="div" textAlign="center" wrap="wrap"  color="#627B8F" sx={{fontWeight:"400",fontSize:"20px",lineHeight:"24px"}}>
  from Sovrenn.
  </Typography>
  
    </Grid>
    <Grid item>
    <img src="/green.svg" alt="..." sx={{ Width: 'auto',
    height: 'auto',}}/>
    </Grid>
 
  </Grid>
</Box>
</>
  )
}
export default Information;