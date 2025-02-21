"use client";

import { useState } from "react";
import PastWinners from "../../../components/Exam/PastWinners";
import { useDispatch } from "react-redux";
import Leaderboard from "../../../components/Exam/Leaderboard";
import { useEffect } from "react";
import { pastWinnersApi } from "@/app/Redux/Slices/examSlice";
import { useSelector } from "react-redux";
import NoLogin from "../../../components/Auth/NoLogin";
import { leaderboardApi } from "@/app/Redux/Slices/examSlice";

export default function ExamLeaderboard() {
  const dispatch=useDispatch()
  const {pastWinners } = useSelector((store) => store.exam);
  const {isAuth } = useSelector((store) => store.auth);
  const [isPastWinners,setIsPastWinners]=useState(false)
  useEffect(()=>{
    if(isAuth)
    {
      dispatch(pastWinnersApi())
      dispatch(leaderboardApi())
    }
 

  },[])
  useEffect(() => {
   
    if (typeof window !== "undefined") {
      document.title = `Exam leaderboard`;
      const link = document.querySelector("link[rel='canonical']");
      if (link) {
        link.href = `https://www.sovrenn.com/exam/leaderboard`;
      }
    }
  }, []);

  if (!isAuth) {
    return <NoLogin/>;
  }
  return (
   <>
   {
    isPastWinners ? <PastWinners pastWinners={pastWinners}/> :  <Leaderboard isPastWinners={isPastWinners} setIsPastWinners={setIsPastWinners}/>
   }
  
   
   </>
  );
}
