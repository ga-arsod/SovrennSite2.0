"use client";
import React, { useState } from "react";
import { Modal, Box, Typography, IconButton, TextField, Button } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Image from "next/image";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import XIcon from '@mui/icons-material/X';

// Styled Box for Modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
  width: { xs: "90%", sm: "400px" },
  textAlign: "center",
};

const StyledTypography1 = styled(Typography)`
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: -0.04em;
//   @media (max-width: 639px) {
//     font-size: 23px;
//     font-weight: 600;
//     line-height: 28px;
//     letter-spacing: -0.02em;
//   }
`;
const StyledTypography2= styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.04em;

`;
const StyledTypography3= styled(Typography)`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
 

`;
const ShareKnowledgeScore = ({ open, handleClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://example.com/article/social-share-modal";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 6, right: 6 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <StyledTypography1 color="#1C1C1C" mt={1} >
          Challenge Your Friends!
        </StyledTypography1>
        <StyledTypography2 color="#1C1C1C" mt={1}>
          Share this test with your friend
        </StyledTypography2>

        {/* Social Media Icons */}
        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <Box textAlign="center">
            <IconButton sx={{ bgcolor: "#25D3661A", color:"#25D366",padding:1.5 }}>
              <WhatsAppIcon />
            </IconButton>
            <StyledTypography3 color="#25D366" mt={1} >WhatsApp</StyledTypography3>
          </Box>

          <Box textAlign="center">
            <IconButton sx={{ bgcolor: "#F6F5F5", color: "black" ,padding:1.5}}>
            <XIcon />
            </IconButton>
            <StyledTypography3 color={colors.navyBlue900} mt={1}>X</StyledTypography3>
          </Box>

          <Box textAlign="center">
            <IconButton sx={{ bgcolor: "#1877F21A", color: "#1877F2",padding:1.5 }}>
              <FacebookIcon />
            </IconButton>
            <StyledTypography3 color="#1877F2" mt={1}>Facebook</StyledTypography3>
          </Box>
        </Box>

        {/* Share Link with Copy Button */}
        <Box display="flex" alignItems="center" mt={3}>
        <TextField
  fullWidth
  value={shareUrl}
  variant="outlined"
  size="small"
  InputProps={{
    readOnly: true,
    endAdornment: (
      <IconButton onClick={copyToClipboard} edge="end">
        <ContentCopyIcon fontSize="small" />
      </IconButton>
    ),
    sx: {
      fontSize: "14px", // Adjust text size
     
      color:"#868686"
    },
  }}
  sx={{
    "& .MuiOutlinedInput-input": {
      fontSize: "14px", // Reduce input text size
      padding: "10px 12px", // Adjust padding for a smaller feel
    },
  }}
/>

</Box>
{copied && <Typography color="green" mt={1}>Copied to clipboard!</Typography>}

       
      </Box>
    </Modal>
  );
};

export default ShareKnowledgeScore;
