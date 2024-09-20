import React from 'react'

import PrimeHeading from '../../components/Prime/PrimeHeading'
import PrimeFilters from '../../components/Prime/PrimeFilters'
import Footer from '@/components/Home/Footer'
import PrimeTableContent from '../../components/Prime/PrimeTableContent'
import { Container } from '@mui/material'

const Prime = () => {
  return (
   <>
   <Container>
    <PrimeHeading/> 
   <PrimeFilters/>
   <PrimeTableContent/>
   {/* <Articles/> */}
   </Container>

   </>
  )
}

export default Prime
