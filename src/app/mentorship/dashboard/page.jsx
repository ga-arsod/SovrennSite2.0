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
import { dashboardInfoApi } from '@/app/Redux/Slices/mentorshipSlice';


const Dashboard = () => {
    const dispatch= useDispatch()
    const {isDashboardInfoLoading,dashboardInfo } = useSelector((store) => store.mentorship);
    const {userDetails } = useSelector((store) => store.auth);

    useEffect(()=>{
        dispatch(dashboardInfoApi(userDetails?._id))
    },[])

    if(isDashboardInfoLoading)
    return <Spinner margin={15}/>

  return (
    <>
    
    <ProgressCard data={dashboardInfo}/>
   
    <SessionDashboard data={dashboardInfo}/>
    
  
    </>
  )
}

export default Dashboard;
