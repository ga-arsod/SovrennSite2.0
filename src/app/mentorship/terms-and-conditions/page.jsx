"use client";
import styles from "../../../styles/mentorshipTandC.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React from "react";
import { mentorshipTermAndConditionsApi } from "../../Redux/Slices/mentorshipSlice";
import convertToHtml from "@/utils/convertToHtml";
import Spinner from "../../../components/Common/Spinner";
import { resetMentorshipState } from "../../Redux/Slices/mentorshipSlice";

const MentorshipTNdC = () => {
  const dispatch = useDispatch();
  const { isTermAndConditionsLoading, termAndConditions } = useSelector(
    (store) => store.mentorship
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = `Mentorship - Terms & Conditions`;
      const link = document.querySelector("link[rel='canonical']");
      if (link) {
        link.href = `https://www.sovrenn.com/mentorship`;
      }
    }
    dispatch(mentorshipTermAndConditionsApi()); 
  }, []);

  
 

  if (isTermAndConditionsLoading) return <Spinner margin={15} />;

  return (
    <>
       {termAndConditions?.length ? <div id={styles.MainContainer}>{convertToHtml(termAndConditions)}</div> : ""}
    </>
  );
};

export default MentorshipTNdC;
