// "use client";
// import Head from "next/head";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import PdfViewer from "../../../components/PdfViewer";
// import Spinner from "../../../components/Common/Spinner.jsx";
// import { useSelector } from "react-redux";
// import styles from "../../../styles/NewsPdfList.module.css";

// const ReadPDF = () => {
//   const searchParams = useSearchParams();
//   const path = searchParams.get("path");
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [isPdfLoading, setIsPdfLoading] = useState(true);
//   const { isAuth, userDetails } = useSelector((store) => store.auth);
//   useEffect(() => {
//     if (path) {
      
//       setPdfUrl(`https://api.sovrenn.com/news/pdf/read?path=${path}`);
//       setIsPdfLoading(false);
//     }
//   }, [path, isAuth]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       document.title = "Sovrenn Times PDF View";
//       const link = document.querySelector("link[rel='canonical']");
//       if (link) {
//         link.href = `https://www.sovrenn.com/times/read-pdf`;
//       }
//     }
//   }, []);

//   if (isPdfLoading || !pdfUrl) {
//     return (
//       <>
//         <Spinner margin={15} />
//       </>
//     );
//   }

//   if (pdfUrl) {
//     return (
//       <>
//         <Head>
//           <title>Sovrenn Times PDF View</title>
//           <link
//             rel="canonical"
//             href="https://www.sovrenn.com/times/read-pdf"
//             key="canonical"
//           />
//         </Head>
//         <div id={styles.MainContainer}>
//           {pdfUrl && <PdfViewer pdfPath={pdfUrl} />}
//         </div>
//       </>
//     );
//   }
// };

// export default ReadPDF;
"use client";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PdfViewer from "../../../components/PdfViewer";
import Spinner from "../../../components/Common/Spinner.jsx";
import { useSelector } from "react-redux";
import styles from "../../../styles/NewsPdfList.module.css";

const ReadPDF = () => {
  const searchParams = useSearchParams();
  const path = searchParams.get("path");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const { isAuth, userDetails } = useSelector((store) => store.auth);
  useEffect(() => {
    if (path) {
      // Construct the full PDF URL using the 'path'
      setPdfUrl(`https://api.sovrenn.com/news/pdf/read?path=${path}`);
      setIsPdfLoading(false);
    }
  }, [path, isAuth]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Sovrenn Times PDF View";
      const link = document.querySelector("link[rel='canonical']");
      if (link) {
        link.href = `https://www.sovrenn.com/times/read-pdf`;
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
          <title>Sovrenn Times PDF View</title>
          <link
            rel="canonical"
            href="https://www.sovrenn.com/times/read-pdf"
            key="canonical"
          />
        </Head>
        <div id={styles.MainContainer}>
          {pdfUrl && <PdfViewer pdfPath={pdfUrl} />}
        </div>
      </>
    );
  }
};

export default ReadPDF;