"use client"
import React,{useEffect} from 'react'
import PulseIntro from '../../components/Pulse/PulseIntro'
import { Container } from '@mui/material'
import PulseArticle from "../../components/Pulse/PulseArticle"

import { useSelector } from 'react-redux'
import { pulseFilterApi } from '../Redux/Slices/pulseSlice'
import { useDispatch } from 'react-redux'
import Footer from '@/components/Home/Footer'

const PulsePage = () => {
  const dispatch=useDispatch();
  
  useEffect(()=>{
    dispatch(pulseFilterApi())
  },[dispatch])
  return (
    <>
    <Container>
{/* <PulseIntro/> */}
<PulseArticle/>

</Container>
<Footer/>
    </>
  )
}

export default PulsePage;
