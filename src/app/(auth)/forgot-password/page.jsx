"use client";
import React,{useState,useEffect} from "react";
import Image from "next/image";
import { Box, Typography, TextField, Button, Container, Grid, InputLabel, useMediaQuery } from "@mui/material";
import { colors } from "@/components/Constants/colors";
import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import  ResendEmail from "../../../components/Auth/EmailResend"
import EmailNotFound from "../../../components/Auth/EmailNotFound"
import { useDispatch } from "react-redux";
import { sendPasswordLinkApi,resetLinkMessage } from "../../Redux/Slices/authSlice";
import Snackbar from "../../../components/Snackbar/SnackBar"
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const StyledTypography1 = styled(Typography)`
  font-size: 33px;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: -0.02em;
`;

const StyledInputLabel = styled(InputLabel)`
  font-weight: 400;
  font-size: 17px;
  line-height: 21.5px;
  color: ${colors.navyBlue800};
  margin-bottom: 8px;
`;

const StyledButton = styled(Button)`
  color: white;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 14px;
  padding-bottom: 14px;
  background-color: ${colors.themeGreen};
  text-transform: none;

  width: 100%;
  :hover {
    background-color: ${colors.themeButtonHover};
  }
  @media (max-width: 700px) {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    padding: "12px 8px",
    color: colors.navyBlue900,
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "17px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.60rem",
  },
  "& .MuiOutlinedInput-root": {
    fontSize: "0.90rem",
  },
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px white inset",
    WebkitTextFillColor: colors.navyBlue900,
    caretColor: colors.navyBlue900,
  },
}));

const ForgotPassword = () => {
  const isMobile = useMediaQuery("(max-width:1040px)"); 
  const [email, setEmail] = useState("");
  const router=useRouter()
  const handleBackClick = () => {
    router.back();  
  };
  const dispatch=useDispatch();
  const {linkMessage } = useSelector(
    (store) => store.auth
  );

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendResetLink = () => {
    if (email) {
      dispatch(sendPasswordLinkApi(email));
    } else {
      alert("Please enter your email.");
    }
  };

  useEffect(() => {
    dispatch(resetLinkMessage());
  }, [dispatch]);

  return (
    <Container>
      <Snackbar/>
     {
      linkMessage=="Email sent successfullly" ? <ResendEmail email={email}/> :
      linkMessage =="User not found with this e-mail" ? <EmailNotFound/> :
      <Grid container marginTop={{ xs: "80px", sm: "120px" }}>
        <Grid item width="100%" marginTop={1}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative", 
            }}
          >
            
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center", 
                position: "relative",
                width: "100%",
                maxWidth: 400,
                marginBottom: 2,
              }}
            >
             
              {isMobile && (
                <ArrowBackIcon
                  sx={{
                    fontSize: 28,
                    color: colors.navyBlue900,
                    position: "absolute", 
                    left: 0, 
                    top: "50%",
                    transform: "translateY(-50%)", 
                    cursor: "pointer",
                  }}
                  onClick={handleBackClick}
                />
              )}
           
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  backgroundColor: "#e8f8f4",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/Featured icon.png"
                  alt="Lock Icon"
                  width={56}
                  height={56}
                />
              </Box>
            </Box>

           
            <StyledTypography1 marginBottom={3} color={colors.themeGreen}>
              Reset Password
            </StyledTypography1>

           
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                maxWidth: 400,
                width: "100%",
                marginBottom: 2,
              }}
            >
              <StyledInputLabel htmlFor="email">
                Enter your registered email
              </StyledInputLabel>
              <CustomTextField
                id="email"
                required
                name="email"
                placeholder="Enter your email"
                fullWidth
                value={email}
                onChange={handleEmailChange}
              />
            </Box>

           
            <StyledButton
              variant="contained"
              fullWidth
              sx={{
                maxWidth: 400,
              }}
              onClick={handleSendResetLink}
              disabled={email==""}
            >
              Send Reset Link
            </StyledButton>

           
            <Typography
              color={colors.navyBlue200}
              marginTop={2}
              sx={{
                fontSize: "17px",
                fontWeight: "400",
                lineHeight: "21px",
                textAlign: "left",
                maxWidth: 400,
                width: "100%",
              }}
            >
              Reset link will be sent to your registered email
            </Typography>
          </Box>
        </Grid>
      </Grid>
     }
      
     
     
    </Container>
  );
};

export default ForgotPassword;
