"use client";
import { useDispatch } from "react-redux";
import Test from "../../components/Exam/Test";
import { getExamQuestionsApi, examRulesApi } from "../Redux/Slices/examSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ExamHomePage from "../../components/Exam/ExamHomePage";
import Score from "../../components/Exam/Score";
import { changeExamState ,finishExamState} from "../Redux/Slices/examSlice";
import ViewScore from "../../components/Exam/ViewScore";
import Spinner from "../../components/Common/Spinner";

export default function InvestingKnowledge() {
  const dispatch = useDispatch();
  const { examQuestions, isExamScoreReturned, examAnswers, isSubmitLoading , isExamStart} =
    useSelector((store) => store.exam);
  const { isAuth } = useSelector((store) => store.auth);
  
  const [viewAnswers, setViewAnswers] = useState(false);
  useEffect(() => {
    if (isAuth) {
      dispatch(getExamQuestionsApi());
    }
  }, [isExamScoreReturned, viewAnswers, isExamStart]);
  useEffect(() => {
    dispatch(changeExamState());
    
  }, [isExamStart]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = `Test your investing knowedge`;
      const link = document.querySelector("link[rel='canonical']");
      if (link) {
        link.href = `https://www.sovrenn.com/exam`;
      }
    }
  }, []);
  if (isSubmitLoading) {
    return (
      <>
        <Spinner margin={15} />
      </>
    );
  }
 
  return (
    <>
      {isExamScoreReturned ? (
        <Score setViewAnswers={setViewAnswers} />
      ) : isExamStart ? (
        <Test examQuestions={examQuestions}  />
      ) : viewAnswers ? (
        <ViewScore setViewAnswers={setViewAnswers} />
      ) : (
        <ExamHomePage  />
      )}
    </>
  );
}
