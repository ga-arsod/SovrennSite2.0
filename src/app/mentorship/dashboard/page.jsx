"use client";
import React from 'react'
import { useEffect, useState } from 'react'
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
import DetailedTimelineModal from '@/components/Mentorship/DetailedTimelineModal';

const Dashboard = () => {
  const dispatch = useDispatch()
  const { isDashboardInfoLoading, dashboardInfo, mentorshipInfo } = useSelector((store) => store.mentorship);
  const { userDetails, isAuth } = useSelector((store) => store.auth);
  const [timelineOpen, setTimelineOpen] = useState(false)

  useEffect(() => {
    if (mentorshipInfo?.batch_id == null)
      dispatch(mentorshipInfoApi())
    else
      dispatch(dashboardInfoApi(mentorshipInfo?.batch_id))
  }, [mentorshipInfo, isAuth])



  if (!isAuth) {
    return <NoLogin />;
  }

  if (isDashboardInfoLoading)
    return <Spinner margin={15} />

  return (
    <>
      <DetailedTimelineModal timelineOpen={timelineOpen} setTimelineOpen={setTimelineOpen} data={mentorshipInfo?.timeline?.detailed_timeline} />
      <ProgressCard data={dashboardInfo} />

      <SessionDashboard data={dashboardInfo} setTimelineOpen={setTimelineOpen} />


    </>
  )
}

export default Dashboard;
