import React from 'react'

import IpoHeader from '../../components/Prime/IpoHeader'
import Filters from '../../components/Prime/Filters'
import Footer from '@/components/Home/Footer'
import PrimeTableContent from '../../components/Prime/PrimeTableContent'

const Prime = () => {
  return (
   <>
    <IpoHeader/> 
    <Filters/>
   <PrimeTableContent/>
   <Footer/>

   </>
  )
}

export default Prime
