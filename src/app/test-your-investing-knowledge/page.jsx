"use client";
import React, { useState, useEffect } from "react";
import NoLogin from "../../components/Auth/NoLogin"
import TestPerformance from "../../components/InvestingTest/TestPerformance";
import InvestingForm from "../../components/InvestingTest/InvestingForm";
import InvestingExam from "../../components/InvestingTest/InvestingExam";
import Information from "../../components/InvestingTest/Information";
import { useSelector } from "react-redux";
import { getInvestingQuestionsApi } from "../Redux/Slices/investingSlice";
import { useDispatch } from "react-redux";
import Spinner from "@/components/Common/Spinner";

const InvestingKnowledgeTest = () => {
  const {
    isExamStart,
    isExamScoreReturned,
    testQuestions,
    isQuestionLoading,
    isExamScoreLoading,
  } = useSelector((store) => store.investing);
  const { isAuth } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Test your investing knowledge";
      const link = document.querySelector("link[rel='canonical']");
      if (link) {
        link.href = `https://www.sovrenn.com/test-your-investing-knowledge`;
      }
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(getInvestingQuestionsApi());
    }
  }, [isExamStart, isExamScoreReturned]);

  if (!isAuth) {
    return <NoLogin />;
  }

  if (isQuestionLoading || isExamScoreLoading) return <Spinner margin={15} />;
  return (
    <>
      {isExamStart && isExamScoreReturned ? (
        <>
          {" "}
          <TestPerformance /> <Information />
        </>
      ) : !isExamStart && !isExamScoreReturned ? (
        <InvestingForm />
      ) : isExamStart ? (
        <>
          {" "}
          <InvestingExam testQuestions={testQuestions} />
        </>
      ) : (
        <></>
      )}

    </>
  );
};

export default InvestingKnowledgeTest;
