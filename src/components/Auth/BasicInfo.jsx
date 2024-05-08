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
} from "@mui/material";
import styled from "@emotion/styled";

const inputsFieldsArray2 = {
  name: {
    inputLabel: "Your Phone No.",
    placeholder: "Enter your Phone no.",
    type: "tel",
    id: "phone",
    htmlFor: "phone",
  },
  state: {
    inputLabel: "Select Your State",
    placeholder: "Select Your State",
    type: "email",
    id: "state",
    htmlFor: "state",
  },
};

const StyledInputLabel = styled(InputLabel)`
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  color: #121e32;
`;
const StyledButton1 = styled(Button)`
  border-color: #1da098;
  color: white;
  font-weight: 600;
  font-size: 17px;
  line-height: 30px;
  text-transform: none;
  width: 100%;
  background-color: #1da098;
  :hover {
    background-color: #1da098;
  }
`;
const BasicInfo = () => {
  const [selectedValue, setSelectedValue] = useState("hello");
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
          color="#1DA098"
          sx={{ fontWeight: "600", fontSize: "33px", lineHeight: "40px" }}
        >
          Basic Info
        </Typography>
        <form>
          <Grid container direction="column">
            <Grid item marginBottom={2}>
              <StyledInputLabel htmlFor={inputsFieldsArray2.name.htmlFor}>
                {inputsFieldsArray2.name.inputLabel}
              </StyledInputLabel>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-input": {
                    padding: "12px 8px",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "0.60rem",
                  },
                }}
                id={inputsFieldsArray2.name.id}
                type={inputsFieldsArray2.name.type}
                placeholder={inputsFieldsArray2.name.placeholder}
                fullWidth
                InputProps={{
                  sx: { fontSize: "0.90rem" },
                }}
              />
            </Grid>
            <Grid item width="100%" marginBottom={2}>
              <StyledInputLabel id={inputsFieldsArray2.state.id}>
                {inputsFieldsArray2.state.inputLabel}
              </StyledInputLabel>
              <Select
                labelId={inputsFieldsArray2.state.id}
                id={inputsFieldsArray2.state.id}
                sx={{
                  "& .MuiOutlinedInput-input": {
                    padding: "10px 8px",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "0.60rem",
                  },
                }}
                variant="outlined"
                displayEmpty
                fullWidth
              >
                <MenuItem value="Select an option" defaultValue={true}>
                  Select an option
                </MenuItem>

                <MenuItem value={"Haryana"}>Haryana</MenuItem>
                <MenuItem value={"Rajasthan"}>Rajasthan</MenuItem>
                <MenuItem value={"Uttar Pradesh"}>Uttar Pradesh</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item width="100%">
        <Grid container width="100%" rowSpacing={2}>
          <Grid item width="100%">
            <StyledButton1 variant="contained">Create Profile</StyledButton1>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BasicInfo;
