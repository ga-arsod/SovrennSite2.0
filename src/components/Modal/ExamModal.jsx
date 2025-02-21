import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import styles from "../../styles/exam.module.css";
import { useSelector } from "react-redux";
import convertToHtml from "../../utils/convertToHtml"
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
    background-color:#F4F3F3;
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
const ExamModal = ({setIsExamStart,isExamModalOpen,setIsExamModalOpen}) => {
    const { examRules,allow_exam } = useSelector((store) => store.exam);
    const handleClose=()=>{
      setIsExamModalOpen(false)
    }
   
  return (
    <Modal
      open={isExamModalOpen}
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
          width={{ xs: "90vw", sm: "80vw" ,md:"50vw"}}
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
            onClick={handleClose}
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
              <StyledTypography2>Instructions</StyledTypography2>
            </Grid>
            <div id={styles.MainContainer}>{convertToHtml(examRules)}</div>
          </Grid>
          <Grid container spacing={2} paddingX="20px" paddingBottom="20px">
                  <Grid item xs={6}>
                    <StyledButton1
                      variant="outlined"
                      onClick={handleClose}
                    >
                      Cancel
                    </StyledButton1>
                  </Grid>
                  <Grid item xs={6}>
                    <StyledButton2
                      variant="contained"
                    onClick={()=>{allow_exam ? setIsExamStart(true) : handleClose()}}
                    >
                     {allow_exam ? "Start Exam" : "Close"}
                    </StyledButton2>
                  </Grid>
                </Grid>
        </Box>
      </StyledBox>
    </Modal>
  );
};

export default ExamModal;
