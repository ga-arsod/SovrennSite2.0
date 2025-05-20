import React from 'react'
import styled from '@emotion/styled';
import { colors } from '../Constants/colors';
import { Button } from '@mui/material';
import LoginModal from '../Modal/LoginModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { generateHashApi, setMentorshipPaymentData } from '@/app/Redux/Slices/paymentSlice';
import { useDispatch } from 'react-redux';

const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: #f4f3f3;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding: 14px 20px;
  text-transform: none;
  background: linear-gradient(45deg, #0c4340 0%, #06a77d 100%);
  margin-top: 28px;

  :hover {
    color: #f4f3f3;
    background: linear-gradient(45deg, #0c4340 0%, #06a77d 100%);
  }
`;

const payuUrl = process.env.NEXT_PUBLIC_PAYU_URL;

const ApplyButton = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const { mentorshipInfo } = useSelector((store) => store.mentorship);
  const { paymentData } = useSelector((store) => store.payment);
  const { isAuth, userDetails } = useSelector((store) => store.auth);
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleButtonClick = async (e) => {
    e.preventDefault();

    if (!isAuth) {
      setIsOpen(true);
    } else {
      const data = {
        txnid: Date.now(),
        amount: mentorshipInfo?.course?.info?.offer_price,
        productinfo: "request_mentor",
        firstname: userDetails?.first_name,
        email: userDetails?.email,
        udf1: userDetails?._id,
        udf2: mentorshipInfo?.batch_id,
        udf3: "website"
      };

      dispatch(
        setMentorshipPaymentData({
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
      <LoginModal isOpen={isOpen} handleClose={handleClose} />
      <form
        id="paymentForm"
        action={payuUrl}
        method="post"

      >
        <input type="hidden" name="key" value={paymentData?.key} />
        <input type="hidden" name="txnid" value={paymentData?.txnid} />
        <input
          type="hidden"
          name="productinfo"
          value={paymentData?.productinfo}
        />
        <input type="hidden" name="amount" value={paymentData?.amount} />
        <input type="hidden" name="email" value={paymentData?.email} />
        <input type="hidden" name="firstname" value={paymentData?.firstname} />
        <input type="hidden" name="phone" value={paymentData?.phone} />
        <input type="hidden" name="surl" value={paymentData?.surl} />
        <input type="hidden" name="furl" value={paymentData?.furl} />
        <input type="hidden" name="udf1" value={paymentData?.udf1} />
        <input type="hidden" name="udf2" value={paymentData?.udf2} />
        <input type="hidden" name="udf3" value={paymentData?.udf3} />
        <input type="hidden" name="hash" value={paymentData?.hash} />

      </form>
      <StyledButton1 mb={5} disabled={!mentorshipInfo?.button_details?.allow_payment} onClick={handleButtonClick}>{mentorshipInfo?.button_details?.text}</StyledButton1>

    </>
  )
};

export default React.memo(ApplyButton);