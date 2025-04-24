"use client";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PDFViewer from "../../../components/PdfViewer.jsx";
import Spinner from "../../../components/Common/Spinner.jsx";
import { useSelector } from "react-redux";
import styles from "../../../styles/NewsPdfList.module.css"

const ReadPDF = () => {
  const searchParams = useSearchParams();
  const path = searchParams.get("path");
  const [pdfUrl, setPdfUrl] = useState(null);
   const {  examCertificate } = useSelector((store) => store.exam);
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const { isAuth, userDetails } = useSelector((store) => store.auth);
  useEffect(() => {
    if (examCertificate) {
      
      setPdfUrl(path);
      setIsPdfLoading(false);
    }
  }, [path, isAuth]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Sovrenn Exam Certificate";
      const link = document.querySelector("link[rel='canonical']");
      if (link) {
        link.href = `https://www.sovrenn.com/exam/view-certificate`;
      }
    }
  }, []);

  if (isPdfLoading || !pdfUrl) {
    return (
      <>
        <Spinner margin={15} />
      </>
    );
  }

  if (pdfUrl) {
    return (
      <>
        <Head>
          <title>Sovrenn Exam Certificate</title>
          <link
            rel="canonical"
            href="https://www.sovrenn.com/exam/view-certificate"
            key="canonical"
          />
        </Head>
        <div id={styles.MainContainer}>
          {pdfUrl && <PDFViewer pdfPath={pdfUrl} />}
        </div>
      </>
    );
  }
};

export default ReadPDF;
