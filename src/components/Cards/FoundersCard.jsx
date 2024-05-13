import { Grid, Avatar, Typography, IconButton } from "@mui/material";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";

const FoundersCard = ({ item }) => {
  return (
    <Grid item padding={4} xs={12} md={6} sx={{position:'relative'}}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent='center'
        paddingX={{xs:1,sm:3}}
       
      >
        <Grid item  sx={{ borderRadius: "50%",overflow:'hidden'}}>
          <Image
          width={110}
          height={110}
            alt="Rounded Image"
            src={item.imagePath}
         
          />
        </Grid>
        <Grid item marginTop="12px">
          <Typography
            textAlign="center"
            component="div"
            sx={{ fontWeight: "600", fontSize: "20px", lineHeight: "24px" }}
          >
            {item.name}
          </Typography>
          <Typography
            textAlign="center"
            component="div"
            color="#105854"
            sx={{ fontWeight: "400", fontSize: "18px", lineHeight: "21px" }}
            gutterBottom
          >
            {item.position}
          </Typography>

          <Grid item paddingY={2}>
            <Typography
              component="div"
              justifyContent="center"
              color="#4D5E7C"
              textAlign="justify"
              sx={{ fontWeight: "400", fontSize: "16px", lineHeight: "19px",textJustify:'center' }}
              
            >
             {item.description}
            </Typography>
          </Grid>
          <Grid container justifyContent="center" alignItems='center' sx={{position:'absolute',bottom:'4px'}} width="80%" >
            <Grid item component="span">
              <IconButton sx={{ color: "#98A2B3" }}>
                <TwitterIcon />
              </IconButton>
            </Grid>
            <Grid item component="span">
              <IconButton sx={{ color: "#98A2B3" }}>
                <LinkedInIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default FoundersCard;
