import React from 'react'

import PrimeHeading from '../../components/Prime/PrimeHeading'
import PrimeFilters from '../../components/Prime/PrimeFilters'
import Footer from '@/components/Home/Footer'
import PrimeTableContent from '../../components/Prime/PrimeTableContent'


const Prime = () => {
  return (
   <>
    <PrimeHeading/> 
   <PrimeFilters/>
   <PrimeTableContent/>
   {/* <Articles/> */}
   <Footer/>

   </>
  )
}

export default Prime
