"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import Image from "next/image";
import { colors } from "../Constants/colors";
import Link from "next/link";
import LoginModal from "../Modal/LoginModal";
import { useDispatch } from "react-redux";
import { generateHashApi } from "@/app/Redux/Slices/paymentSlice";
import { useState } from "react";
import {setMentorshipPaymentData } from "@/app/Redux/Slices/paymentSlice";

const StyledTypography1 = styled(Typography)`
  font-size: 34px;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: -0.04em;
     @media (max-width: 639px) {
      font-size: 23px;
      font-weight: 600;
      line-height: 28px;
      letter-spacing: -0.02em;
    }
`;

const StyledTypography2 = styled(Typography)`
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
   @media (max-width: 639px) {
      font-size: 16px;
      font-weight: 400;
      line-height: 19px;
    
    }
`;
const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: ${colors.themeGreen};
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding: 12px 20px;
  text-transform: none;
  background-color: white;

  :hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
  @media (max-width: 639px) {
    width: 100%;
    padding: 12px 0px;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding: 12px 20px;
  background-color: ${colors.themeGreen};
  text-transform: none;

  :hover {
    background-color: ${colors.themeButtonHover};
  }
  @media (max-width: 700px) {
    width: 100%;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
  }
`;
const payuUrl = process.env.NEXT_PUBLIC_PAYU_URL;

export default function MentorshipPromo() {
    const dispatch=useDispatch();
  const { mentorshipInfo } = useSelector((store) => store.mentorship);
   const { paymentData } = useSelector((store) => store.payment);
    const { isAuth, userDetails } = useSelector((store) => store.auth);
    const [isOpen, setIsOpen] = useState(false);
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
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        mx: "auto",
        py: 6,
        backgroundImage: `url('/rectangle2.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
     
      <Grid container justifyContent="center">
        <Grid item width={{ xs: "100%", sm: "80%" }}>
          <StyledTypography1 color={colors.navyBlue900} textAlign="center">
            {mentorshipInfo?.course?.heading}
            <span style={{ color: colors.themeGreen }}>
              {` ${mentorshipInfo?.course?.title}`}
            </span>
          </StyledTypography1>

          <StyledTypography2
            sx={{ mt: 2.5, color: colors.greyBlue500 }}
            textAlign="center"
          >
            {mentorshipInfo?.course?.description}
          </StyledTypography2>
        </Grid>
      </Grid>

      <Card
        sx={{
          mt: 6,
          px: { xs: 2, md: 6, lg: 12 },
          boxShadow: "none",
          backgroundColor: "transparent",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Image
                src="/mentorship-promo-image.png"
                alt="Mentorship Program"
                width={600}
                height={600}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              {mentorshipInfo?.course?.details?.map((item, index) => (
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  key={index}
                  mb={2.5}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      minWidth: 40,
                      borderRadius: "50%",
                      backgroundColor: "#E8F6F5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0px 2px 9.4px 0px #00000012",
                    }}
                  >
                    <Image
                      src={item?.prefix_icon_url}
                      alt="icon"
                      width={20}
                      height={20}
                    />
                  </Box>

                  <StyledTypography2 color={colors.navyBlue600}>
                    {item.text}
                  </StyledTypography2>
                </Stack>
              ))}
            </Stack>

            <Box bgcolor="#F7B13C" py={0.5} my={3.5}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "20px",
                  lineHeight: "24px",
                  textAlign: "center",
                }}
              >
                {mentorshipInfo?.course?.info?.leading}{" "}
                <del>{`₹${mentorshipInfo?.course?.info?.mrp}`}</del>{" "}
                <span
                  style={{ fontWeight: "bold" }}
                >{`₹${mentorshipInfo?.course?.info?.offer_price}`}</span>
                <Box
                  component="span"
                  sx={{
                    display: { xs: "block", sm: "inline" },
                  }}
                >
                  {" "}
                  {mentorshipInfo?.course?.info?.trailing}
                </Box>
              </Typography>
            </Box>

            <Grid container width="100%">
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  width: "100%",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Link href="/mentorship" passHref legacyBehavior>
                    <StyledButton1 variant="outlined" fullWidth>
                      View More Details
                    </StyledButton1>
                  </Link>
                </Box>
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
                <StyledButton2 fullWidth onClick={handleButtonClick}>Request a mentor Now</StyledButton2>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Box>
    </>
  );
}
