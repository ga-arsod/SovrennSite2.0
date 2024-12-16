"use client";
import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  Stack,
  InputLabel,
  Button,
  FormControl,
} from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import countryCodes from "../../utils/Countries.json";
import { states } from "../../utils/States";
import { validPhoneNumber } from "./Regex";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/app/Redux/Slices/authSlice";
import { useRouter } from "next/navigation";

const StyledInputLabel = styled(Typography)`
  font-weight: 400;
  font-size: 18px;
  line-height: 21.5px;
  color: ${colors.navyBlue800};
  white-space: nowrap;
`;
const StyledTextField = styled(TextField)(({ theme }) => ({
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
const StyledSelect = styled(Select)`
  & .MuiInputBase-root {
    padding: 10px 12px;
    font-size: 18px;
    color: ${colors.navyBlue800};
    border-radius: 8px;
  }

  & .MuiSelect-select {
    padding: 10px 12px;
    display: flex;
    align-items: center;
  }
`;

const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: white;
  font-weight: 600;
  font-size: 17px;
  line-height: 30px;
  text-transform: none;
  paddingy: 14px;
  width: 100%;
  background-color: ${colors.themeGreen};
  :hover {
    background-color: ${colors.themeGreen};
  }
`;
const StyledTypography = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;
const sources = [
  "Twitter",
  "YouTube",
  "Linkedin",
  "Google",
  "WhatsApp",
  "Instagram",
];
const utm_sources = [
  "twitter_ad",
  "youtube_ad",
  "linkedin_ad",
  "google_ad",
  "whatsapp_ad",
  "instagram_ad",
];
const URL = "https://api.sovrenn.com";
const BasicInfo = ({ form, setForm, formInputChange }) => {
  const dispatch=useDispatch();
  const router=useRouter();
  const [stateInputDisabled, setStateInputDisabled] = useState(false);
  const [validate, setValidate] = useState(false);
    const [validateValue, setValidateValue] = useState("");
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if (!validPhoneNumber.test(form.phone_number)) {
      setValidate(true);
      setValidateValue("Please enter correct phone number.");
      return;
    }

    const data = await fetch(`${URL}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((d) => d.json());

    if (data.success) {
      localStorage.setItem("token", data.token);
      dispatch(loginSuccess(data));

      router.push("/");

      return;
    }

    setValidate(true);
    setValidateValue(data.message);
    return;
  };
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
        sx={{ display: "flex", flexDirection: "column", gap: "25px" }}
      >
        <Typography
          textAlign="center"
          color={colors.themeGreen}
          sx={{ fontWeight: "600", fontSize: "33px", lineHeight: "40px" }}
        >
          Basic Info
        </Typography>
        <form onSubmit={handleSubmitForm}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl sx={{ width: "100%" }}>
                <StyledInputLabel htmlFor="country_code">
                  Country code
                </StyledInputLabel>
                <StyledSelect
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  fullWidth
                  required
                  name="country_code"
                  value={form.country_code}
                  MenuProps={{
                    PaperProps: {
                      elevation: 0,
                      sx: {
                        zIndex: 1400,
                      },
                    },
                  }}
                  onChange={formInputChange}
                >
                  {countryCodes.countries.map((ele, index) => {
                    return (
                      <MenuItem value={ele.code} key={index}>
                        {ele.code}
                      </MenuItem>
                    );
                  })}
                </StyledSelect>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <StyledInputLabel htmlFor="phone_number">
                Enter phone No.
              </StyledInputLabel>
              <StyledTextField
                fullWidth
                required
                inputProps={{ maxLength: 10 }}
                type="tel"
                id="fullWidth"
                name="phone_number"
                placeholder="Your phone number"
                value={form.phone_number}
                onKeyPress={(event) => {
                  if (event.target.value.length >= 10) {
                    event.preventDefault();
                  }
                }}
                onChange={formInputChange}
              />
            </Grid>
            {stateInputDisabled ? (
              ""
            ) : (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <StyledInputLabel htmlFor="state">
                    Select State
                  </StyledInputLabel>
                  <StyledSelect
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="state"
                    defaultValue="Select State"
                    fullWidth
                    onChange={formInputChange}
                    value={form.state}
                    required
                    disabled={stateInputDisabled}
                    MenuProps={{
                      PaperProps: {
                        elevation: 0,
                        sx: {
                          zIndex: 1400,
                        },
                      },
                    }}
                  >
                    {states.map((ele, index) => {
                      return (
                        <MenuItem value={ele} key={index}>
                          {ele}
                        </MenuItem>
                      );
                    })}
                  </StyledSelect>
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12}>
              <FormControl fullWidth>
                <StyledInputLabel htmlFor="where_did_hear_about_sovrenn">
                  From where you hear about us
                </StyledInputLabel>
                <StyledSelect
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="where_did_hear_about_sovrenn"
                  fullWidth
                  onChange={formInputChange}
                  value={form.where_did_hear_about_sovrenn}
                  disabled={stateInputDisabled}
                  MenuProps={{
                    PaperProps: {
                      elevation: 0,
                      sx: {
                        zIndex: 1400,
                      },
                    },
                  }}
                >
                  {sources.map((ele, index) => {
                    return (
                      <MenuItem value={ele} key={index}>
                        {ele}
                      </MenuItem>
                    );
                  })}
                </StyledSelect>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <StyledInputLabel htmlFor="referral_code">
                Referral code
              </StyledInputLabel>
              <StyledTextField
                fullWidth
                type="text"
                id="fullWidth"
                name="referral_code"
                placeholder="(Optional)"
                value={form.referral_code}
                onChange={formInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              {validate ? (
                <Typography
                 
                  textAlign="center"
                  sx={{
                    fontWeight: 400,
                    fontSize: "14px",
                    lineheight: "17px",
                  }}
                  color={colors.red500}
                >
                  {validateValue}
                </Typography>
              ) : (
                ""
              )}
            </Grid>
            <Grid item width="100%" >
              <Grid container width="100%" rowSpacing={2}>
                <Grid item width="100%">
                  <StyledButton1 variant="contained" type="submit">
                    Create Profile
                  </StyledButton1>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
         <Grid item width="100%" >
                        <Typography textAlign="center" sx={{ cursor: "pointer" }}>
                          <StyledTypography component="span" color="#121E32">
                            Already have an account?
                          </StyledTypography>
                          <StyledTypography
                            component="span"
                            color={colors.themeGreen}
                            onClick={() => {
                              router.replace("/login");
                            }}
                          >
                            {` Sign In`}
                          </StyledTypography>
                        </Typography>
                      </Grid>
      </Grid>
    </Grid>
  );
};

export default BasicInfo;
