"use client";
import React from 'react'
import { useEffect } from 'react'
import ProgressCard from '../../../components/Mentorship/ProgressCard'
import { Box } from '@mui/material'
import { colors } from '@/components/Constants/colors'
import CommunityCertificateSection from "../../../components/Mentorship/CommunityCertification"
import SessionDashboard from '../../../components/Mentorship/SessionDashboard'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Spinner from '@/components/Common/Spinner'
import { dashboardInfoApi, mentorshipInfoApi } from '@/app/Redux/Slices/mentorshipSlice';
import NoLogin from '@/components/Auth/NoLogin';

const Dashboard = () => {
    const dispatch= useDispatch()
    const {isDashboardInfoLoading,dashboardInfo,mentorshipInfo } = useSelector((store) => store.mentorship);
    const {userDetails,isAuth } = useSelector((store) => store.auth);

    useEffect(()=>{
      if(mentorshipInfo?.batch_id==null)
        dispatch(mentorshipInfoApi())
      else
        dispatch(dashboardInfoApi(mentorshipInfo?.batch_id))
    },[mentorshipInfo])

  

    if (!isAuth) {
        return <NoLogin />;
      }

    if(isDashboardInfoLoading)
    return <Spinner margin={15}/>
console.log(mentorshipInfo,"mentorshipInfo")
  return (
    <>
    
    <ProgressCard data={dashboardInfo}/>
   
    <SessionDashboard data={dashboardInfo}/>
    
  
    </>
  )
}

export default Dashboard;
