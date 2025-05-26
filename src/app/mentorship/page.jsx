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
  const { isAuth } = useSelector((store) => store.auth);
  const searchParams = useSearchParams();

  const paymentStatus = searchParams.get("payment_status");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(mentorshipInfoApi());

    return () => {

    };
  }, [isAuth]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (paymentStatus === "success") {
        setOpen(true);
      }
    };

    return () => {

    };
  }, [searchParams]);

  // Mentorship page meta data

  useEffect(() => {
    const title = "Request a mentor";
    const description =
      "Kickstart your investing journey with an exclusive 50-person mentorship program crafted for beginners. Master stock market investing in 30 days with expert-led, step-by-step training.";
    const canonicalUrl = "https://www.sovrenn.com/mentorship";

    if (typeof document !== "undefined") {
      document.title = title;

      let metaDescription = document.querySelector("meta[name='description']");
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        metaDescription.setAttribute("content", description);
        document.head.appendChild(metaDescription);
      }

      let canonicalLink = document.querySelector("link[rel='canonical']");
      if (canonicalLink) {
        canonicalLink.setAttribute("href", canonicalUrl);
      } else {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        canonicalLink.setAttribute("href", canonicalUrl);
        document.head.appendChild(canonicalLink);
      }
    }
  }, []);

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
