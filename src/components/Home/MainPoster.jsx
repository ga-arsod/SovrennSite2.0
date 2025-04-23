"use client";
import styled from "@emotion/styled";
import { Grid, Typography, Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { androidAppLink } from "@/utils/Data";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { colors } from "../Constants/colors";
import { subscriptionDetailsApi } from "@/app/Redux/Slices/authSlice";
import moment from "moment";
import PaymentButton from "../Common/PaymentButton";
import LoginModal from "../Modal/LoginModal";
import Snackbar from "../Snackbar/SnackBar";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const headingsArray = [
  {
    h1: "MASTER",
    h2: "Investing",
  },
  {
    h1: "UNLOCK",
    h2: "Quality Insights",
  },
  {
    h1: "DISCOVER",
    h2: "High-Potential Stocks",
  },
];

const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: ${colors.themeGreen};
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding:12px 20px;
  text-transform: none;
  background-color: white;
 
  :hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
  @media (max-width: 639px) {
  width:100%;
   padding:12px 0px;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding:12px 20px;
  background-color: ${colors.themeGreen};
  text-transform: none;

 
  :hover {
    background-color: ${colors.themeButtonHover};
  }
  @media (max-width: 700px) {
  width:100%;
   padding-top:12px;
   padding-bottom:12px;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
   
  }
`;
const StyledButton3 = styled(Button)`
  color: black;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding-top: 7px;
  padding-bottom: 7px;
  background-color: #f8be5c;
  text-transform: none;

  width: 322px;
  :hover {
    background-color: #f8be5c;
  }
  @media (max-width: 639px) {
   width: 300px;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

const StyledTypography1 = styled(Typography)`
  color: ${colors.themeGreen};
  margin-right: 8px;

  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
  @media (min-width: 640px) and (max-width: 1024px) {
    font-size: 48px;
    font-weight: 700;
    letter-spacing: -0.04em;
  }
  @media (min-width: 1025px) {
    font-size: 48px;
    font-weight: 700;
    line-height: 56px;
    letter-spacing: -0.04em;
  }
`;

const StyledTyography2 = styled(Typography)`
  @media (max-width: 700px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
  @media (min-width: 701px) and (max-width: 1120px) {
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -0.04em;
  }
  @media (min-width: 1121px) {
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -0.04em;
  }
`;

const StyledTyography3 = styled(Typography)`
  @media (max-width: 1100px) {
    text-align: center;
  }
`;
const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInFromBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const SlideInLeftBox = styled(Grid)`
  opacity: 0;
  &.animate {
    animation: ${slideInFromLeft} 1s ease-out forwards;
  }
`;

const SlideInBottomBox = styled(Box)`
  opacity: 0;
  &.animate {
    animation: ${slideInFromBottom} 1s ease-out forwards;
  }
`;

const MainPoster = () => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { userDetails, isAuth } = useSelector((store) => store.auth);
 
   const subscriptionDetails = useSelector(
      (store) => store.auth.subscriptionDetails
    );
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const hoverTransform1 = hovered ? "translate(0px, 30px)" : "translate(0, 0)";
  const hoverTransform2 = hovered ? "translate(0px, -20px)" : "translate(0, 0)";
  const hoverTransform3 = hovered ? "translate(0px, -50px)" : "translate(0, 0)";
  const hoverTransform4 = hovered ? "translate(0px, -20px)" : "translate(0, 0)";
  const hoverTransform5 = hovered ? "translate(20px, 0px)" : "translate(0, 0)";
  const hoverTransform6 = hovered ? "translate(-20px, 0px)" : "translate(0, 0)";
  const [animate, setAnimate] = useState(false);
  const [isOpen,setIsOpen]=useState(false)
  const handleClose=()=>{
    setIsOpen(false)
  }

  const handleClick = (e) => {
    e.preventDefault();

    if (isAuth) {
      router.push('/test-your-investing-knowledge'); 
    } else {
      setIsOpen(true) 
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {

    if (isAuth) dispatch(subscriptionDetailsApi());
  }, []);
  return (
    <>
   <LoginModal isOpen={isOpen} handleClose={handleClose} />
    <Box
      width="100vw"
      sx={{
        backgroundImage: `url('/rectangle.png')`,
        backgroundSize: "cover",
        overflow: "hidden",
      }}
      marginTop={10}
    >
     <Snackbar/>
      <Grid
        container
        paddingX={2}
        justifyContent="space-between"
        paddingTop={{ xs: 7, sm: 10, lg: 0 }}
      >
        <Grid
          item
          lg={6}
          xs={12}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <SlideInLeftBox
            container
            justifyContent="center"
            alignItems="center"
            className={animate ? "animate" : ""}
          >
            <Grid item>
              <StyledTyography3 marginBottom={1}>
                <Typography
                  component="span"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    marginRight: "3px",
                    lineHeight: "19px",
                    color: "#0D1726",
                  }}
                >
                  Sovrenn helps
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontSize: "16px",
                    color: colors.themeGreen,
                    fontWeight: "400",
                    marginRight: "3px",
                  }}
                >
                  &quot;You&quot;
                </Typography>
                <Typography
                  component="span"
                  sx={{ fontSize: "16px", fontWeight: "400", color: "#0D1726" }}
                >
                  to
                </Typography>
              </StyledTyography3>

              <Box component="span">
                {headingsArray.map((element, index) => {
                  return (
                    <Box key={index}>
                      <StyledTyography3 marginBottom="4px">
                        <StyledTypography1 variant="h6" component="span">
                          {element.h1}
                        </StyledTypography1>
                        <StyledTyography2 variant="h1" component="span">
                          {element.h2}
                        </StyledTyography2>
                      </StyledTyography3>
                    </Box>
                  );
                })}
              </Box>
              <Box
                sx={{ textAlign: { xs: "center", lg: "start" } }}
                marginTop="8px"
                marginBottom="28px"
              >
                <Typography
                  align="justify"
                  wrap="wrap"
                  component="span"
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    color: "#0D1726",
                    fontWeight: 400,
                    lineHeight: { xs: "14px", sm: "14px" },
                  }}
                >
                  So you can take informed investing decisions to build a secure
                  financial future.
                </Typography>
              </Box>

              <Grid
                container
                direction={{ xs: "column" }}
               gap={2}
                alignItems={{xs:"center",md:"start"}}
                justifyContent={{ xs: "center", md: "start" }}
                width="100%"
              >
                {isAuth && userDetails?.subscriptions?.includes("trial") ? (
                  <>
                    <Grid item>
                      <StyledButton3 variant="contained">
                        {`Your Trial Expires on ${moment(
                          subscriptionDetails[0]?.expiry_date
                        ).format("Do MMM YY")}`}
                      </StyledButton3>
                    </Grid>
                    <Grid item>
                     <PaymentButton/>
                    </Grid>
                  </>
                ) : 
                
                isAuth && !userDetails?.subscriptions.length ? (
                  <Grid item width="100%">
                     <PaymentButton/>
                    </Grid>
                
                ) :
                
                (
                  <></>
                )}

                {!isAuth ? (
                 <Grid
                 item
                 sx={{
                   display: "flex",
                   flexDirection: { xs: "column", sm: "row" },
                   gap: 2,
                 }}
                 width="100%"
               >
                 <Link href="/signup">
                   <StyledButton1
                     variant="outlined"
                     sx={{
                       width: { xs: "100%", sm: "auto" },
                       padding: { xs: "16px", sm: "12px 16px" },
                     }}
                   >
                     Get 45 Days Trial For Free
                   </StyledButton1>
                 </Link>
                 <Box onClick={()=>{setIsOpen(true)}}>
                 <PaymentButton/>
                 </Box>
               
               </Grid>
               
                ) : isAuth &&
                  (userDetails?.subscriptions?.includes("full-access") ||
                    userDetails?.subscriptions?.includes("life")) ? 
                    <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                      justifyContent:{sm:"Center",md:"start"}
                     
                    }}
                    width="100%"
                  >
                    <Link href="/education">
                      <StyledButton1
                        variant="outlined"
                        sx={{
                          width: { xs: "100%", sm: "auto" },
                          padding: { xs: "16px", sm: "12px 16px" },
                        }}
                      >
                      Learn Investing
                      </StyledButton1>
                    </Link>
                    <Link href="/discovery">
                      <StyledButton2
                        variant="contained"
                        sx={{
                          width: { xs: "100%", sm: "auto" },
                          padding: { xs: "16px", sm: "12px 16px" },
                        }}
                      >
                      Discover Stocks Now
                      </StyledButton2>
                    </Link>
                  </Grid>
                    : (
                  ""
                )}
              </Grid>
              <Box
   
      mt={1.5}
     onClick={handleClick}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', md: 'flex-start' }, 
        color: colors.themeGreen,
        textDecoration: 'none',
        cursor: 'pointer',
        width: '100%', 
        flexWrap: 'wrap',

       
        '@media (max-width:600px)': {
          justifyContent: 'center',
        },
      }}
    >
      <Box
      
        sx={{
          position: 'relative',
          fontWeight: 'bold',
          fontSize: {xs:"12px",sm:"18px"},
          lineHeight: {xs:"14px",sm:"21px"},
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: 0,
            bottom: -1,
            height: '1px',
            width: '100%',
            backgroundColor: colors.themeGreen,
            transition: 'transform 0.3s ease',
          },
         
        }}
      >
        Test Your Investing Knowledge in 3 mins for Free
      </Box>
      <ArrowForwardIcon sx={{ ml: 1, fontSize:{xs:14,sm:21}}} />
    </Box>

            </Grid>
          </SlideInLeftBox>
        </Grid>
        <Grid item md={6} xs={12}>
          <SlideInBottomBox className={animate ? "animate" : ""}>
            <Grid
              container
              justifyContent="center"
              paddingTop={6}
              alignItems="center"
              sx={{
                display: "flex",

                position: "relative",
              }}
            >
              <Grid item sx={{ display: { xs: "block", md: "none" } }}>
                <Image
                  src="/hero.svg"
                  width={500}
                  height={636}
                  alt="poster"
                  layout="responsive"
                />
              </Grid>
              <Grid item sm={6.5} sx={{ display: { xs: "none", md: "block" } }}>
                <Box
                  sx={{
                    position: "relative",
                    display: { xs: "none", md: "block", zIndex: 5 },
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  width="500px"
                  height="420px"
                >
                  <Image
                    src="/hero2.svg"
                    alt="Parent"
                    width={500}
                    height={420}
                    layout="fixed"
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      width: "183px",
                      height: "68px",
                      top: 0,
                      left: "-22px",
                      transition: "transform 0.3s",
                      transform: hoverTransform1,
                      zIndex: 10,
                    }}
                  >
                    <Image
                      src="/group1.svg"
                      alt="Top Left"
                      width={183}
                      height={68}
                      layout="responsive"
                    />
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      width: "35px",
                      height: "35px",
                      top: "150px",
                      left: "130px",
                      transition: "transform 0.3s",
                      transform: hoverTransform2,
                      zIndex: 10,
                    }}
                  >
                    <Image
                      src="/group2.svg"
                      alt="Top Right"
                      width={35}
                      height={35}
                      layout="responsive"
                    />
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      width: "121px",
                      height: "61px",
                      bottom: "50px",
                      left: "35px",
                      transition: "transform 0.3s",
                      transform: hoverTransform3,
                      zIndex: 10,
                    }}
                  >
                    <Image
                      src="/group3.svg"
                      alt="Bottom Left"
                      width={121}
                      height={61}
                      layout="responsive"
                    />
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      width: "129px",
                      height: "32px",
                      bottom: "15px",
                      left: "220px",
                      transition: "transform 0.3s",
                      transform: hoverTransform4,
                      zIndex: 10,
                    }}
                  >
                    <Link target="_blank" href={androidAppLink}>
                      <Image
                        src="/group4.svg"
                        alt="Bottom Right"
                        width={129}
                        height={32}
                        layout="responsive"
                      />
                    </Link>
                  </Box>

                  <Box
                    sx={{
                      position: "absolute",
                      width: "35px",
                      height: "35px",
                      bottom: "5px",
                      right: "80px",
                      transition: "transform 0.3s",
                      transform: hoverTransform5,
                      zIndex: 10,
                    }}
                  >
                    <Image
                      src="/group5.svg"
                      alt="Bottom Right"
                      width={35}
                      height={35}
                      layout="responsive"
                    />
                  </Box>

                  <Box
                    sx={{
                      position: "absolute",
                      width: "129px",
                      height: "166px",
                      bottom: "35px",
                      right: "15px",
                      transition: "transform 0.3s",
                      transform: hoverTransform6,
                      zIndex: 10,
                    }}
                  >
                    <Image
                      src="/group6.svg"
                      alt="Bottom Right"
                      width={129}
                      height={166}
                      layout="responsive"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </SlideInBottomBox>
        </Grid>
      </Grid>
     
    </Box>
    </>
  );
};
export default MainPoster;
