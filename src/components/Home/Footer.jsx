// "use client";
// import styled from "@emotion/styled";
// import {
//   Box,
//   Grid,
//   ListItem,
//   ListItemText,
//   ListHeader,
//   List,
//   Typography,
//   ListSubheader,
//   IconButton,
// } from "@mui/material";
// import React from "react";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { colors } from "../Constants/colors";
// import Link from "next/link";

// const listArray = [
//   {
//     products: [
//       {
//         name: "Prime Articles",
//         hot: false,
//       },
//       {
//         name: "Sovreen Times",
//         hot: false,
//       },
//       {
//         name: "Knowledge",
//         hot: true,
//       },
//       {
//         name: "IPO",
//         hot: false,
//       },
//       {
//         name: "Education",
//         hot: false,
//       },
//     ],
//   },
//   {
//     company: ["About us", "News", "Contact us"],
//   },
//   {
//     legal: ["Terms & Conditions", "Privacy Policy", "Refund Policy"],
//   },
// ];
// const iconsArray = [
//   { icon: <TwitterIcon />, handle: "https://x.com/sovrennofficial" },
//   {
//     icon: <LinkedInIcon />,
//     handle: "https://www.linkedin.com/company/sovrenn",
//   },
//   { icon: <YouTubeIcon />, handle: "https://www.youtube.com/@aditya_joshi12" },
//   {
//     icon: <InstagramIcon />,
//     handle: "https://instagram.com/sovrennofficial?igshid=YWJhMjlhZTc=",
//   },
// ];
// const StyledSubheader = styled(ListSubheader)`
//   background-color: transparent;
//   color: #96a7b4;
//   font-weight: 600;
//   font-size: 14px;
//   line-height: 17px;
// `;

// const StyledBox = styled(Box)`
//   @media (max-width: 639px) {
//     display: none;
//   }
// `;

// const Footer = () => {
//   const pathname = usePathname();
//   const showFooter=!['/login'].includes(pathname)
//   return (
//     <>
//       {showFooter && (
//         <StyledBox
//           bgcolor={colors.navyBlue900}
//           height={{
//             xs: "50vh",
//             sm: pathname === "/" ? "60vh" : "50vh",
//             md: pathname === "/" ? "40vh" : "58vh",
//             lg: pathname === "/" ? "90vh" : "65vh",
//           }}
//           sx={{ position: "relative" }}
//         >
//           <Grid
//             container
//             justifyContent="space-between"
//             width={{ xs: "100%", sm: "80%", md: "100%" }}
//             sx={{ position: "absolute", bottom: "6rem" }}
//             paddingX={{ xs: 4, sm: 6, md: 8 }}
//           >
//             <Grid item order={1}>
//               <List
//                 subheader={
//                   <StyledSubheader component="div" id="nested-list-subheader">
//                     Product
//                   </StyledSubheader>
//                 }
//               >
//                 {listArray[0].products.map((item, index) => {
//                   return (
//                     <>
//                       <ListItem key={index}>
//                         <Typography
//                           color="#E4E7EC"
//                           marginRight={1}
//                           sx={{
//                             fontWeight: "400",
//                             fontSize: "16px",
//                             lineHeight: "19px",
//                           }}
//                         >
//                           {item.name}
//                         </Typography>
//                         <Box
//                           sx={{
//                             bgcolor: "#F2F4F7",
//                             visibility: item.hot ? "" : "hidden",
//                             borderRadius: "15px",
//                           }}
//                         >
//                           <Typography
//                             color="#344054"
//                             sx={{
//                               fontWeight: "500",
//                               fontSize: "12px",
//                               lineHeight: "18px",
//                               paddingX: "8px",
//                               paddingY: "4px",
//                             }}
//                           >
//                             New
//                           </Typography>
//                         </Box>
//                       </ListItem>
//                     </>
//                   );
//                 })}
//               </List>
//             </Grid>
//             <Grid item order={2}>
//               <List
//                 subheader={
//                   <StyledSubheader component="div" id="nested-list-subheader">
//                     Company
//                   </StyledSubheader>
//                 }
//               >
//                 {listArray[1].company.map((item, index) => {
//                   return (
//                     <>
//                       <ListItem key={index}>
//                         <Typography
//                           color="#E4E7EC"
//                           marginRight={1}
//                           sx={{
//                             fontWeight: "400",
//                             fontSize: "16px",
//                             lineHeight: "19px",
//                           }}
//                         >
//                           {item}
//                         </Typography>
//                       </ListItem>
//                     </>
//                   );
//                 })}
//               </List>
//             </Grid>
//             <Grid
//               item
//               order={{ xs: 4, md: 3 }}
//               sm={12}
//               xs={3}
//               md={3}
//               lg={3}
//               marginTop={{ xs: 0, sm: 3, md: 0 }}
//             >
//               <List
//                 subheader={
//                   <StyledSubheader component="div" id="nested-list-subheader">
//                     Legal
//                   </StyledSubheader>
//                 }
//               >
//                 {listArray[2].legal.map((item, index) => {
//                   return (
//                     <>
//                       <ListItem key={index}>
//                         <Typography
//                           color="#E4E7EC"
//                           marginRight={1}
//                           sx={{
//                             fontWeight: "400",
//                             fontSize: "16px",
//                             lineHeight: "19px",
//                           }}
//                         >
//                           {item}
//                         </Typography>
//                       </ListItem>
//                     </>
//                   );
//                 })}
//               </List>
//             </Grid>
//             <Grid item order={{ xs: 3, md: 4 }}>
//               <Grid container color="white" direction="column" spacing={1}>
//                 <Grid item>
//                   <Typography
//                     sx={{
//                       fontWeight: "600",
//                       fontSize: "14px",
//                       lineHeight: "17px",
//                     }}
//                   >
//                     Get the app
//                   </Typography>
//                 </Grid>
//                 <Grid item>
//                   <Image
//                     src="/appStore2.png"
//                     width={135}
//                     height={40}
//                     alt="..."
//                   />
//                 </Grid>
//                 <Grid item>
//                   <Image
//                     src="/playStore2.png"
//                     width={135}
//                     height={40}
//                     alt="..."
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid
//             container
//             justifyContent="space-between"
//             paddingX={{ xs: 4, md: 8 }}
//             alignItems="center"
//             sx={{ position: "absolute", bottom: "2rem" }}
//             marginBottom={1}
//           >
//             <Grid item>
//               <Typography
//                 color="#8195A5"
//                 sx={{ fontWeight: "600", fontSize: "16px", lineHeight: "19px" }}
//               >
//                 © 2023 by Sovrenn Financial Technologies Pvt Ltd
//               </Typography>
//             </Grid>
//             <Grid item>
//               <Grid container>
//                 {iconsArray.map((item, index) => {
//                   return (
//                     <Grid item key={index}>
//                       <Link href={item.handle} passHref>
//                         <IconButton sx={{ color: "#98A2B3" }}>
//                           {item.icon}
//                         </IconButton>
//                       </Link>
//                     </Grid>
//                   );
//                 })}
//               </Grid>
//             </Grid>
//           </Grid>
//         </StyledBox>
//       )}
//     </>
//   );
// };

