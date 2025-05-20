import React from 'react'
import styled from '@emotion/styled';
import { colors } from '../Constants/colors';
import { Button } from '@mui/material';
import LoginModal from '../Modal/LoginModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { generateHashApi,setMentorshipPaymentData} from '@/app/Redux/Slices/paymentSlice';
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
    const dispatch=useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const { mentorshipInfo } = useSelector((store) => store.mentorship);
    const {mentorshipPaymentData } = useSelector((store) => store.payment);
    const { isAuth,userDetails } = useSelector((store) => store.auth);
      const handleClose=()=>{
        setIsOpen(false)
      }
       const handleButtonClick = async () => {
        
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
              udf3:"website"
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
        console.log(mentorshipPaymentData,"data")
  return (
    <>
     <LoginModal isOpen={isOpen} handleClose={handleClose} />
     <form
        id="paymentForm"
        action={payuUrl}
        method="post"
       
      >
        <input type="hidden" name="key" value={mentorshipPaymentData?.key} />
        <input type="hidden" name="txnid" value={mentorshipPaymentData?.txnid} />
        <input
          type="hidden"
          name="productinfo"
          value={mentorshipPaymentData?.productinfo}
        />
        <input type="hidden" name="amount" value={mentorshipPaymentData?.amount} />
        <input type="hidden" name="email" value={mentorshipPaymentData?.email} />
        <input type="hidden" name="firstname" value={mentorshipPaymentData?.firstname} />
        <input type="hidden" name="phone" value={mentorshipPaymentData?.phone} />
        <input type="hidden" name="surl" value={mentorshipPaymentData?.surl} />
        <input type="hidden" name="furl" value={mentorshipPaymentData?.furl} />
        <input type="hidden" name="udf1" value={mentorshipPaymentData?.udf1} />
        <input type="hidden" name="udf2" value={mentorshipPaymentData?.udf2} />
        <input type="hidden" name="udf3" value={mentorshipPaymentData?.udf3} />
        <input type="hidden" name="hash" value={mentorshipPaymentData?.hash} />
        <StyledButton1 mb={5} onClick={handleButtonClick}>{mentorshipInfo?.button_details?.text}</StyledButton1>
        
      </form>
      
    </>
  )
}

export default ApplyButton
