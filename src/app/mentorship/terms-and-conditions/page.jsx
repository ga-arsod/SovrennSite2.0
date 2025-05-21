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
        link.href = `https://www.sovrenn.com/exam`;
      }
    }
  }, []);

  useEffect(() => {
    dispatch(mentorshipTermAndConditionsApi());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(resetMentorshipState());
      const data = await dispatch(mentorshipTermAndConditionsApi());
    };

    fetchData();
  }, [dispatch]);

  if (isTermAndConditionsLoading) return <Spinner margin={15} />;

  return (
    <>
      <div id={styles.MainContainer}>{convertToHtml(termAndConditions)}</div>
    </>
  );
};

export default MentorshipTNdC;
