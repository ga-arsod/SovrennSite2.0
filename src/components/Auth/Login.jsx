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

 
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
       
        dispatch(loginSuccess({ token: storedToken }));
      }
    }
  }, [dispatch]);

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
        // Set token in localStorage client-side
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
      justifyContent="center"
      alignItems="center"
      marginTop={component === "login" ? "6" : "0"}
    >
      {/* Form for login */}
      <Grid item width="100%">
        <form onSubmit={handleSubmitForm}>
          <Grid container direction="column">
            <Grid item>
              <StyledInputLabel htmlFor="email">Email or Phone no.</StyledInputLabel>
              <CustomTextField
                id="email"
                required
                name="email"
                placeholder="Enter your email or Phone no."
                value={form.email}
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
                placeholder="Enter your password"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
             
              {!validate && (
                <Typography color="red" textAlign="center">{message}</Typography>
              )}
              <StyledButton1 type="submit">Sign In</StyledButton1>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;