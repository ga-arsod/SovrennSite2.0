"use client"
import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,form
} from "@mui/material";
import styled from "@emotion/styled";
import Link from "next/link";
import {
  ContactSupportOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { colors } from "../Constants/colors";
import Image from "next/image";
import { validEmail, validPassword, validPhoneNumber } from "./Regex";
import { doSocialLogin } from "@/app/actions";

const StyledInputLabel = styled(InputLabel)`
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  color: #010c15;
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
  padding-top: 10px;
  padding-bottom: 10px;

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
  padding-top: 10px;
  padding-bottom: 10px;

  border: 1px solid #20365b;
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

const URL = "https://api.sovrenn.com";
const SignUp = ({ isSignIn, setIsSignIn }) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
  });

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const [confirmValues, setConfirmValues] = useState({
    password: "",
    showPassword: false,
  });

  const [validate, setValidate] = useState(false);
  const [validateValue, setValidateValue] = useState("");

  const splitFullName = (fullName) => {
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");
    return { firstName, lastName };
  };

  const formInputChange = (e) => {
    const { value, name } = e.target;

    if (name === "name") {
      const { firstName, lastName } = splitFullName(value);
      setForm((prevForm) => ({
        ...prevForm,
        first_name: firstName,
        last_name: lastName,
      }));
    } else if (name === "email") {
      if (validEmail.test(value)) {
        setForm((prevForm) => ({
          ...prevForm,
          email: value,
          phone_number: "",
        }));
      } else {
        setForm((prevForm) => ({
          ...prevForm,
          email: "",
          phone_number: value,
        }));
      }
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleChange = (box) => (event) => {
    formInputChange(event);
    box === "password"
      ? setValues({ ...values, password: event.target.value })
      : setConfirmValues({ ...confirmValues, password: event.target.value });
  };

  const handleClickShowPassword = (box) => () => {
    box == "password"
      ? setValues({
          ...values,
          showPassword: !values.showPassword,
        })
      : setConfirmValues({
          ...confirmValues,
          showPassword: !confirmValues.showPassword,
        });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if (!validEmail.test(form.email) && form.email !== "") {
      setValidate(true);
      setValidateValue("Please write correct email address.");
      return;
    }

    if (!validPassword.test(values.password)) {
      setValidate(true);
      setValidateValue(
        "Password must be min 8 characters and one numeric digit, one uppercase and one lowercase letter."
      );
      return;
    }

    if (values.password !== confirmValues.password) {
      setValidate(true);
      setValidateValue("Password and Confirm Password does not match.");
      return;
    }

    const data = await fetch(`${URL}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        signed_up_from: "website",
      }),
    }).then((response) => response.json());

    if (data.success) {
      localStorage.setItem("sov_user", data.token);
      dispatch(
        authAction({
          isAuth: true,
          token: data.token,
          user: data.user,
        })
      );

      setForm({
        first_name: "",
        last_name: "",

        email: "",
        phone_number: "",
        password: "",
      });

      setValues({
        password: "",
        showPassword: false,
      });

      setConfirmValues({
        password: "",
        showPassword: false,
      });
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
      marginTop={6}
    >
      <Grid
        item
        width="100%"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        marginBottom={3}
      >
        <IconButton sx={{ padding: 0, visibility: { xs: "", sm: "hidden" } }}>
          <ArrowBackIcon sx={{ color: "#011627" }} />
        </IconButton>

        <Typography
          textAlign="center"
          color={colors.themeGreen}
          sx={{ fontWeight: "600", fontSize: "33px", lineHeight: "40px" }}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </Typography>
        <Typography></Typography>
      </Grid>
      <Grid item width="100%">
        <form onSubmit={handleSubmitForm}>
          <Grid container direction="column">
            <Grid item>
              <StyledInputLabel htmlFor="name">Name</StyledInputLabel>

              <CustomTextField
                sx={{ marginBottom: "16px" }}
                id="name"
                required
                name="name"
                value={form.name}
                onChange={formInputChange}
                placeholder="Enter your full name"
                fullWidth
              />
              <StyledInputLabel htmlFor="email">
                Email or Phone no.
              </StyledInputLabel>

              <CustomTextField
                sx={{ marginBottom: "16px" }}
                id="email"
                required
                name="email"
                placeholder="Enter your email or Phone no."
                value={form.email || form.phone_number}
                onChange={formInputChange}
                fullWidth
              />
              <StyledInputLabel htmlFor="password">
                Create Password
              </StyledInputLabel>

              <CustomTextField
                sx={{ marginBottom: "16px" }}
                id="password"
                required
                type={values.showPassword ? "text" : "password"}
                onChange={handleChange("password")}
                name="password"
                placeholder="Enter at least 6 characters"
                value={form.password}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        id={"password"}
                        onClick={handleClickShowPassword("password")}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <StyledInputLabel htmlFor="confirmPassword">
                Confirm Password
              </StyledInputLabel>

              <CustomTextField
                id="confirmPassword"
                required
                name="confirmPassword"
                placeholder="Re-enter your password"
                type={confirmValues.showPassword ? "text" : "password"}
                value={confirmValues.password}
                fullWidth
                onChange={handleChange()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        id={"confirmPassword"}
                        onClick={handleClickShowPassword()}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {confirmValues.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

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
            </Grid>
            {validate ? (
              <Typography
                marginBottom={1}
                textAlign="center"
                sx={{ fontWeight: 400, fontSize: "14px", lineheight: "17px" }}
                color={colors.red500}
              >
                {validateValue}
              </Typography>
            ) : (
              ""
            )}
            <Grid item width="100%">
              <StyledButton1 type="submit" variant="contained">
                {isSignIn ? "Sign In" : "Sign Up"}
              </StyledButton1>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item width="100%">
        <Grid container width="100%" rowSpacing={2}>
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
            <form action={doSocialLogin}>
            <StyledButton2
              variant="outlined"
              type="submit"
              name="action"
              value="google"
              startIcon={
                <Image
                  src="/google.svg"
                  alt="My Image"
                  width={20}
                  height={20}
                />
              }
            >
              Continue with Google
            </StyledButton2>
            </form>
          </Grid>
          <Grid item width="100%">
            <Typography textAlign="center" sx={{ cursor: "pointer" }}>
              <StyledTypography component="span" color="#121E32">
                Already have an account?
              </StyledTypography>
              <StyledTypography
                component="span"
                color={colors.themeGreen}
                onClick={() => {
                  setIsSignIn(!isSignIn);
                }}
              >
               Sign In
              </StyledTypography>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignUp;
