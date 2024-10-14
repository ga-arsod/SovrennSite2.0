import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js`;


function PDFViewer({ pdfPath }) {
    const [numPages, setNumPages] = useState();
    const [pageWidth, setPageWidth] = useState(0);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    };

    useEffect(() => {
        function updatePageWidth() {
            const newWidth = window.innerWidth < 720
                ? window.innerWidth
                : window.innerWidth < 1281
                ? window.innerWidth / 1.6
                : window.innerWidth / 2.2;
            setPageWidth(newWidth || 600); // fallback to 600px width if undefined
        }
    
        window.addEventListener("resize", updatePageWidth);
        updatePageWidth(); // Initial width calculation
        return () => window.removeEventListener("resize", updatePageWidth);
    }, []);

    return (
        <div className="pdf-div" style={{display: "flex", justifyContent: "center"}}>
            <Document file={pdfPath} onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => console.error("Error loading PDF:", error)} // Catch PDF loading errors
            >
                {Array.apply(null, Array(numPages))
                    .map((x, i) => i + 1)
                    .map((page,i) => {
                        return (
                            <Page
                            key={i}
                                pageNumber={page}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                width={pageWidth}
                            />
                        );
                    })}
            </Document>

        </div>
    );
}

export default PDFViewer;