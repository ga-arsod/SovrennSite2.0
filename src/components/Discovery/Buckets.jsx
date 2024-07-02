"use client"
import React, { useEffect } from 'react'
import DiscoveryCard from "../Cards/DiscoveryCard"
import { useDispatch } from 'react-redux'
import { importantBucketsApi } from '@/app/Redux/Slices/discoverySlice'
import { useSelector } from 'react-redux'


const Buckets = () => {
    const dispatch=useDispatch()
    const importantBucketsData=useSelector((store)=>store.discovery.importantBuckets)
    useEffect(()=>{
        dispatch(importantBucketsApi())
    },[])
    console.log(importantBucketsData,"data")
  return (
   <>
     <DiscoveryCard title="Functional"/>
        <DiscoveryCard title="Sectoral"/>
        <DiscoveryCard title="Important Buckets" data={importantBucketsData}/>
   </>
  )
}

export default Buckets;
