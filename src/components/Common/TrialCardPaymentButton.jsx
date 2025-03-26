



import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { colors } from "../Constants/colors";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import {
  generateHashApi,
  setPaymentData,
} from "@/app/Redux/Slices/paymentSlice";
import { commonPricingApi } from "@/app/Redux/Slices/PlanSlice";
import LoginModal from "../Modal/LoginModal";


const StyledButton = styled(Button)`
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: white;
  text-transform: none;

  &:hover {
    background-color:${colors.themeButtonHover}; 
    color: white; 
  }
  @media (max-width: 700px) {
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const payuUrl = process.env.NEXT_PUBLIC_PAYU_URL;
const TrialCardPaymentButton = () => {
  const { commonPrice } = useSelector((store) => store.plan);
  const { userDetails, isAuth } = useSelector((store) => store.auth);
  const { paymentData } = useSelector((store) => store.payment);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose=()=>{
    setIsOpen(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(generateHashApi(paymentData));
    if (result.meta.requestStatus === "fulfilled") {
      document.getElementById("paymentForm").submit();
    } 
  };

  

  const handleButtonClick = async () => {
    if (!isAuth) {
      setIsOpen(true); 
    } else {
      const data = {
        txnid: Date.now(),
        amount: commonPrice?.full_access,
        productinfo: "full-access",
        firstname: userDetails?.first_name,
        email: userDetails?.email,
        udf1: userDetails?._id,
        udf2: 12,
      };
      dispatch(
        setPaymentData({
          ...data,
          phone: userDetails?.phone_number,
          state: userDetails?.state,
        })
      );
  
     
      const result = await dispatch(generateHashApi(data));
      if (result.meta.requestStatus === "fulfilled") {
        document.getElementById("paymentForm").submit(); 
      }
    }
  };
  

  return (
    <>
      <form
        id="paymentForm"
        action={payuUrl}
        method="post"
       
      >
        <input type="hidden" name="key" value={paymentData.key} />
        <input type="hidden" name="txnid" value={paymentData.txnid} />
        <input
          type="hidden"
          name="productinfo"
          value={paymentData.productinfo}
        />
        <input type="hidden" name="amount" value={paymentData.amount} />
        <input type="hidden" name="email" value={paymentData.email} />
        <input type="hidden" name="firstname" value={paymentData.firstname} />
        <input type="hidden" name="phone" value={paymentData.phone} />
        <input type="hidden" name="surl" value={paymentData.surl} />
        <input type="hidden" name="furl" value={paymentData.furl} />
        <input type="hidden" name="udf1" value={paymentData.udf1} />
        <input type="hidden" name="udf2" value={paymentData.udf2} />
        <input type="hidden" name="hash" value={paymentData.hash} />

        <StyledButton
          type="button"
          variant="contained"
          onClick={handleButtonClick}
        >
          Buy Full Access Now
        </StyledButton>
      </form>

     
     
        <LoginModal isOpen={isOpen} handleClose={handleClose} />
    
    </>
  );
};

export default TrialCardPaymentButton;
