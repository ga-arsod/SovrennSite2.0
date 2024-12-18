"use client"
import React,{useEffect} from 'react'
import PulseIntro from '../../components/Pulse/PulseIntro'
import { Container } from '@mui/material'
import PulseArticle from "../../components/Pulse/PulseArticle"

import { useSelector } from 'react-redux'
import { pulseFilterApi } from '../Redux/Slices/pulseSlice'
import { useDispatch } from 'react-redux'
import Footer from '@/components/Home/Footer'
import { getPortfolioCompanies } from '../Redux/Slices/pulseSlice'


const PulsePage = () => {
  const dispatch=useDispatch();
   const { isAuth, userDetails } = useSelector((store) => store.auth);
   const {  portfolioCompanies,
       } = useSelector(store => store.pulse);
  
  useEffect(()=>{
    dispatch(getPortfolioCompanies())
    dispatch(pulseFilterApi())
  },[dispatch])

  return (
    <>
    <Container>
{
  !isAuth || !portfolioCompanies.length ? <PulseIntro/> :<PulseArticle/>
}


</Container>
<Footer/>
    </>
  )
}

export default PulsePage;
