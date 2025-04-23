"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  InputLabel,
} from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import { sendUserDataApi } from "@/app/Redux/Slices/investingSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Snackbar from "../Snackbar/SnackBar";
import { toggleExamState } from "@/app/Redux/Slices/investingSlice";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { validPhoneNumber } from "../Auth/Regex";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  letter-spacing: -0.02em;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;

const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: white;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding: 12px 20px;
  text-transform: none;
  background-color: ${colors.themeGreen};
  :hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
  @media (max-width: 639px) {
    width: 100%;
    padding: 12px 0px;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const StyledInputLabel = styled(InputLabel)`
  font-weight: 400;
  font-size: 18px;
  line-height: 21.5px;
  margin-bottom: 3px;
  color: ${colors.navyBlue800};
  display: block;
  text-align: left;
`;

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    padding: "12px 8px",
    color: colors.navyBlue900,
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "17px",
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

export default function InvestingForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuth } = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = validPhoneNumber;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { full_name, phone_number, email } = formData;

    if (!full_name || !phone_number || !email) {
      setMessage("Please fill all the fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!isValidPhoneNumber(phone_number)) {
      setMessage("Please enter valid phone number.");
      return;
    }

    const nameParts = full_name.trim().split(" ");
    const first_name = nameParts[0] || "";
    const last_name = nameParts.slice(1).join(" ") || "";

    const finalData = {
      first_name,
      last_name,
      phone_number,
      email,
    };

    if (isAuth) {
      dispatch(sendUserDataApi({ finalData: finalData }));
    }

    dispatch(toggleExamState());
    setFormData({
      full_name: "",
      phone_number: "",
      email: "",
    });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        marginTop: "60px",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/test-your-investing-bg.png)",
      }}
    >
      <Snackbar />
      <Paper
        elevation={3}
        sx={{
          padding: { xs: 2, sm: 4 },
          borderRadius: 2,
          zIndex: 2,
          width: { xs: "95%", sm: "540px" },
          textAlign: "center",
        }}
      >
        <StyledTypography1 color={colors.themeGreen}>
          Test Your Investing Knowledge in 3 min
        </StyledTypography1>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid container direction="column" paddingTop={2} spacing={2}>
            <Grid item>
              <StyledInputLabel htmlFor="full_name">
                Your Full Name
              </StyledInputLabel>
              <CustomTextField
                id="full_name"
                required
                name="full_name"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item>
              <StyledInputLabel htmlFor="phone_number">
                Your Phone No.
              </StyledInputLabel>
              <CustomTextField
                id="phone_number"
                required
                name="phone_number"
                placeholder="Enter your phone no."
                value={formData.phone_number}
                onChange={handleChange}
                fullWidth
                inputProps={{ maxLength: 10 }}
                type="tel"
              />
            </Grid>

            <Grid item>
              <StyledInputLabel htmlFor="email">Your Email Id</StyledInputLabel>
              <CustomTextField
                id="email"
                required
                name="email"
                placeholder="Enter your email id"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            {/* Message display */}
            {message && (
              <Grid item>
                <Typography
                  variant="body2"
                  color={
                    message.includes("successfully") ? "green" : colors.red500
                  }
                  textAlign="center"
                >
                  {message}
                </Typography>
              </Grid>
            )}

            <Grid item>
              <StyledButton1 fullWidth type="submit" variant="contained">
                Start Test Now
              </StyledButton1>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
