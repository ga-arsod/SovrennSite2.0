import { Grid ,Typography,Avatar} from "@mui/material"
import React from "react"

const CustomerCard=()=>{
  return(
    <Grid container bgcolor='#E8F6F5' sx={{height:"auto",width:"25vw",margin:"5px",borderRadius:"6px"}}>
        <Grid item padding={2}>
          <Grid container>
           <Grid item>
           <img src="/quotation.png" alt="..." />
           <Typography variant="body1" color="#0D1726">I've been using Sovrenn for several years now, and I couldn't be happier with their services. The mobile banking app they provide is an absolute game-changer. It's incredibly user-friendly and has made managing my finances a breeze.</Typography>
           <Grid container spacing={3} marginTop={0}>
            <Grid item spacing={3}>
            
            <Avatar alt="Rounded Image" 
            src="https://images.unsplash.com/photo-1587778082149-bd5b1bf5d3fa?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
             sx={{ borderRadius: '50%' }} />
            </Grid>
            <Grid item>
              <Grid container>
              <Grid item>

              <Typography component="div" color="#0D1726"
               sx={{ fontWeight: "600", fontSize: "23px", lineHeight: "28px" }}
              >
           Jerry Helfer
          </Typography>
          <Typography
            component="div"
            color="#666666"
           
            sx={{ fontWeight: "400", fontSize: "14px", lineHeight: "17px" }}
          >
           24  Oct, 2023
          </Typography>
              </Grid>
              </Grid>
            </Grid>
           </Grid>
           </Grid>
          </Grid>

        </Grid>

      </Grid>
  )
}

export default CustomerCard;