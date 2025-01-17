import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


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
            setPageWidth(newWidth || 600); 
        }
    
        window.addEventListener("resize", updatePageWidth);
        updatePageWidth();
        return () => window.removeEventListener("resize", updatePageWidth);
    }, []);

    return (
        <div className="pdf-div" style={{display: "flex", justifyContent: "center"}}>
            <Document file={pdfPath} onLoadSuccess={onDocumentLoadSuccess}
            // onLoadError={(error) => console.error("Error loading PDF:", error)} // 
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