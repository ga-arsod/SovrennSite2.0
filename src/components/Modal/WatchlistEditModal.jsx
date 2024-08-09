"use client";
import React, { useState,useEffect } from 'react';
import { Box, Typography, TextField, Button, IconButton, Modal, Grid } from '@mui/material';
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
const StyledInputLabel = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${colors.navyBlue400};
`;
const StyledTextField = styled(TextField)`
  width: 100%;

  & .MuiInputBase-root {
    font-weight: 400;
  font-size: 16px;
  line-height: 19px;
    color:${colors.navyBlue900};
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
  & .MuiInputBase-input::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color:${colors.greyBlue300}; 
    opacity: 0.7;
  }
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
  color: white;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 14px;
  padding-bottom: 14px;
  text-transform: none;
  background-color: ${colors.themeGreen};
  width: 100%; /* Added to make buttons take equal width */

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
const WatchlistEditModal = ({ isOpen,setIsOpen }) => {
    const [uptrendPotential, setUptrendPotential] = useState('');
    const [expectedPrice, setExpectedPrice] = useState('');
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  
    useEffect(() => {
      setIsSaveDisabled(!(uptrendPotential && expectedPrice));
    }, [uptrendPotential, expectedPrice]);

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
                Edit “KPI Green Energy Ltd.”
              </StyledTypography2>
            </Grid>
            <Grid item width="100%">
              <Box component="form" noValidate autoComplete="off">
                <Grid container alignItems="center" justifyContent='center' spacing={2} mb={2}>
                  <Grid item xs={4} >
                    <StyledInputLabel htmlFor="uptrend_potential">Uptrend Potential:</StyledInputLabel>
                  </Grid>
                  <Grid item >
                    <StyledTextField
                      placeholder="10%"
                      id="uptrend_potential"
                      name="uptrend_potential"
                      value={uptrendPotential}
                      onChange={(e) => setUptrendPotential(e.target.value)}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="center" justifyContent='center' spacing={2} mb={2}>
                  <Grid item xs={4} >
                    <StyledInputLabel htmlFor="price">Expected Price:</StyledInputLabel>
                  </Grid>
                  <Grid item >
                    <StyledTextField
                      placeholder="₹48"
                      id="price"
                      name="price"
                      value={expectedPrice}
                      onChange={(e) => setExpectedPrice(e.target.value)}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} mt={3}>
                  <Grid item xs={6}>
                    <StyledButton1 variant="outlined">
                      Cancel
                    </StyledButton1>
                  </Grid>
                  <Grid item xs={6}>
                    <StyledButton2 variant="contained" disabled={isSaveDisabled}>
                      Save
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

export default WatchlistEditModal;