"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  InputLabel,
  useMediaQuery,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { colors } from "@/components/Constants/colors";
import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { changePasswordApi } from "@/app/Redux/Slices/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { validPassword } from "@/components/Auth/Regex";
import Snackbar from "../../../components/Snackbar/SnackBar"


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
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px white inset",
    WebkitTextFillColor: colors.navyBlue900,
    caretColor: colors.navyBlue900,
  },
}));

const ForgotPassword = () => {
  const dispatch=useDispatch()
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { message } = useSelector((store) => store.auth);
  const searchParams = useSearchParams();
  const router = useRouter();

  const rt = searchParams.get("rt");
  const handleBackClick = () => {
    router.back();  
  };


  const isMobile = useMediaQuery("(max-width:1040px)");
  const handleChangePassword = async () => {
   

    const result = await dispatch(changePasswordApi({ password:password, token:rt }));

    
    if (result.payload.ok) {
      router.replace("/login"); 
    }
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("New Password and Confirm Password does not match.");
      return;
    } 
    if (!validPassword.test(password)) {
     
      setErrorMessage("Password must be min 8 characters and one numeric digit, one uppercase and one lowercase letter.");
      return;
  }
    else {
      setErrorMessage("")
      handleChangePassword()
    }
  };

  return (
    <Container>
     
      <Grid container marginTop={{ xs: "80px", sm: "120px" }}>
        <Snackbar/>
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
              Create New Password
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
              <StyledInputLabel htmlFor="password">
                Create Password
              </StyledInputLabel>
              <CustomTextField
                id="password"
                required
                name="password"
                placeholder="Enter at least 6 characters"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

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
              <StyledInputLabel htmlFor="confirm-password">
                Confirm Password
              </StyledInputLabel>
              <CustomTextField
                id="confirm-password"
                required
                name="confirm-password"
                placeholder="Re-enter your password"
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Typography
              style={{ color: "red" }}
              paddingBottom={1}
              textAlign="center"
            >
              {errorMessage != "" ? errorMessage : message != "" ? message : ""}
            </Typography>
            <StyledButton
              variant="contained"
              fullWidth
              sx={{ maxWidth: 400 }}
              onClick={handleSubmit}
            >
              Change Password
            </StyledButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
