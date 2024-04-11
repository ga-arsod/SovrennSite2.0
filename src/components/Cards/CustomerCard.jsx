import { Grid, Typography ,Box} from "@mui/material";
import React from "react";
import Image from "next/image";
const CustomerCard = ({ element }) => {
  return (
    <Grid
      container
      bgcolor="#E8F6F5"
      sx={{ height: "auto", width:{xs:"70vw",sm:"50vw",md:"25vw"}, margin: "5px", borderRadius: "6px" }}
    >
      <Grid item padding={2}>
        <Grid container>
          <Grid item>
            <Image src="/quotation.png" alt="main-poster"
            width={75}
            height={47}
            />
           
            <Typography variant="body1" color="#0D1726">
             {
              element.description
             }
            </Typography>
            <Grid container spacing={3} marginTop={0} alignItems='center'>
              <Grid item spacing={3} >
                <Box display="flex" justifyContent='center' alignItems='center' sx={{ borderRadius:"50%",overflow:'hidden',width:'80px',height:'80px',backgroundColor:'white' }}>
                <Image
                  alt="Rounded Image"
                  width={80}
                  height={80}
                  src={element.imagePath}
                sx={{padding:"10px"}}
                />
                </Box>
                
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
