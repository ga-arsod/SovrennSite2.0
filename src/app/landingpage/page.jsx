import React from 'react'
import LandingHeader from '../../components/LandingPage/LandingHeader'
import LandingForm from "../../components/LandingPage/LandingForm"
import Features from "../../components/LandingPage/Features"
import TrialCard from "../../components/LandingPage/TrialCard"
import CustomerReview from "../../components/LandingPage/CustomerReview"
import DownloadApp from "../../components/LandingPage/DownloadApp"
import Footer from "../../components/Home/Footer"
const LandingPage = () => {
  return (
   <>
   <LandingHeader/>
   <Features/>
   <LandingForm/>
 
   <TrialCard/>
   <CustomerReview/>
   <DownloadApp/>
  
   <TrialCard/>
  <Footer/>
 
   </>
  )
}

export default LandingPage

