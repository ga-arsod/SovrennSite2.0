import React from 'react'
import IpoHeader from '../../components/Ipo/IpoHeader'
import IpoTableData from '../../components/Ipo/IpoTableData'
import IpoFilters from '../../components/Ipo/IpoFilters'
import { Container } from '@mui/material'
import Footer from '@/components/Home/Footer'

const Ipo = () => {
  return (
  <>
 
  <IpoHeader/>
  <IpoFilters/>
  <IpoTableData/>
  <Footer/>
 
  </>
  )
}

export default Ipo

