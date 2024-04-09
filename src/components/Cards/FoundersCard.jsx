import { Grid, Avatar, Typography, IconButton } from "@mui/material";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const FoundersCard = ({ item }) => {
  return (
    <Grid item padding={4}>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{ height: "auto", width: "40vw" }}
      >
        <Grid item>
          <Avatar
            alt="Rounded Image"
            src={item.imagePath}
            sx={{ borderRadius: "50%", width: "110px", height: "110px" }}
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

          <Grid item height='125px'>
            <Typography
              component="div"
              justifyContent="center"
              color="#4D5E7C"
              sx={{ fontWeight: "400", fontSize: "16px", lineHeight: "19px" }}
            >
             {item.description}
            </Typography>
          </Grid>
          <Grid container justifyContent="center" >
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
