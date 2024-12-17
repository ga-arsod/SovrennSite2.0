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
import { useSelector } from "react-redux";
import { generateHashApi,setPaymentData } from "@/app/Redux/Slices/paymentSlice";

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
  border-color: ${colors.navyBlue500};
  color: ${colors.navyBlue500};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 14px;
  padding-bottom: 14px;
  width: 100%;
  text-transform: none;
  background-color: ${colors.white};

  :hover {
    background-color: ${colors.themeButtonHover};
    color: ${colors.navyBlue500};
    border-color: ${colors.navyBlue500};
    outline: ${colors.navyBlue500};
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
  color: ${colors.white};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 14px;
  padding-bottom: 14px;
  width: 100%;
  text-transform: none;
  background-color: ${colors.themeGreen};
  white-space:nowrap;

  :hover {
    background-color: ${colors.themeButtonHover};
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
const payuUrl = process.env.NEXT_PUBLIC_PAYU_URL;
const PaymentModal = ({isPaymentOpen,handlePaymentClose}) => {
  const dispatch = useDispatch();
  
  
 
   
    const { isAuth, userDetails } = useSelector((store) => store.auth);
    const  {paymentData}  = useSelector((store) => store.payment);
    
  
   
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const result = await dispatch(generateHashApi(paymentData));
  
      if (result.meta.requestStatus === 'fulfilled') {
        document.getElementById('paymentForm').submit();
      } else {
        console.error('Error generating hash:', result.error.message);
      }
    };
  return (
    <Modal
      open={isPaymentOpen}
      onClose={handlePaymentClose}
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
            onClick={handlePaymentClose}
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
              <StyledTypography1 color={colors.navyBlue500} textAlign="center" marginTop={1}>
              This feature is only available for users with a plan.
              </StyledTypography1>
              <Typography textAlign="center" marginTop={2} color={colors.navyBlue500} sx={{fontWeight:400,fontSize:'16px',lineHeight:'19px'}}y>Unlock it by buying a plan</Typography>
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
                  <StyledButton1  variant="outlined"  onClick={handlePaymentClose}>
                    Cancel
                  </StyledButton1>
                </Grid>
                <Grid item xs={6}>
                <form
                      id="paymentForm"
                      action={payuUrl}
                      method="post"
                      onSubmit={handleSubmit}
                    >
                      <input type="hidden" name="key" value={paymentData.key} />
                      <input type="hidden" name="txnid" value={paymentData.txnid} />
                      <input type="hidden" name="productinfo" value={paymentData.productinfo} />
                      <input type="hidden" name="amount" value={paymentData.amount} />
                      <input type="hidden" name="email" value={paymentData.email} />
                      <input type="hidden" name="firstname" value={paymentData.firstname} />
                      <input type="hidden" name="phone" value={paymentData.phone} />
                      <input type="hidden" name="surl" value={paymentData.surl} />
                      <input type="hidden" name="furl" value={paymentData.furl} />
                      <input type="hidden" name="udf1" value={paymentData.udf1} />
                      <input type="hidden" name="udf2" value={paymentData.udf2} />
                      <input type="hidden" name="hash" value={paymentData.hash} />

                      <StyledButton2 type='submit'
                       variant="contained"
                       
                       
                        onClick={() => {
                          const data = {
                            txnid: Date.now(),
                            amount: (isAuth ? userDetails?.to_pay_for_fa : 4500),
                            productinfo: "full-access",
                            firstname: userDetails.first_name,
                            email: userDetails.email,
                            udf1: userDetails._id,
                            udf2: 12
                          }
                          dispatch(setPaymentData({
                            ...data,
                            phone: userDetails.phone_number,
                            state: userDetails.state,
                          }))
                        }}
                      >
                         {`Buy Full Access @ ₹${userDetails?.to_pay_for_fa}/yr`}
                      </StyledButton2>
                    </form>
                 
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </StyledBox>
    </Modal>
  );
};

export default PaymentModal;
