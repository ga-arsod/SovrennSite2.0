"use client";
import React, { useState,useEffect } from 'react';
import { Box, Typography, TextField, Button, IconButton, Modal, Grid,InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { colors } from '../Constants/colors';

const StyledTypography2 = styled(Typography)`
  font-size: 28px;
  font-weight: 600;
  line-height: 34px;
  letter-spacing: -0.02em;
  color: ${colors.navyBlue500};
  text-align: center;
`;

const StyledButton1 = styled(Button)`
  border-color: ${colors.navyBlue500};
  color: ${colors.navyBlue500};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 14px;
  padding-bottom: 14px;
  text-transform: none;
  background-color: ${colors.white};
  width: 100%; /* Added to make buttons take equal width */

  :hover {
    background-color: ${colors.themeButtonHover};
    color: ${colors.navyBlue500};
    border-color: ${colors.navyBlue500};
    outline: ${colors.navyBlue500};
  }
`;

const StyledButton2 = styled(Button)`
  border-color: ${colors.themeGreen};
  color:  ${colors.greyBlue600};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 14px;
  padding-bottom: 14px;
  text-transform: none;
  background-color: ${colors.greyBlue100};
  width: 100%;

  :hover {
    background-color: ${colors.themeButtonHover};
    color: ${colors.white};
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
`;
const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledInputLabel = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
  padding:0px 24px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
 padding:0px 24px;
  & .MuiInputBase-root {
    font-size: 16px;
    line-height:21px;
    color: #010C15;
    font-weight:400;
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
    padding: 10px 12px;
  }

  /* Styling the placeholder */
  & .MuiOutlinedInput-input::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color:#96A7B4; 
    opacity: 1;
  }
`;
const ProfileModal = ({ isOpen,setIsOpen }) => {
  

const handleClosed=()=>{
    setIsOpen(false);
}
  return (
    <Modal
      open={isOpen}
      onClose={handleClosed}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ zIndex: 12000, border: "none", outline: "none" }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          border: "none",
          outline: "none",
        },
      }}
    >
      <StyledBox>
        <Box
          bgcolor={colors.white}
          width={{ xs: "90vw", sm: "65vw", md: "680px" }}
          height="auto"
          sx={{
            boxShadow: "0px 12px 24px 0px #0000001A",
            position: "relative",
            borderRadius: "8px",
            border: "none",
            outline: "none",
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: "6px", right: "4px" }}
            onClick={handleClosed}
          >
            <CloseIcon sx={{ color: colors.black }} />
          </IconButton>
          <Grid
            container
            padding={"20px"}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={4}
          >
            <Grid item paddingX={{ xs: 1, sm: 4 }}>
              <StyledTypography2>
              Change Password
              </StyledTypography2>
            </Grid>
            <Grid item width="100%">
              <Box component="form" noValidate autoComplete="off">
              <StyledInputLabel htmlFor="current_password">Full Name</StyledInputLabel>
          <StyledTextField
            placeholder="Ritik Sahu"
            id="current_password"
            name="current_password"
            sx={{ marginBottom: 3 }}
           
          />
          <StyledInputLabel htmlFor="new_password">Full Name</StyledInputLabel>
          <StyledTextField
            placeholder="Ritik Sahu"
            id="new_password"
            name="new_password"
            sx={{ marginBottom: 3 }}
           
          />
          <StyledInputLabel htmlFor="confirm_password">Re-enter New Passworde</StyledInputLabel>
          <StyledTextField
            placeholder="Ritik Sahu"
            id="confirm_password"
            name="confirm_password"
            sx={{ marginBottom: 3 }}
           
          />
               
                <Grid container spacing={2} mt={3}>
                  <Grid item xs={6}>
                    <StyledButton1 variant="outlined">
                      Cancel
                    </StyledButton1>
                  </Grid>
                  <Grid item xs={6}>
                    <StyledButton2 variant="contained" >
                    Change Password
                    </StyledButton2>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </StyledBox>
    </Modal>
  );
};

export default ProfileModal;