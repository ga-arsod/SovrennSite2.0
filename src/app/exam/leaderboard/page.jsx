"use client";

import { useState } from "react";
import PastWinners from "../../../components/Exam/PastWinners";
import { useDispatch } from "react-redux";
import Leaderboard from "../../../components/Exam/Leaderboard";
import { useEffect } from "react";
import { pastWinnersApi } from "@/app/Redux/Slices/examSlice";
import { useSelector } from "react-redux";


export default function ExamLeaderboard() {
  const dispatch=useDispatch()
  const {pastWinners } = useSelector((store) => store.exam);
  const [isPastWinners,setIsPastWinners]=useState(false)
  useEffect(()=>{
  dispatch(pastWinnersApi())
  },[])
  useEffect(() => {
   
    if (typeof window !== "undefined") {
      document.title = `Check people's score`;
      const link = document.querySelector("link[rel='canonical']");
      if (link) {
        link.href = `https://www.sovrenn.com/exam/leaderboard`;
      }
    }
  }, []);
  return (
   <>
   {
    isPastWinners ? <PastWinners pastWinners={pastWinners}/> :  <Leaderboard isPastWinners={isPastWinners} setIsPastWinners={setIsPastWinners}/>
   }
  
   
   </>
  );
}
