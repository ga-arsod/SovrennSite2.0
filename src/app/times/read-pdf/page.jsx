"use client"
import Head from "next/head";

import { useSearchParams } from 'next/navigation'; 
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import Spinner from "../../../components/Common/Spinner.jsx";
import { timesPdfDataApi } from "../../Redux/Slices/timesSlice.js";
import { useRouter } from "next/router";


const ReadPDF = () => {
    const router = useRouter();
    const { isPdfDataLoading,pdfData } = useSelector((store) => store.times);
    const dispatch=useDispatch();
    const searchParams = useSearchParams();
  const path = searchParams.get('path');
  const id = searchParams.get('id'); 
  

   useEffect(() => {
    if (path && router.isReady) {
        setPdfUrl(`https://api.sovrenn.com/news/pdf/read?path=${path}`);
    };
    
    return () => {
    };
}, [router]);
   
useEffect(()=>{
dispatch(timesPdfDataApi(id))
},[])
   

    if ( isPdfDataLoading) {
        return (
           <>
                <Head>
                    <title>Sovrenn Times PDF View</title>

                    <link
                        rel="canonical"
                        href="https://www.sovrenn.com/times/read-pdf"
                        key="canonical"
                    />
                </Head>
              <Spinner margin={15}/>
                
                </>
        )
    };

   

  

    return (
       <>
            <Head>
                <title>Sovrenn Times PDF View</title>

                <link
                    rel="canonical"
                    href="https://www.sovrenn.com/times/read-pdf"
                    key="canonical"
                />
            </Head>

            <div>
               {pdfData}
            </div>
            </>
    );
};

export default ReadPDF;