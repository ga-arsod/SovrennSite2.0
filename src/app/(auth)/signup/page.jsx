

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
  const [form, setForm] = useState({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone_number: "",
      state: "Abroad",
    country_code: "+91",
    experience_in_the_market:"",
    where_did_hear_about_sovrenn: "Twitter",
    referral_code: ""
  
    })
  const [showPassword, setShowPassword] = useState({
    password: false,
    createPassword: false,
    confirmPassword: false,
  });
  
  const handleClickShowPassword = (id) => {
    setShowPassword({ ...showPassword, [id]: !showPassword[id] });
  };

  const formInputChange = (event) => {
    const { value, name } = event.target;
    if (name === "country_code" && value !== "+91") {
      setForm({
        ...form,
        state: "Abroad",
        [name]: value
      })
      setStateInputDisabled(true);

      return;
    }
    else if (name === "country_code") {
      setForm({
        ...form,
        state: "",
        [name]: value
      })
      setStateInputDisabled(false);
      return
    }


    if (name !== "confirm_password") {
      setForm({
        ...form,
        [name]: value
      });
    }
  };
  
  return (
    <Box>
      <Grid
        container
        height={{ md: "100vh" }}
        direction={{ xs: "column", sm: "row" }}
        marginTop={{xs:0,md:8}}
        
      >
        <StyledGrid item xs={12} lg={6} order={{ xs: 2, lg: 1 }} sx={{flexGrow:1}}>
          { <SignUpCard />}
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
        {<SignUp form={form} setForm={setForm} formInputChange={formInputChange}/>}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Auth;
