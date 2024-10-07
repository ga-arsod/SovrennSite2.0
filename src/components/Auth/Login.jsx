"use client"
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
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { colors } from "../Constants/colors";
import Image from "next/image";
import { validEmail, validPassword, validPhoneNumber } from "./Regex";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/app/Redux/Slices/authSlice";
import { store } from "@/app/Redux/store";
import { doSocialLogin } from "@/app/actions";
import { useSearchParams } from "next/navigation";

const StyledInputLabel = styled(InputLabel)`
  font-weight: 400;
  font-size: 18px;
  line-height: 21.5px;
  color: ${colors.navyBlue800};
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
const Login = ({component}) => {
  const dispatch = useDispatch();
 
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [validate, setValidate] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const extra = searchParams.get('extra');
    const from = searchParams.get('from');
  const handleChange = (prop) => (event) => {
    formInputChange(event);
    setValues({ ...values, [prop]: event.target.value });
  };

  const formInputChange = (event) => {
    const { value, name } = event.target;
    setValidate(true);

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const data = await fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((response) => response.json());

    if (data.success) {
    
      localStorage.setItem("token", data.token);

      dispatch(loginSuccess(data));

      if (extra) {
        router.push(`/discovery/${extra}`);
        return;
      }
  
      router.push(from || "/");
    };

    setMessage(data.message);
    setValidate(false);
    return;
  };

 

  return (
    <Grid
      container
      display="flex"
      width={{ xs: "90%", sm: component==="login" ?'50%':'80%', lg: component==="login" ?'70%':'80%' }}
      justifyContent="center"
      alignItems="center"
      marginTop={component==="login" ?'6':'0'}
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

              <Typography textAlign="right" marginBottom={2}>
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
              <StyledButton1 type="submit" variant="contained" 
              // onClick={() =>
              //   router.push(`/login?from=${router.asPath}&extra=${router.query.basket}`, { scroll: false })
              // }
              >
                Sign In
              </StyledButton1>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item width="100%">
        <Grid container width="100%" >
          <Grid item width="100%" marginY={2}>
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
          <Grid item width="100%" marginTop={3}>
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
