"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  InputLabel,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Stack,
  useMediaQuery,
} from "@mui/material";
import styled from "@emotion/styled";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import SignInCard from "@/components/Cards/SignInCard";
import SignUpCard from "@/components/Cards/SignUpCard";
import Login from "@/components/Auth/Login";
import BasicInfo from "@/components/Auth/BasicInfo";

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

const StyledGrid = styled(Grid)`
  @media (max-width: 700px) {
    display: none;
  }
`;

const StyledGrid2 = styled(Grid)`
  @media (min-width: 701px) and (max-width: 1120px) {
    display: block;
  }
  display: none;
`;
const login = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    createPassword: false,
    confirmPassword: false,
  });
  const [isSignIn, setIsSignIn] = useState(true);
  const handleClickShowPassword = (id) => {
    setShowPassword({ ...showPassword, [id]: !showPassword[id] });
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const isTablet = useMediaQuery("(min-width: 701px) and (max-width: 1120px)");
  const theme = useTheme();
  return (
    <Box>
      <Grid
        container
        height={{ lg: "100vh" }}
        direction={{ xs: "column", lg: "row" }}
      >
        <StyledGrid item xs={12} lg={6} order={{ xs: 2, lg: 1 }}>
          {isTablet && isSignIn ? <SignInCard /> : <SignUpCard />}
        </StyledGrid>
        <Grid
          item
          xs={12}
          lg={6}
          order={{ xs: 1, lg: 2 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            paddingY: "4rem",
          }}
        >
          <Login isSignIn={isSignIn} setIsSignIn={setIsSignIn} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default login;
