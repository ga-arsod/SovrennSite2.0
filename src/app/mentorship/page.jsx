"use client"
import React, { useEffect, useState } from 'react'
import LandingSection from '../../components/Mentorship/LandingSection'
import TimelineSection from "../../components/Mentorship/TimelineSection"
import Program from "../../components/Mentorship/Program"
import { useDispatch } from 'react-redux'
import { mentorshipInfoApi } from '../Redux/Slices/mentorshipSlice'
import { useSelector } from 'react-redux'
import Spinner from '@/components/Common/Spinner'
import { useSearchParams } from "next/navigation";
import MentorshipModal from "../../components/Modal/MentorshipModal"
const page = () => {
  const dispatch= useDispatch();
    const {isMentorshipInfoLoading,mentorshipInfo } = useSelector((store) => store.mentorship);
    const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment_status");
  const [open,setOpen]=useState(paymentStatus=="success" ? true :false)
  useEffect(()=>{
    dispatch(mentorshipInfoApi())
  },[])
 
  if(isMentorshipInfoLoading)
    return <Spinner margin={15}/>

  return (
    <>
     {paymentStatus === "success" ? <MentorshipModal open={open} setOpen={setOpen} /> : <></> }
    <LandingSection data={mentorshipInfo}/>
    <TimelineSection data={mentorshipInfo?.timeline}/>
    <Program data={mentorshipInfo?.why_join}/>
    </>
  )
}

export default page
