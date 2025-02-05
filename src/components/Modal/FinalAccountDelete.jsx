"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Modal,
  Avatar,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSnackStatus } from "@/app/Redux/Slices/snackbarSlice";
import { logout } from "@/app/Redux/Slices/authSlice";
const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 33px;
  line-height: 40px;
  letter-spacing: -0.02em;
  color: ${colors.red500};
`;

const StyledTextField = styled(TextField)`
  width: 100%;

  & .MuiInputBase-root {
    font-size: 16px;
    line-height: 21px;
    color: #010c15;
    font-weight: 400;
    border-radius: 2px;
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
    padding: 13px 12px;
  }
  & .MuiOutlinedInput-input::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #96a7b4;
    opacity: 1;
  }
`;

const StyledButton2 = styled(Button)`
  border-color: ${colors.red500};
  color: ${colors.white};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 14px;
  padding-bottom: 14px;
  width: 100%;
  text-transform: none;
  background-color: ${colors.red500};

  :hover {
    background-color: #f60909;
  }
  @media (max-width: 639px) {
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    padding-top: 12px;
    padding-bottom: 12px;
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

const url = process.env.NEXT_PUBLIC_API_URL;
const FinalAccountDelete = ({ isOpen, setIsOpen }) => {
  const [confirmationText, setConfirmationText] = useState("");
  const correctText = "Delete My Account";
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClose = () => {
    setIsOpen(false);
    setConfirmationText("");
  };

  const handleDeleteAccount = async () => {
    if (confirmationText !== correctText) return;

    const response = await fetch(`${url}/user/delete-account`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      handleClose();
      router.push("/signup");
      dispatch(logout())
      dispatch(
        setSnackStatus({
          status: true,
          severity: "success",
          message: "Account deleted successfully!",
        })
      );
    }

    const data = await response.json();
    return data;
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
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
          width={{ xs: "90vw", sm: "65vw", md: "600px" }}
          height="auto"
          sx={{
            boxShadow: "0px 12px 24px 0px #0000001A",
            position: "relative",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            padding: {xs:0,sm:2},
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: "6px", right: "4px" }}
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
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Avatar
                  src="/delete-account.png"
                  alt="Profile Picture"
                  sx={{ width: 80, height: 80, backgroundColor: "#FFE5E5" }}
                />
              </Box>
              <StyledTypography1
                textAlign="center"
                sx={{ fontWeight: "bold", color: "red" }}
              >
                Delete Account
              </StyledTypography1>

              {/* Info Text */}
              <Typography
                marginY={3}
                textAlign="center"
                sx={{ fontSize: "18px", lineHeight: "21px" }}
                color="#8A949C"
              >
                This will delete your account. <br />
                To confirm, type "Delete My Account"
              </Typography>

              {/* Input Field */}
              <StyledTextField
                fullWidth
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="Type Here..."
                variant="outlined"
                sx={{ mb: 2 }}
              />

              {/* Delete Button */}
              <StyledButton2
                fullWidth
                variant="contained"
                disabled={confirmationText !== correctText}
                onClick={handleDeleteAccount} // API call on button click
              >
                Delete Account
              </StyledButton2>
            </Grid>
          </Grid>
        </Box>
      </StyledBox>
    </Modal>
  );
};

export default FinalAccountDelete;
