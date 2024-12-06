"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Modal,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import { resetPasswordApi, togglePasswordModal } from "@/app/Redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

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
  width: 100%;
  @media (max-width: 639px) {
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  :hover {
    background-color: ${colors.themeButtonHover};
    color: ${colors.navyBlue500};
    border-color: ${colors.navyBlue500};
    outline: ${colors.navyBlue500};
  }
`;

const StyledButton2 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: white;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 14px;
  padding-bottom: 14px;
  white-space: nowrap;
  text-transform: none;
  background-color: ${colors.themeGreen};
  width: 100%;
  @media (max-width: 639px) {
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
    padding-top: 8px;
    padding-bottom: 8px;
  }
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
  padding: 0px 24px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  padding: 0px 24px;
  & .MuiInputBase-root {
    font-size: 16px;
    line-height: 21px;
    color: #010c15;
    font-weight: 400;
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
  & .MuiOutlinedInput-input::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #96a7b4;
    opacity: 1;
  }
`;

const ProfileModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { message } = useSelector((store) => store.auth);

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("New Password and Re-enter New Password must match!");
      return;
    }
    setErrorMessage(""); 
    dispatch(resetPasswordApi({ currentPassword, newPassword }));
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
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
            onClick={() =>{ 
              setErrorMessage("")
              dispatch(togglePasswordModal())}}
          >
            <CloseIcon sx={{ color: colors.black }} />
          </IconButton>
          <Grid
            container
            paddingY="20px"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={4}
          >
            <Grid item paddingX={{ xs: 1, sm: 4 }}>
              <StyledTypography2>Change Password</StyledTypography2>
            </Grid>
           
            <Grid item width="100%">
              <Box component="form" noValidate autoComplete="off">
                <StyledInputLabel htmlFor="current_password">
                  Current Password
                </StyledInputLabel>
                <StyledTextField
                  placeholder="Enter current password"
                  id="current_password"
                  name="current_password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  sx={{ marginBottom: 3 }}
                />
                <StyledInputLabel htmlFor="new_password">
                  New Password
                </StyledInputLabel>
                <StyledTextField
                  placeholder="Enter new password"
                  id="new_password"
                  name="new_password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{ marginBottom: 3 }}
                />
                <StyledInputLabel htmlFor="confirm_password">
                  Re-enter New Password
                </StyledInputLabel>
                <StyledTextField
                  placeholder="Re-enter new password"
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ marginBottom: 3 }}
                />
                <Typography
                  style={{ color: "red" }}
                  paddingBottom={1}
                  textAlign="center"
                >
                  {errorMessage!="" ? errorMessage : message!="" ? message : ""}
                </Typography>
                <Grid container spacing={2} paddingX="20px">
                  <Grid item xs={6}>
                    <StyledButton1
                      variant="outlined"
                      onClick={() =>{ 
                        setErrorMessage("")
                        dispatch(togglePasswordModal())}}
                    >
                      Cancel
                    </StyledButton1>
                  </Grid>
                  <Grid item xs={6}>
                    <StyledButton2
                      variant="contained"
                      onClick={handleSubmit}
                    >
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
