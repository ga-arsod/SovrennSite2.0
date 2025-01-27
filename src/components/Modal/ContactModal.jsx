import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import { useSelector } from "react-redux";
import { contactUsApi } from "@/app/Redux/Slices/homeSlice";
import { useDispatch } from "react-redux";

const StyledInputLabel = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #010c15;
  padding: 0px 24px 2px 20px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  padding: 0px 20px;

  & .MuiInputBase-root {
    font-size: 16px;
    line-height: 21px;
    color: #010c15;
    font-weight: 400;
    border-radius: 4px;
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

  & .MuiOutlinedInput-input {
    padding: 10px 12px;
  }

  & .MuiOutlinedInput-multiline {
    padding: 10px;
  }

  & .MuiInputBase-inputMultiline {
    padding: 0;
  }

  & .MuiOutlinedInput-input::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #96a7b4;
    opacity: 1;
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

const StyledTypography2 = styled(Typography)`
  font-size: 33px;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: -0.02em;
  color: ${colors.themeGreen};
  text-align: center;
  @media (max-width: 639px) {
    font-size: 26px;

    line-height: 17px;
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
    padding-top: 10px;
    padding-bottom: 10px;
  }
  :hover {
    background-color: ${colors.themeButtonHover};
    color: ${colors.white};
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
`;

const ContactModal = ({ openContactModal, setOpenContactModal }) => {
  const { userDetails } = useSelector((store) => store.auth);
  const handleClose = () => setOpenContactModal(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const handleSubmit =  () => {
   
console.log("hello submit")
    const payload = {
      name: `${userDetails?.first_name} ${userDetails?.last_name}`,
      email: userDetails?.email,
      phone_number: userDetails?.phone_number,
      message,
    };

     dispatch(contactUsApi({payload:payload}));

    setMessage("");
    handleClose();
  };

  return (
    <Modal
      open={openContactModal}
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
          width={{ xs: "90vw", sm: "65vw", md: "500px" }}
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
              <StyledTypography2>Write to us</StyledTypography2>
            </Grid>

            <Grid item width="100%">
              <Box component="form" noValidate autoComplete="off">
                <StyledInputLabel htmlFor="full_name">
                  Enter Your Full Name
                </StyledInputLabel>
                <StyledTextField
                  placeholder="Enter Your Full Name"
                  required
                  id="full_name"
                  name="full_name"
                  type="text"
                  sx={{ marginBottom: 2 }}
                  value={`${userDetails?.first_name} ${userDetails?.last_name} `}
                />
                <StyledInputLabel htmlFor="email">
                  Enter Your Email
                </StyledInputLabel>
                <StyledTextField
                  placeholder="Enter Your email"
                  required
                  id="email"
                  name="email"
                  type="text"
                  sx={{ marginBottom: 2 }}
                  value={`${userDetails?.email}`}
                />
                <StyledInputLabel htmlFor="phone_number">
                  Enter Your Phone No.
                </StyledInputLabel>
                <StyledTextField
                  placeholder="Enter Your Phone No."
                  id="phone_number"
                  name="phone_number"
                  required
                  type="tel"
                  value={`${userDetails?.phone_number || ""}`}
                  inputProps={{
                    pattern: "[0-9]*",
                    maxLength: 10,
                  }}
                  sx={{ marginBottom: 2 }}
                />
                <StyledInputLabel htmlFor="message">
                  Enter Your Message
                </StyledInputLabel>

                <StyledTextField
                  placeholder="Write your message here..."
                  required
                  id="message"
                  name="message"
                  type="text"
                  multiline
                  rows={3}
                  sx={{ marginBottom: 2 }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Grid container spacing={2} paddingX="20px">
                  <Grid item xs={12}>
                    <StyledButton2
                      disabled={message == ""}
                    
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Submit
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

export default ContactModal;
