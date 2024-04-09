import { Grid, Typography, Avatar } from "@mui/material";
import React from "react";

const CustomerCard = ({ element }) => {
  return (
    <Grid
      container
      bgcolor="#E8F6F5"
      sx={{ height: "auto", width: "25vw", margin: "5px", borderRadius: "6px" }}
    >
      <Grid item padding={2}>
        <Grid container>
          <Grid item>
            <img src="/quotation.png" alt="..." />
            <Typography variant="body1" color="#0D1726">
             {
              element.description
             }
            </Typography>
            <Grid container spacing={3} marginTop={0}>
              <Grid item spacing={3}>
                <Avatar
                  alt="Rounded Image"
                  src={element.imagePath}
                  sx={{ borderRadius: "50%" }}
                />
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <Typography
                      component="div"
                      color="#0D1726"
                      sx={{
                        fontWeight: "600",
                        fontSize: "23px",
                        lineHeight: "28px",
                      }}
                    >
                      {element.name}
                    </Typography>
                    <Typography
                      component="div"
                      color="#666666"
                      sx={{
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "17px",
                      }}
                    >
                      {element.date}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomerCard;
