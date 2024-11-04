"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  InputLabel
} from "@mui/material";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { colors } from "../Constants/colors";
import { loginSuccess } from "@/app/Redux/Slices/authSlice";
import { doSocialLogin } from "@/app/actions";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const StyledInputLabel = styled(InputLabel)`
  font-weight: 400;
  font-size: 18px;
  line-height: 21.5px;
  color: ${colors.navyBlue800};
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

const StyledButton1 = styled(Button)`
  background-color: ${colors.themeGreen};
  font-size: 17px;
  text-transform: none;
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
const StyledTypography = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;
const URL = "https://api.sovrenn.com";

const Login = ({ component, handleClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState("");
  const [values, setValues] = useState({ password: "", showPassword: false });
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [validate, setValidate] = useState(true);

 
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname + window.location.search;
      setRedirectUrl(currentPath);
    }
  }, []);

 
  

  const handleChange = (prop) => (event) => {
    formInputChange(event);
    setValues({ ...values, [prop]: event.target.value });
  };

  const formInputChange = (event) => {
    const { value, name } = event.target;
    setValidate(true);
    setForm({ ...form, [name]: value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const data = await fetch(`${URL}/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(form),
    }).then((response) => response.json());

    if (data.success) {
      if (typeof window !== "undefined") {
      
        localStorage.setItem("token", data.token);
      }
      dispatch(loginSuccess(data));
      if (handleClose) handleClose();

      router.push(redirectUrl === '/login' ? '/' : redirectUrl);
    } else {
      setMessage(data.message);
    }
    setValidate(false);
  };

  return (
    <Grid
      container
      display="flex"
      width={{ xs: "90%", sm: "50%", lg: "70%" }}
      justifyContent="center"
      alignItems="center"
      marginTop={0}
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
          Sign In
        </Typography>
        <Typography></Typography>
      </Grid>
      <Grid item width="100%">
        <form onSubmit={handleSubmitForm}>
          <Grid container direction="column">
            <Grid item>
              <StyledInputLabel htmlFor="email">
                Email or Phone no.
              </StyledInputLabel>

              <CustomTextField
                sx={{ marginBottom: "16px" }}
                id="email"
                required
                name="email"
                placeholder="Enter your email or Phone no."
                value={values.email}
                onChange={formInputChange}
                fullWidth
              />
              <StyledInputLabel htmlFor="password">Password</StyledInputLabel>

              <CustomTextField
                sx={{ marginBottom: "16px" }}
                id="password"
                required
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                name="password"
                placeholder="Enter at least 6 characters"
                width="100%"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        id={"password"}
                        onClick={handleClickShowPassword}
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
            {!validate ? (
              <Typography
                marginBottom={1}
                textAlign="center"
                sx={{ fontWeight: 400, fontSize: "14px", lineheight: "17px" }}
                color={colors.red500}
              >
                {message}
              </Typography>
            ) : (
              ""
            )}
            <Grid item width="100%">
              <StyledButton1 fullWidth type="submit" variant="contained">
                Sign In
              </StyledButton1>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item width="100%">
        <Grid container width="100%" rowSpacing={2}>
          <Grid item width="100%" marginTop={2}>
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
            type="submit"
           name="action"
           value="google"
              variant="outlined"
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
                Don’t have an account?
              </StyledTypography>
              <StyledTypography
                component="span"
                color={colors.themeGreen}
                onClick={() => {
                  setIsSignIn(!isSignIn);
                }}
              >
                Sign Up
              </StyledTypography>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;