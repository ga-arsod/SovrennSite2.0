"use client";
import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  InputLabel,
  TextField,
  Box,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import CloseIcon from "@mui/icons-material/Close";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 48px;
  line-height: 60px;
  letter-spacing: -0.02em;
  @media (max-width: 700px) {
    font-size: 36px;

    line-height: 43px;
  }
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
`;
const StyledInputLabel = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
`;
const StyledTextField = styled(TextField)`
  width: 100%;

  & .MuiInputBase-root {
    font-size: 16px;
    color: #344054;
    border-radius: 8px;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid #d0d5dd;
  }
  &:hover .MuiOutlinedInput-notchedOutline {
    border: 1px solid #d0d5dd;
  }
  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #d0d5dd;
  }

  & .MuiInputBase-input {
    padding: 10px 12px; /* Adjust padding here: 8px for vertical and 12px for horizontal */
  }
  & .MuiInputBase-input::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #667085; // Change this to your desired placeholder color
    opacity: 1;
  }
`;
const StyledSelect = styled(Select)`
  //  & .MuiOutlinedInput-notchedOutline {
  //     border: transparent;
  //   }
  //   &:hover .MuiOutlinedInput-notchedOutline {
  //     border: transparent;
  //   }
  //   &.Mui-focused .MuiOutlinedInput-notchedOutline {
  //     border: transparent;
  //   }
  & .MuiInputBase-root {
    padding: 10px 12px; /* Adjust padding here */
    font-size: 16px;
    color: #344054;
    border-radius: 8px;
  }

  & .MuiSelect-select {
    padding: 10px 12px; /* Adjust padding here */
    display: flex;
    align-items: center;
  }
`;
const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: ${colors.themeOrange};
  text-transform: none;
  width: 100%;
  :hover {
    background-color: ${colors.themeOrange};
  }
`;
const ClickableAdornment = ({ value, onClick }) => (
  <Typography
    sx={{
      cursor: "pointer",
      userSelect: "none",
      color: "#344054",
      marginRight: "8px",
    }}
    onClick={onClick}
  >
    {value}
  </Typography>
);
const LandingForm = () => {
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center" }}
        paddingY="150px"
        marginX={{ xs: "16px", sm: 0 }}
      >
        <Grid
          container
          flexDirection="column"
          width={{ xs: "100%", sm: "696px" }}
        >
          <Grid item>
            <StyledTypography1 color="#101828" marginBottom={{ xs: 2, sm: 3 }}>
              Sign Up Now to Get Started!
            </StyledTypography1>
            <StyledTypography2 color="#667085">
              Sign Up Now to Get Started!
            </StyledTypography2>
          </Grid>
          <Grid item marginTop={{ xs: 3, sm: 6 }} marginBottom={6} width="100%">
            <form action="">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <StyledInputLabel htmlFor="first_name">
                    First Name
                  </StyledInputLabel>
                  <StyledTextField
                    placeholder="Your first name"
                    id="first_name"
                    name="first_name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <StyledInputLabel htmlFor="last_name">
                    Last Name
                  </StyledInputLabel>
                  <StyledTextField
                    placeholder="Your last name"
                    id="last_name"
                    name="last_name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <StyledInputLabel htmlFor="email">Email</StyledInputLabel>
                  <StyledTextField
                    placeholder="you@gmail.com"
                    id="email"
                    name="email"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl sx={{ width: "100%" }}>
                    <StyledInputLabel htmlFor="country_code">
                      Country code
                    </StyledInputLabel>
                    <StyledSelect
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      fullWidth
                      name="country_code"
                    >
                      <MenuItem value="IN">IN</MenuItem>
                      <MenuItem value="UK">UK</MenuItem>
                    </StyledSelect>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <StyledInputLabel htmlFor="phone_number">
                    Phone number
                  </StyledInputLabel>
                  <StyledTextField
                    fullWidth
                    inputProps={{ maxLength: 10 }}
                    type="tel"
                    id="fullWidth"
                    name="phone_number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <StyledInputLabel>Select State</StyledInputLabel>
                    <StyledSelect
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="state"
                      fullWidth
                    >
                      <MenuItem value="Haryana">Haryana</MenuItem>
                      <MenuItem value="Punjab">Punjab</MenuItem>
                    </StyledSelect>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <StyledInputLabel htmlFor="password">
                    Create Password
                  </StyledInputLabel>
                  <StyledTextField
                    placeholder="*********"
                    id="password"
                    name="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledInputLabel htmlFor="email">
                    Re-enter Password
                  </StyledInputLabel>
                  <StyledTextField
                    placeholder="*********"
                    id="confirm_password"
                    name="confirm_password"
                  />
                </Grid>
                <Grid item xs={12} marginTop={2}>
                  <StyledButton2 variant="contained">
                    Get 45 Days Free Trial Now
                  </StyledButton2>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LandingForm;
