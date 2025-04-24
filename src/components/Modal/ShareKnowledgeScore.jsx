"use client";
import React, { useState } from "react";
import { Modal, Box, Typography, IconButton, TextField } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { WhatsappShareButton, FacebookShareButton ,TwitterShareButton } from 'next-share';
import { colors } from "../Constants/colors";
import styled from "@emotion/styled";
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
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.04em;
`;

const StyledTypography3 = styled(Typography)`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
`;

const ShareKnowledgeScore = ({ open, handleClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://Sovrenn.com/test-your-investing-knowledge";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
      
        <IconButton onClick={handleClose} sx={{ position: "absolute", top: 6, right: 6 }}>
          <CloseIcon />
        </IconButton>

        <StyledTypography1 color="#1C1C1C" mt={1}>
          Challenge Your Friends!
        </StyledTypography1>
        <StyledTypography2 color="#1C1C1C" mt={1}>
          Share this test with your friend
        </StyledTypography2>

        {/* Social Media Share Buttons */}
        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <Box textAlign="center">
            <WhatsappShareButton url={shareUrl}>
              <IconButton sx={{ bgcolor: "#25D3661A", color: "#25D366", padding: 1.5 }}>
                <WhatsAppIcon />
              </IconButton>
            </WhatsappShareButton>
            <StyledTypography3 color="#25D366" mt={1}>
              WhatsApp
            </StyledTypography3>
          </Box>

          <Box textAlign="center">
            <TwitterShareButton url={shareUrl}>
              <IconButton sx={{ bgcolor: "#F6F5F5", color: "#000910", padding: 1.5 }}>
                <XIcon />
              </IconButton>
            </TwitterShareButton>
            <StyledTypography3 color="#000910" mt={1}>
              X
            </StyledTypography3>
          </Box>

          <Box textAlign="center">
            <FacebookShareButton url={shareUrl}>
              <IconButton sx={{ bgcolor: "#1877F21A", color: "#1877F2", padding: 1.5 }}>
                <FacebookIcon />
              </IconButton>
            </FacebookShareButton>
            <StyledTypography3 color="#1877F2" mt={1}>
              Facebook
            </StyledTypography3>
          </Box>
        </Box>

        {/* Share URL Input */}
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
                fontSize: "14px",
                color: "#868686",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-input": {
                fontSize: "14px",
                padding: "10px 12px",
              },
            }}
          />
        </Box>
        {copied && <Typography color={colors.themeGreen} sx={{fontSize:"12px"}} mt={1}>Copied to clipboard!</Typography>}
      </Box>
    </Modal>
  );
};

export default ShareKnowledgeScore;