// export default Footer;


"use client";
import styled from "@emotion/styled";
import {
  Box,
  Grid,
  ListItem,
  ListItemText,
  ListHeader,
  List,
  Typography,
  ListSubheader,
  IconButton,
} from "@mui/material";
import React from "react";

import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const listArray = [
  {
    products: [
      {
        name: "Prime Articles",
        url: "/prime",
        hot: false,
      },
      {
        name: "Sovrenn Times",
        url: "/times",
        hot: false,
      },
      {
        name: "Knowledge",
        url: "/knowledge",
        hot: true,
      },
      {
        name: "IPO",
        url: "/ipo-zone",
        hot: false,
      },
      {
        name: "Education",
        url: "/education",
        hot: false,
      },
    ],
  },
  {
    company: ["About us", "News", "Contact us"],
  },
  {
    legal: [
      {
        name: "Terms & Conditions",
        url: "/terms-and-conditions",
      },
      {
        name: "Privacy Policy",
        url: "/privacy-policy",
      },
      {
        name: "Refund Policy",
        url: "/refund-policy",
      },
    ],
  },
];

const iconsArray = [
  {
    icon: <TwitterIcon />,
    handle: "https://x.com/sovrennofficial",
  },
  {
    icon: <LinkedInIcon />,
    handle: "https://www.linkedin.com/company/sovrenn",
  },
  {
    icon: <YouTubeIcon />,
    handle: "https://www.youtube.com/@aditya_joshi12",
  },
  {
    icon: <InstagramIcon />,
    handle: "https://instagram.com/sovrennofficial?igshid=YWJhMjlhZTc=",
  },
];

