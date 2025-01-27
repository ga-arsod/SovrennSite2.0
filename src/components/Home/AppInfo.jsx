"use client"
import { Grid, Box, Typography, Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Image from "next/image";
import { colors } from "../Constants/colors";
import { Fade } from "@mui/material";
import Link from "next/link";
import ContactModal from "../Modal/ContactModal";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  @media (max-width: 700px) {
    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
  }
`;
const StyledButton = styled(Button)`
  :hover {
    background-color: ${colors.blueButtonHover};

    border-color: ${colors.blueButtonHover};
    outline: ${colors.blueButtonHover};
  }
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  @media (max-width: 700px) {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }
`;
const FadeInBox = styled(Box)(({ theme }) => ({
  opacity: 0,
  transform: "translateY(30px)",
  transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
  "&.visible": {
    opacity: 1,
    transform: "translateY(0)",
  },
}));
const AppInfo = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const [openContactModal, setOpenContactModal] = useState(false);
  

  const handleMailClick = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=help@sovrenn.com.com&su=Inquiry&body=Hi%20team,", 
      "_blank"
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  return (
    <>
    <ContactModal openContactModal={openContactModal} setOpenContactModal={setOpenContactModal}/>
    <Box backgroundColor="#F3FAFB" width="100%">
      <Grid
        container
        direction="column"
       
        justifyContent="center"
        paddingX={{ xs: 2, sm: 1, md: 2 }}
      >
        <Grid item>
          <FadeInBox ref={domRef} className={isVisible ? "visible" : ""}>
            <Grid
              container
              spacing={3}
              direction="column"
              alignItems="center"
              paddingY={{xs:"40px",sm:"48px"}}
            >
              <Grid item>
                <StyledTypography1
                  textAlign="center"
                  component="div"
                  color="#0D1726"
                  marginRight={1}
                  gutterBottom
                >
                  Still have questions?
                </StyledTypography1>
                <StyledTypography2
                  textAlign="center"
                  component="div"
                  color="#627B8F"
                  sx={{
                    fontWeight: "400",
                    fontSize: "20px",
                    lineHeight: "24px",
                  }}
                  marginBottom={1}
                >
                  Your Questions Matter, and We&apos;re Here to Help!
                </StyledTypography2>
              </Grid>

              <Grid item marginBottom={8}>
                <StyledButton
                  variant="contained"
                  startIcon={<MailOutlineIcon />}
                  onClick={()=>{setOpenContactModal(true)}}
                  sx={{
                    color: "white",
                    fontWeight: "600",
                    textTransform: "none",
                    fontSize: "16px",
                    backgroundColor: colors.navyBlue500,
                    lineHeight: "35px",
                  }}
                >
                  Write to Us
                </StyledButton>
              </Grid>
            </Grid>
          </FadeInBox>
        </Grid>
        <Grid item>
          <Fade in={inView} timeout={1000}>
            <Grid
              container
              spacing={5}
              justifyContent="space-evenly"
              alignItems="center"
              ref={ref}
              sx={{ opacity: inView ? 1 : 0 }}
              paddingTop={{xs:"20px",sm:6}}
              paddingBottom={{xs:"20px",sm:25}}
            >
              <Grid item>
                <Typography
                  textAlign={{ xs: "center", sm: "start" }}
                  component="div"
                  color="#0D1726"
                  sx={{
                    fontWeight: "600",
                    fontSize: "23px",
                    lineHeight: "28px",
                  }}
                  gutterBottom
                >
                  Experience the ease of Sovrenn with our mobile app
                </Typography>
                <Typography
                  textAlign={{ xs: "center", sm: "start" }}
                  component="div"
                  color="#627B8F"
                  sx={{
                    fontWeight: "400",
                    fontSize: { xs: "12px", sm: "16px" },
                    lineHeight: { xs: "14px", sm: "19px" },
                  }}
                >
                  simplify your investment journey and start investing at your
                  fingertips!
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  spacing={1}
                  direction={{ xs: "row", sm: "column" }}
                >
                  <Grid item>
                  <Link
                    href="https://apps.apple.com/us/app/sovrenn/id6450649929"
                    passHref
                     target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Image
                      src="/appstore3.png"
                      width={132}
                      height={44}
                      alt="play-store"
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
                      src="/mobilestore.png"
                      width={132}
                      height={44}
                      alt="app-store"
                    />
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Fade>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default AppInfo;
