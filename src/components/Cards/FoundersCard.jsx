import { Grid, Avatar, Typography, IconButton } from "@mui/material";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import { colors } from "../Constants/colors";
import { usePathname } from "next/navigation";
import Link from 'next/link'

const FoundersCard = ({ item }) => {
  const pathname=usePathname();
  return (
    <Grid item paddingY={{xs:"20px",sm:pathname==="/"?"6":"20px",md:6}} paddingX={{xs:4,sm:2,md:4}} xs={12} sm={pathname==="/" ? "6":"8"} sx={{position:'relative'}}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent='center'
        paddingX={{xs:1,sm:2,md:3}}
       
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
            color={colors.green800}
            sx={{ fontWeight: "400", fontSize: "18px", lineHeight: "21px" }}
            gutterBottom
          >
            {item.position}
          </Typography>

          <Grid item  marginBottom={9}>
            <Typography
              component="div"
              justifyContent="center"
              color="#4D5E7C"
              textAlign="center"
              sx={{ fontWeight: "400", fontSize: "16px", lineHeight: "19px",textJustify:'center' }}
              
            >
             {item.description}
            </Typography>
          </Grid>
          <Grid container justifyContent="center" alignItems='center' sx={{position:'absolute',bottom:{xs:"20px",sm:pathname=="/"?"48px":"20px",md:"48px"}}} width={pathname==="/" ? "80%" : "90%"} >
            <Grid item component="span">
              <Link href={item.twitter}  passHref target="_blank">
              <IconButton sx={{ color: "#98A2B3" }}>
                <TwitterIcon />
              </IconButton>
              </Link>
            </Grid>
            <Grid item component="span">
            <Link href={item.linkedin}  passHref target="_blank">
              <IconButton sx={{ color: "#98A2B3" }}>
                <LinkedInIcon />
              </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default FoundersCard;
