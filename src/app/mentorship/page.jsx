"use client";
import React, { useEffect, useState } from "react";
import LandingSection from "../../components/Mentorship/LandingSection";
import TimelineSection from "../../components/Mentorship/TimelineSection";
import Program from "../../components/Mentorship/Program";
import { useDispatch, useSelector } from "react-redux";
import { mentorshipInfoApi } from "../Redux/Slices/mentorshipSlice";
import Spinner from "@/components/Common/Spinner";
import { useSearchParams } from "next/navigation";
import MentorshipModal from "../../components/Modal/MentorshipModal";
import Faq from "@/components/Home/Faq";

const Mentorship = () => {
  const dispatch = useDispatch();
  const { isMentorshipInfoLoading, mentorshipInfo } = useSelector(
    (store) => store.mentorship
  );
  const { isAuth } = useSelector(
    (store) => store.auth
  );
  const searchParams = useSearchParams();
 
  const paymentStatus = searchParams.get("payment_status");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(mentorshipInfoApi());
  }, [isAuth]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      
    
      if (paymentStatus === "success") {
        setOpen(true);
      }
    }
  }, [searchParams]);
  

  if (isMentorshipInfoLoading) return <Spinner margin={15} />;

  return (
    <>
      {open && <MentorshipModal open={open} setOpen={setOpen} />}
      <LandingSection data={mentorshipInfo} />
      <TimelineSection data={mentorshipInfo?.timeline} />
      <Program data={mentorshipInfo?.why_join} />
      <Faq data={mentorshipInfo?.faqs} />
    </>
  );
};

export default Mentorship;
