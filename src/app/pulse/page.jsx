"use client"
import React,{useEffect} from 'react'
import PulseIntro from '../../components/Pulse/PulseIntro'
import { Container } from '@mui/material'
import PulseArticle from "../../components/Pulse/PulseArticle"
import PulseFilter from '@/components/Pulse/PulseFilter'
import { useSelector } from 'react-redux'
import { pulseFilterApi } from '../Redux/Slices/pulseSlice'
import { useDispatch } from 'react-redux'

const PulsePage = () => {
  const dispatch=useDispatch();
  const { isPulseFilterOpen, } = useSelector(
    (store) => store.pulse
  );
  useEffect(()=>{
    dispatch(pulseFilterApi())
  },[])
  return (
    <>
    <Container>
{/* <PulseIntro/> */}
<PulseArticle/>
{/* <PulseFilter isOpen={isPulseFilterOpen}/> */}
</Container>
    </>
  )
}

export default PulsePage;
