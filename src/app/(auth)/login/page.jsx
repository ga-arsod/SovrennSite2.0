"use client"
import React, { useState } from "react";
import {
  Box,
  Grid,
  
  useMediaQuery,
} from "@mui/material";
import styled from "@emotion/styled";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import SignInCard from "@/components/Cards/SignInCard";
import SignUpCard from "@/components/Cards/SignUpCard";
import Login from "@/components/Auth/Login";
import SignUp from "@/components/Auth/SignUp";



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
const Auth = () => {
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
        height={{ md: "100vh" }}
        direction={{ xs: "column", sm: "row" }}
        marginTop={{xs:0,md:8}}
        
      >
        <StyledGrid item xs={12} lg={6} order={{ xs: 2, lg: 1 }} sx={{flexGrow:1}}>
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
            paddingY: "14vh",
          }}
        >
        {isSignIn ? <Login isSignIn={isSignIn} setIsSignIn={setIsSignIn}/> :<SignUp isSignIn={isSignIn} setIsSignIn={setIsSignIn}/>}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Auth;
