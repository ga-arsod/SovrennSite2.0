"use client";
import React, { useEffect } from "react";
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
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  @media (max-width: 639px) {
    font-size: 14px;

    line-height: 17px;
  }
`;

const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: white;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding: 14px 20px;
  text-transform: none;
  background-color: ${colors.themeGreen};

  :hover {
    background-color: ${colors.themeGreen};
    color: white;
    border-color: ${colors.themeGreen};
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

const MentorshipModal = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const handleClose = () => {
    setIsOpen(false);
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
            <Grid item>
              <StyledTypography1
                color={colors.navyBlue500}
                textAlign="center"
                mb={1}
              >
                Congratulations
              </StyledTypography1>
              <StyledTypography2 color={colors.navyBlue500} textAlign="center">
                Welcome to the Sovrenn Mentorship Program! You've secured your
                spot and are all set to start your journey.
              </StyledTypography2>
            </Grid>
            <Grid item>
              <Box sx={{ width: "100%", maxWidth: 275 }}>
                <Image
                  src="/dashboard-modal-image.png"
                  alt="mentorship-image"
                  width={275}
                  height={275}
                  layout="responsive"
                />
              </Box>
            </Grid>
            <Grid item width="100%">
              <StyledButton1
                variant="conatined"
                fullWidth
                onClick={() => {
                  router.push("/mentorship/dashboard");
                }}
              >
                Go to Mentorship Dashboard
              </StyledButton1>
            </Grid>
          </Grid>
        </Box>
      </StyledBox>
    </Modal>
  );
};

export default MentorshipModal;
