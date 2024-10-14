"use client"
import Head from "next/head";
import { useSearchParams } from 'next/navigation'; 
import { useEffect, useState } from "react";
import PdfViewer from "../../../components/PdfViewer"
import Spinner from "../../../components/Common/Spinner.jsx";

import styles from "../../../styles/NewsPdfList.module.css"

const ReadPDF = () => {
    const searchParams = useSearchParams();
    const path = searchParams.get('path');
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isPdfLoading, setIsPdfLoading] = useState(true);

    useEffect(() => {
        if (path) {
            // Construct the full PDF URL using the 'path'
            setPdfUrl(`https://api.sovrenn.com/news/pdf/read?path=${path}`);
            setIsPdfLoading(false);
        }
    }, [path]);

    if (isPdfLoading) {
        return (
           <>
                <Head>
                    <title>Sovrenn Times PDF View</title>
                    <link rel="canonical" href="https://www.sovrenn.com/times/read-pdf" key="canonical" />
                </Head>
                <Spinner margin={15} />
            </>
        );
    }

    return (
       <>
            <Head>
                <title>Sovrenn Times PDF View</title>
                <link rel="canonical" href="https://www.sovrenn.com/times/read-pdf" key="canonical" />
            </Head>
            <div id={styles.MainContainer}>
                {pdfUrl && <PdfViewer pdfPath={pdfUrl} />}
            </div>
        </>
    );
};

export default ReadPDF;