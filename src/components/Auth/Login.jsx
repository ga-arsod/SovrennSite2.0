"use client";
import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  InputLabel
} from "@mui/material";
import styled from "@emotion/styled";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { colors } from "../Constants/colors";

const inputsFieldsArray = [
  {
    inputLabel: "Name",
    placeholder: "Enter your full name",
    type: "text",
    id: "name",
    htmlFor: "name",
    signIn: false,
    signUp: true,
  },
  {
    inputLabel: "Enter Email or Phone no.",
    placeholder: "Enter your email or Phone no.",
    type: "email",
    id: "email",
    htmlFor: "email",
    signIn: true,
    signUp: true,
  },
  {
    inputLabel: "Enter Password",
    placeholder: "Enter your password",
    type: "password",
    id: "password",
    htmlFor: "password",
    signIn: true,
    signUp: false,
  },
  {
    inputLabel: "Create Password",
    placeholder: "Enter at least 6 characters",
    type: "password",
    id: "createPassword",
    htmlFor: "createPassword",
    signIn: false,
    signUp: true,
  },
  {
    inputLabel: "Confirm Password",
    placeholder: "Re-enter your password",
    type: "password",
    id: "confirmPassword",
    htmlFor: "confirmPassword",
    signIn: false,
    signUp: true,
  },
];
const StyledInputLabel = styled(InputLabel)`
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  color:#010C15;
`;
const StyledTypography = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;
const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: white;
  font-weight: 600;
  font-size: 17px;
  line-height: 30px;
  text-transform: none;
  width: 100%;
  padding-top:10px;
  padding-bottom:10px;

  background-color: ${colors.themeGreen};
  :hover {
    background-color: ${colors.themeButtonHover};
  }
`;

const StyledButton2 = styled(Button)`
  color: #20365b;
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  text-transform: none;
  width: 100%;
  padding-top:10px;
  padding-bottom:10px;

  border: 1px solid #20365b;
`;
const Login = ({ isSignIn, setIsSignIn }) => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    createPassword: false,
    confirmPassword: false,
  });
  return (
    <Grid
      container
      display="flex"
      width={{ xs: "90%", sm: "50%", lg: "70%" }}
      justifyContent="center"
      alignItems="center"
     
    >
      <Grid
        item
        width="100%"
        sx={{ display: "flex",justifyContent:"space-between",alignItems:"center"}}
        marginBottom={3}
      >
        <IconButton sx={{padding:0,visibility:{xs:"",sm:"hidden"}}}>
          <ArrowBackIcon sx={{ color:"#011627"}}/>
        </IconButton>

        <Typography
          textAlign="center"
          color={colors.themeGreen}
          sx={{ fontWeight: "600", fontSize: "33px", lineHeight: "40px" }}
          
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </Typography>
        <Typography ></Typography>
        
      </Grid>
      <Grid item   width="100%">
        <form>
          <Grid container direction="column">
            {isSignIn
              ? inputsFieldsArray.map((element, index) => {
                  return (
                    element.signIn && (
                      <Grid item marginBottom={2} key={index}>
                        <StyledInputLabel htmlFor={element.htmlFor}>
                          {element.inputLabel}
                        </StyledInputLabel>
                        <TextField
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              padding: "12px 8px",
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: "0.60rem",
                            },
                          }}
                          id={element.id}
                          type={element.type}
                          placeholder={element.placeholder}
                          fullWidth
                          InputProps={{
                            sx: { fontSize: "0.90rem" }, // Adjust font size to decrease
                            endAdornment: (
                              <InputAdornment position="end">
                                {element.type == "password" && (
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    id={element.id}
                                    onClick={(e) => {
                                      handleClickShowPassword(e.target.id);
                                    }}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                )}
                              </InputAdornment>
                            ),
                          }}
                        />
                        {element.id == "password" && (
                          <Typography textAlign="right">
                            <Button
                              disableElevation
                              sx={{
                                color: "#1DA098",
                                fontWeight: "400",
                                fontSize: "13px",
                                lineHeight: "17px",
                                textTransform: "none",
                              }}
                            >
                              Forgot Password
                            </Button>
                          </Typography>
                        )}
                      </Grid>
                    )
                  );
                })
              : inputsFieldsArray.map((element, index) => {
                  return (
                    element.signUp && (
                      <Grid item marginBottom={2} key={index}>
                        <StyledInputLabel htmlFor={element.htmlFor}>
                          {element.inputLabel}
                        </StyledInputLabel>
                        <TextField
                          sx={{
                            
                            "& .MuiOutlinedInput-input": {
                              padding: "12px 8px", // Adjust padding to decrease height
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: "0.60rem", // Optionally adjust label font size
                            },
                          }}
                          id={element.id}
                          type={element.type}
                          placeholder={element.placeholder}
                          fullWidth
                          InputProps={{
                            sx: { fontSize: "0.90rem" }, // Adjust font size to decrease
                            endAdornment: (
                              <InputAdornment position="end">
                                {element.type == "password" && (
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    id={element.id}
                                    onClick={(e) => {
                                      handleClickShowPassword(e.target.id);
                                    }}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                )}
                              </InputAdornment>
                            ),
                          }}
                        />
                        {element.id === "password" && (
                          <Typography textAlign="right">
                            <Button
                              disableElevation
                              sx={{
                                color: colors.themeGreen,
                                fontWeight: "400",
                                fontSize: "13px",
                                lineHeight: "17px",
                                textTransform: "none",
                              }}
                            >
                              Forgot Password
                            </Button>
                          </Typography>
                        )}
                      </Grid>
                    )
                  );
                })}
          </Grid>
        </form>
        </Grid>
      <Grid item width="100%">
        <Grid container width="100%" rowSpacing={2}>
          <Grid item width="100%">
            <StyledButton1 variant="contained">
              {" "}
              {isSignIn ? "Sign In" : "Sign Up"}
            </StyledButton1>
          </Grid>
          <Grid item width="100%">
            <Typography
              color="#98A3B4"
              textAlign="center"
              sx={{
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "17px",
              }}
            >
              Or
            </Typography>
          </Grid>
          <Grid item width="100%">
            <StyledButton2
              variant="outlined"
              startIcon={
                <img
                  src="/google.svg"
                  alt="My Image"
                  style={{ width: 20, height: 20 }}
                />
              }
            >
              Continue with Google
            </StyledButton2>
          </Grid>
          <Grid item width="100%">
            <Typography textAlign="center" sx={{ cursor: "pointer" }}>
              <StyledTypography component="span" color="#121E32">
                Don’t have an account?
              </StyledTypography>
              <StyledTypography
                component="span"
                color={colors.themeGreen}
                onClick={() => {
                  setIsSignIn(!isSignIn);
                }}
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </StyledTypography>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
