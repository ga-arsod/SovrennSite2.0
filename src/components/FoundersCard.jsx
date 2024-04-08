import { Grid ,Avatar,Typography,IconButton} from "@mui/material";
import React from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const FoundersCard=()=>{
  return(
    <Grid container justifyContent='center'>
      <Grid item padding={6}>
      <Grid container direction='column'  alignItems='center' sx={{height:"auto",width:"40vw"}}>
        <Grid item >
        <Avatar alt="Rounded Image" 
            src="/aditya.png"
             sx={{ borderRadius: '50%',width:"110px",height:"110px" }} />
        </Grid>
        <Grid item  marginTop='12px'>
         <Typography textAlign='center' component="div" sx={{ fontWeight:"600",fontSize:"20px" ,lineHeight:"24px" }}>Aditya Joshi</Typography>
         <Typography textAlign='center' component="div" color="#105854" sx={{ fontWeight:"400",fontSize:"18px" ,lineHeight:"21px" }} gutterBottom>Co-founder & CEO</Typography>
        
         <Grid item>
         <Typography component="div" justifyContent='center' color="#4D5E7C" sx={{ fontWeight:"400",fontSize:"16px" ,lineHeight:"19px" }}>Aditya Joshi is the co-founder and CEO at Sovrenn. Prior to starting up, he was a Senior Vice President at Stanza Living where he headed Growth Strategy. Prior to Stanza, he was Chief of Staff and Online Business Head at Lenskart. He has completed his MBA from IIM Calcutta and his B.Tech. from IIT Delhi where he was an Institute Silver Medallist. He believes in the values of compassion, honesty, perseverance and ambition.</Typography>
         </Grid>
         <Grid container justifyContent='center'>
          <Grid item component='span'>
          <IconButton sx={{ color: '#98A2B3' }} >
         <TwitterIcon/>
    </IconButton>
          </Grid>
          <Grid item component='span'>
          <IconButton sx={{ color: '#98A2B3' }} >
     <LinkedInIcon/>
    </IconButton>
          </Grid>
         </Grid>
        </Grid>
       
      </Grid>
     
      </Grid>
      <Grid item padding={6}>
      <Grid container direction='column'  alignItems='center' sx={{height:"auto",width:"40vw"}}>
        <Grid item >
        <Avatar alt="Rounded Image" 
            src="/akriti.png"
             sx={{ borderRadius: '50%',width:"110px",height:"110px" }} />
        </Grid>
        <Grid item  marginTop='12px'>
         <Typography textAlign='center' component="div" sx={{ fontWeight:"600",fontSize:"20px" ,lineHeight:"24px" }}>Aditya Joshi</Typography>
         <Typography textAlign='center' component="div" color="#105854" sx={{ fontWeight:"400",fontSize:"18px" ,lineHeight:"21px" }} gutterBottom>Co-founder & CEO</Typography>
        
         <Grid item>
         <Typography component="div" justifyContent='center' color="#4D5E7C" sx={{ fontWeight:"400",fontSize:"16px" ,lineHeight:"19px" }}>Aditya Joshi is the co-founder and CEO at Sovrenn. Prior to starting up, he was a Senior Vice President at Stanza Living where he headed Growth Strategy. Prior to Stanza, he was Chief of Staff and Online Business Head at Lenskart. He has completed his MBA from IIM Calcutta and his B.Tech. from IIT Delhi where he was an Institute Silver Medallist. He believes in the values of compassion, honesty, perseverance and ambition.</Typography>
         </Grid>
         <Grid container justifyContent='center'>
          <Grid item component='span'>
          <IconButton sx={{ color: '#98A2B3' }} >
         <TwitterIcon/>
    </IconButton>
          </Grid>
          <Grid item component='span'>
          <IconButton sx={{ color: '#98A2B3' }} >
     <LinkedInIcon/>
    </IconButton>
          </Grid>
         </Grid>
        </Grid>
       
      </Grid>
     
      </Grid>
    </Grid>
  )
}
export default FoundersCard;