const StyledSubheader = styled(ListSubheader)`
  background-color: transparent;
  color: #96a7b4;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

const Footer = () => {
  const pathname = usePathname();
  const theme=useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
    {
      !isXsScreen && <Grid container justifyContent="center" bgcolor="#000910">
      <Grid item width={{ xs: "100%", sm: "80%", lg: "1280px" }}>
        <Box
          height={{
            xs: "765px",
           
            sm: "650px",
            md:"480px",
            
          }}
          sx={{ position: "relative" }}
          id="target-section"
          width={{ xs: "100%", md: "90%", lg: "1280px" }}
        >
          <Grid
            container
            justifyContent="space-between"
            sx={{ position: "absolute", bottom: { xs: "13rem", sm: "9rem" } }}
            paddingX={{ xs: 1, sm: 4, md: 6, lg: 8 }}
          >
            <Grid item order={1}  marginTop={{ xs: 3, lg: 0 }}>
              <List
                subheader={
                  <StyledSubheader component="div" id="nested-list-subheader">
                    Product
                  </StyledSubheader>
                }
              >
                {listArray[0].products.map((item, index) => {
                  return (
                    <Link
                      href={item.url}
                      passHref
                      key={index}
                       target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <ListItem>
                        <Typography
                          color="#E4E7EC"
                          marginRight={1}
                          sx={{
                            fontWeight: "400",
                            fontSize: "16px",
                            lineHeight: "19px",
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Box
                          sx={{
                            bgcolor: "#F2F4F7",
                            visibility: item.hot ? "" : "hidden",
                            borderRadius: "15px",
                          }}
                        >
                          <Typography
                            color="#344054"
                            sx={{
                              fontWeight: "500",
                              fontSize: "12px",
                              lineHeight: "18px",
                              paddingX: "8px",
                              paddingY: "4px",
                            }}
                          >
                            New
                          </Typography>
                        </Box>
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </Grid>
            <Grid item order={2} xs={12} sm={3} marginTop={{ xs: 3, lg: 0 }}>
          <List
            subheader={
              <StyledSubheader component="div" id="nested-list-subheader">
                Company
              </StyledSubheader>
            }
          >
            {listArray[1].company.map((item, index) => {
              return (
                <ListItem key={index}>
                  <Typography
                    color="#E4E7EC"
                    marginRight={1}
                    sx={{
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "19px",
                    }}
                  >
                    {item}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </Grid>
            <Grid
              item
              order={{ xs: 4, lg: 3 }}
              
             
              marginTop={{ xs: 3, lg: 0 }}
            >
              <List
                subheader={
                  <StyledSubheader component="div" id="nested-list-subheader">
                    Legal
                  </StyledSubheader>
                }
              >
                {listArray[2].legal.map((item, index) => {
                  return (
                    <Link
                      href={item.url}
                       target="_blank"
                      passHref
                      key={index}
                      style={{ textDecoration: "none" }}
                    >
                      <ListItem>
                        <Typography
                          color="#E4E7EC"
                          marginRight={1}
                          sx={{
                            fontWeight: "400",
                            fontSize: "16px",
                            lineHeight: "19px",
                          }}
                        >
                          {item.name}
                        </Typography>
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </Grid>
            <Grid
              item
              order={{ xs: 3, lg: 4 }}
            
              marginTop={{ xs: 3, lg: 0 }}
              paddingX={{ xs: 1.6, sm: 0 }}
            >
              <Grid container color="white" direction="column" spacing={1}>
                <Grid item>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                      lineHeight: "17px",
                      color: "white"
                    }}
                  >
                    Get the app
                  </Typography>
                </Grid>
                <Grid item>
                  <Link
                    href="https://apps.apple.com/us/app/sovrenn/id6450649929"
                    passHref
                     target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Image
                      src="/ios-app-link.png"
                      width={135}
                      height={40}
                      alt="..."
                    />
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.sovrenn&pli=1"
                    passHref
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Image
                      src="/mobile-app-link.png"
                      width={135}
                      height={40}
                      alt="..."
                    />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0.5}
            alignItems="flex-start"
            paddingX={{ xs: 3, sm: 4, md: 6, lg: 8 }}
            sx={{
              position: "absolute",
              bottom: { xs: "6rem", sm:'4rem', md: "3.5rem" },
            }}
          >
            <Grid item display="inline" xs={0.8} sm={0.5} md={0.2} >
              <ErrorOutlineIcon
                sx={{
                  color: "#8195A5",
                  padding: 0,
                  fontSize: { xs: "12px", sm: "16px" },
                }}
                marginBottom={3}
              />
            </Grid>
            <Grid item display="inline" xs={11.2} sm={11.5}  md={11.8} >
              <Typography
                color="#8195A5"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "12px", sm: "16px" },
                  lineHeight: "19px",
                }}
                marginBottom={4}
              >
                We do not provide any buy/sell recommendations or any tips.
                All information on this website is for informational purposes
                only.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            paddingX={{ xs: 3, sm: 4, md: 6, lg: 8 }}
            alignItems="center"
            sx={{ position: "absolute", bottom: "1rem" }}
            marginBottom={1}
            marginTop={3}
          >
            <Grid item>
              <Typography
                color="#8195A5"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "14px", sm: "16px" },
                  lineHeight: "19px",
                }}
              >
                © 2024 by Sovrenn Financial Technologies Pvt Ltd
              </Typography>
            </Grid>
            <Grid item>
              <Grid container>
                {iconsArray.map((item, index) => {
                  return (
                    <Grid item key={index}>
                      <Link
                        href={item.handle}
                        target="_blank"
                        passHref
                        style={{ textDecoration: "none" }}
                      >
                        <IconButton sx={{ color: "#98A2B3" }}>
                          {item.icon}
                        </IconButton>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
    }
      
    </>
  );
};

export default Footer;

