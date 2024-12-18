"use client"
import {
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  IconButton,
  useTheme,
  Fade,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import CheckIcon from "@mui/icons-material/Check";
import Image from "next/image";
import { colors } from "../Constants/colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { sovreenOfferArray } from "@/utils/Data";
import { useSelector } from "react-redux";

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

const StyledTypography3 = styled(Typography)`
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #667085;
`;

const StyledListItemText = styled(ListItemText)`
  color: #667085;
  font-size: 12px;
  @media (max-width: 700px) {
    font-weight: 400;
    line-height: 14px;
  }
`;

const StyledButton1 = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  background-color:white;
  text-transform: none;
  :hover {
    background-color: ${colors.blueButtonHover};
    border-color: ${colors.blueButtonHover};
    color: ${colors.white};
    outline: ${colors.blueButtonHover};
  }
  @media (max-width: 620px) {
    font-size: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    line-height: 19px;
  }
`;

const StyledButton2 = styled(Button)`
  color: white;
  background-color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-transform: none;
  padding-top: 8px;
  padding-bottom: 8px;
  :hover {
    background-color: ${colors.themeButtonHover};
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
  @media (max-width: 620px) {
    font-size: 16px;
    padding-top: 10px;
    padding-bottom: 10px;
    line-height: 19px;
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

const Offer = () => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const {isAuth,userDetails } = useSelector(
    (store) => store.auth
  );
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sovreenOfferArray.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sovreenOfferArray.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const StyledIconButton = styled(IconButton)`
    && {
      background-color: ${colors.white};
      &:hover {
        background-color: ${colors.white};
      }
    }
  `;

  const [inView, setInView] = useState(false);
  const ref = useRef(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url('/rectangle.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid
        container
        paddingY={{ xs: "10px", sm: 5 }}
       
        direction="column"
        justifyContent="center"
      >
        <Grid itemID="">
          <FadeInBox ref={domRef} className={isVisible ? "visible" : ""}>
            <Typography sx={{ textAlign: "center" }}  marginBottom={{xs:1,sm:"20px"}}>
              <StyledTypography1 component="span" color="#0D1726" marginRight={1}>
                This is What we offer
              </StyledTypography1>
              <StyledTypography1 component="span" color={colors.themeGreen}>
                You
              </StyledTypography1>
            </Typography>
            <StyledTypography2 component="div" color="#627B8F" textAlign="center" paddingX={2}>
              Here is everything that you will get from Sovrenn
            </StyledTypography2>
          </FadeInBox>
        </Grid>
        <Fade in={inView} timeout={1000}>
          <Grid container ref={ref} sx={{ opacity: inView ? 1 : 0 }} justifyContent="center">
            <Box sx={{ position: "relative", overflow: "hidden", width: "100%" }}>
            <Box sx={{display:{xs:"flex",sm:"none",md:"none"},justifyContent:'center'}} marginTop={3}>
        <StyledIconButton
                  onClick={prevSlide}
                sx={{backgroundColor:colors.white,borderRadius:"50%",height:"38px",position:"relative",right:"1vw"}} >
                  <ArrowBackIcon sx={{color:colors.navyBlue500}}/>
                </StyledIconButton>
                <StyledIconButton
                 onClick={nextSlide}
                sx={{backgroundColor:colors.white,borderRadius:"50%",height:"38px",position:"relative",left:"1vw"}} >
                  <ArrowForwardIcon sx={{color:colors.navyBlue500}}/>
                </StyledIconButton>
        </Box>
              <Box
                sx={{
                  display: "flex",
                  transition: "transform 0.5s ease-in-out",
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {sovreenOfferArray.map((element, index) => (
                  <Box
                    key={index}
                    sx={{
                      minWidth: "100%",
                      boxSizing: "border-box",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                   paddingLeft={6}
                    display={index === currentIndex ? "block" : "none"}
                  >
                    <Grid
                      container
                      paddingTop={4}
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                      direction={{ xs: "column", sm: "row" }}
                      width="100vw"
                    >
                      <Grid
                        item
                        xs={5}
                        sm={5.5}
                        md={4.8}
                        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        marginTop={{ xs: 0, sm: 0 }}
                        paddingRight={3}
                      >
                        <Image
                          src={element?.imagePath}
                          alt="offer"
                          width={550}
                          height={351}
                          layout="responsive"
                          priority
                        />
                      </Grid>
                      <Grid item>
              <Box sx={{ width: '100%', display: {xs:"flex",sm:"none"}, justifyContent: 'center'  }} marginBottom={3}>
        {sovreenOfferArray.map((_, index) => (
          <IconButton
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              padding: theme.spacing(0.5),
              color: currentIndex === index ? colors.themeGreen : colors.navyBlue200,
            }}
          >
            <Box
              sx={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: currentIndex === index ? colors.themeGreen : colors.navyBlue200,
              }}
            ></Box>
          </IconButton>
        ))}
      </Box>
              </Grid>
                      <Grid item marginTop={1} sm={5.5} sx={{ display: "flex", alignItems: "center" }}>
                        <Grid container justifyContent="center" alignItems="center">
                          <Grid item>
                            <StyledTypography1 color="#0D1726">
                              {element.Info.heading}
                            </StyledTypography1>
                            <Grid container direction="column">
                              <Grid item>
                                <List>
                                  {element.Info.listItems.map((item, index) => (
                                    <ListItem key={index}>
                                      <ListItemIcon>
                                        <CheckIcon
                                          fontSize="medium"
                                          sx={{
                                            color: colors.themeGreen,
                                            backgroundColor: "#B9E2DF",
                                            borderRadius: "50%",
                                            padding: "4px",
                                          }}
                                        />
                                      </ListItemIcon>
                                      <StyledTypography3>{item}</StyledTypography3>
                                    </ListItem>
                                  ))}
                                </List>
                              </Grid>
                              <Grid item>
                                <Grid container my={2} gap={2} direction={{ xs: "column", md: "row" }}>
                                  {/* <Grid item>
                                    <StyledButton1
                                      variant="outlined"
                                      sx={{
                                        borderColor: colors.navyBlue500,
                                        color: colors.navyBlue500,
                                        padding: "8px",
                                      }}
                                    >
                                      {element.button.first}
                                    </StyledButton1>
                                  </Grid> */}
                                  {
                                    !isAuth || userDetails?.subscriptions.length==0 ? <Grid item>
                                    <StyledButton2 variant="contained">
                                    {`Buy Full Access @ ₹4500/yr`}
                                    </StyledButton2>
                                  </Grid>:
                                    (userDetails?.subscriptions?.includes("full-access") ||
                                    userDetails?.subscriptions?.includes("life")) && isAuth ? "" :
                                    ""
                                  }
                                  
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
              <StyledIconButton
                onClick={prevSlide}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50px",
                  transform: "translateY(-50%)",
                  backgroundColor: colors.white,
                  borderRadius: "50%",
                  height: "38px",
                  display: { xs: "none", md: "block" },
                }}
              >
                <ArrowBackIcon sx={{ color: colors.navyBlue500 }} />
              </StyledIconButton>
              <StyledIconButton
                onClick={nextSlide}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: "50px",
                  transform: "translateY(-50%)",
                  backgroundColor: colors.white,
                  borderRadius: "50%",
                  height: "38px",
                  display: { xs: "none", md: "block" },
                }}
              >
                <ArrowForwardIcon sx={{ color: colors.navyBlue500 }} />
              </StyledIconButton>
            </Box>
            <Grid item>
              <Box sx={{ display: { xs: "none", sm: "flex", md: "none" }, justifyContent: "center" }} marginBottom={2}>
                <StyledIconButton
                  onClick={prevSlide}
                  sx={{
                    backgroundColor: colors.white,
                    borderRadius: "50%",
                    height: "38px",
                    position: "relative",
                    right: "1vw",
                  }}
                >
                  <ArrowBackIcon sx={{ color: colors.navyBlue500 }} />
                </StyledIconButton>
                <StyledIconButton
                  onClick={nextSlide}
                  sx={{
                    backgroundColor: colors.white,
                    borderRadius: "50%",
                    height: "38px",
                    position: "relative",
                    left: "1vw",
                  }}
                >
                  <ArrowForwardIcon sx={{ color: colors.navyBlue500 }} />
                </StyledIconButton>
              </Box>
              <Box sx={{ width: "100%", display: { xs: "none", sm: "flex" }, justifyContent: "center", position: "relative", bottom: "8px" }}>
                {sovreenOfferArray.map((_, index) => (
                  <IconButton
                    key={index}
                    onClick={() => goToSlide(index)}
                    sx={{
                      padding: theme.spacing(0.5),
                      color: currentIndex === index ? colors.themeGreen : colors.navyBlue200,
                    }}
                  >
                    <Box
                      sx={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: currentIndex === index ? colors.themeGreen : colors.navyBlue200,
                      }}
                    ></Box>
                  </IconButton>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Fade>
      </Grid>
    </Box>
  );
};

export default Offer;