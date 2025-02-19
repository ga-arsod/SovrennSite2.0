"use client";
import React, { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Button,
  InputAdornment,Grid
} from "@mui/material";
import { colors } from "../Constants/colors";
import { styled } from "@mui/system";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ProfileModal from "../../components/Modal/ProfileModal";
import { resetPasswordApi } from "@/app/Redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { togglePasswordModal } from "@/app/Redux/Slices/authSlice";
import moment from "moment";
import PaymentButton from "../Common/PaymentButton"
import Link from "next/link";


const StyledInputLabel = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
  
`;



const StyledTextField = styled(TextField)`
  width: 100%;

  & .MuiInputBase-root {
    font-size: 16px;
    line-height: 21px;
    color: #010c15;
    font-weight: 400;
    border-radius: 8px;
    background-color: transparent !important;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    -webkit-text-fill-color: #010c15 !important;
    background-clip: text !important;
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

const GreenBorderColorOutlinedIcon = styled(BorderColorOutlinedIcon)`
  color: ${colors.themeGreen};
  cursor: pointer;
  font-size: 17px;
`;
const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  padding-top: 10px;
  padding-bottom: 10px;
  
  text-transform: none;
  background-color: ${colors.white};

  
  @media (max-width: 639px) {
  width:100%;
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;
const StyledTypography = styled(Typography)`
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
`;

const StyledBox = styled(Box)`
  box-shadow: 0px 1px 2px 0px #1018280f;
  box-shadow: 0px 1px 3px 0px #1018281a;
  border-radius: 8px;
`;

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  
 
  const { isPasswordModalOpen } = useSelector((store) => store.auth);
  const subscriptionDetails = useSelector(
    (store) => store.auth.subscriptionDetails[0]
  );
 
  return (
    <>
     
      <ProfileModal isOpen={isPasswordModalOpen} />
     
      <StyledBox
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", md: "822px" },
          margin: "auto",
          marginTop: { xs: "24px", sm: "90px" },
          borderRadius: "8px",
          padding: "24px",
          backgroundColor: "#fff",
        }}
      >
      
        <Box sx={{ marginBottom: { xs: "12px", sm: "24px" } }}>
          <StyledInputLabel htmlFor="password">Password</StyledInputLabel>
          <StyledTextField
            onClick={() => {
              setIsOpen(true);
            }}
            type="password"
            id="password"
            name="password"
            value="***********"
            sx={{ marginBottom: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => {
                    dispatch(togglePasswordModal());
                  }}
                >
                  <GreenBorderColorOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          sx={{
            borderTop: "1px solid #e0e0e0",
            paddingTop: "24px",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 4,
            justifyContent: "space-between",
          }}
        >
        
        {
          !subscriptionDetails ?
          <Grid container>
          <Grid item>
          <Typography sx={{fontSize:"18px",lineHeight:"21px"}} gutterBottom>You do not have any access, upgrade now to continue your investing journey.</Typography>
          </Grid>
          <Grid item>
          <Grid
                container
                display="flex"
               
              gap={1}
                width="100%"
              >
                <Grid item width={{xs:"100%",sm:"auto"}}  >
                  <Link href="/pricing">
                    <StyledButton1 variant="outlined">View Plans</StyledButton1>
                  </Link>
                </Grid>

                <Grid item width={{xs:"100%",sm:"auto"}} >
                  <PaymentButton/>
                </Grid>
              </Grid>
          </Grid>
          </Grid>  :
          <>
           <Box>
            <StyledTypography sx={{ marginBottom: "8px" }}>
              Access
            </StyledTypography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.navyBlue500,
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "19px",
                color: "#fff",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#001825",
                },
              }}
            >
              {subscriptionDetails?.type === "full-access"
                ? "Sovrenn Full Access"
                : subscriptionDetails?.type === "news"
                ? "Sovrenn Times Access"
                : subscriptionDetails?.type === "basket"
                ? "Sovrenn Discovery Access"
                : subscriptionDetails?.type === "quarterly"
                ? "Sovrenn Quarterly Access"
                : subscriptionDetails?.type === "monthly"
                ? "Sovrenn Monthly Access"
                : subscriptionDetails?.type === "life"
                ? "Sovrenn Lifetime Access" 
                : subscriptionDetails?.type === "trial" ?
                "Sovrenn Trial Access" 
                : "No Access"}
            </Button>
          </Box>

          <Box>
            <StyledTypography sx={{ marginBottom: "8px" }}>
              Ends On
            </StyledTypography>
            <StyledTypography color={colors.navyBlue300}>
              {moment(subscriptionDetails?.expiry_date).format("Do MMM YY")}
            </StyledTypography>
          </Box>
          </>
        }
     
         
        </Box>
       
      </StyledBox>
    </>
  );
};
export default ProfileSettings;
