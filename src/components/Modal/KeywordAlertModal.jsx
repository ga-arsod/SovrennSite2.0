"use client";
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Modal,
} from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { updateAlertKeywordApi } from "@/app/Redux/Slices/filingSlice";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: -0.02em;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
  }
`;

const StyledButton1 = styled(Button)`
  border-color: ${colors.red500};
  color: ${colors.red500};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 14px;
  padding-bottom: 14px;
  width: 100%;
  text-transform: none;
  background-color: ${colors.white};

  :hover {
   background-color: ${colors.white};
    color: ${colors.red500};
    border-color: ${colors.red500};
    outline: ${colors.red500};
  }
  @media (max-width: 639px) {
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    padding-top: 12px;
    padding-bottom: 12px;
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
  width: 100%;
  text-transform: none;
  background-color: ${colors.themeGreen};

  :hover {
    background-color:${colors.themeButtonHover};
    color: ${colors.white};
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
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

const KeywordAlertModal = ({isKeywordModalOpen,setIsKeywordModalOpen, keywords}) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    setIsKeywordModalOpen(false);
  };

  return (
    <Modal
      open={isKeywordModalOpen}
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
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: "4px", right: "4px" }}
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
            <Grid item paddingX={{ xs: 2, sm: 4 }}>
              <StyledTypography1
                color={colors.navyBlue500}
                textAlign="center"
                marginTop={1}
              >
                Do you really want to exit without setting alert for the added keywords
              </StyledTypography1>
            </Grid>
            <Grid item width="100%">
              <Grid
                container
                display="flex"
                justifyContent="space-between"
                spacing={2}
                width="100%"
              >
                <Grid item xs={6}>
                    <Link href="/filing">
                  <StyledButton1 onClick={handleClose} variant="outlined">
                  Yes, Quit
                  </StyledButton1>
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <StyledButton2
                    variant="contained"
                    onClick={() => {
                    
                      dispatch(updateAlertKeywordApi({ keywords: keywords }));
                      handleClose()
                    }}
                  >
                  Set Alert
                  </StyledButton2>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </StyledBox>
    </Modal>
  );
};

export default KeywordAlertModal;
