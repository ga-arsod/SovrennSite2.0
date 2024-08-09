"use client";
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';

const StyledBox = styled(Box)`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative; /* Added for positioning the cross icon */
`;
const StyledTypography2 = styled(Typography)`
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.04em;
  color: #627B8F;
  text-align: center;
`;
const WatchlistEditModal = () => {
  const [uptrendPotential, setUptrendPotential] = useState('10%');
  const [expectedPrice, setExpectedPrice] = useState('₹48');

  const handleSave = () => {
    // Handle save logic here
    alert('Save button clicked');
  };

  const handleCancel = () => {
    // Handle cancel logic here
    alert('Cancel button clicked');
  };

  const handleClose = () => {
    // Handle close logic here
    alert('Close button clicked');
  };

  return (
    <StyledBox>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{ position: 'absolute', top: 10, right: 10 }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" gutterBottom>
        Edit “KPI Green Energy Ltd.”
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          margin="dense"
          label="Uptrend Potential"
          type="text"
          fullWidth
          variant="outlined"
          value={uptrendPotential}
          onChange={(e) => setUptrendPotential(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Expected Price"
          type="text"
          fullWidth
          variant="outlined"
          value={expectedPrice}
          onChange={(e) => setExpectedPrice(e.target.value)}
        />
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </StyledBox>
  );
};



export default WatchlistEditModal;