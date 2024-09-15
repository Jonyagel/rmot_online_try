// 'use client'
// import React, { useState, useEffect } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
// import './NewspaperViewer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// interface NewspaperViewerProps {
//     pdfUrl: string;
//     onClose: () => void;
// }

// const NewspaperViewer: React.FC<NewspaperViewerProps> = ({ pdfUrl, onClose }) => {
//     const [numPages, setNumPages] = useState<number>(0);
//     const [pageNumber, setPageNumber] = useState<number>(1);

//     function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//         setNumPages(numPages);
//     }

//     useEffect(() => {
//         if (document) {
//             setNumPages(document.numPages);
//         }
//     }, [document]);

//     function changePage(offset: number) {
//         setPageNumber(prevPageNumber => Math.min(Math.max(prevPageNumber + offset, 1), numPages));
//     }

//     return (
//         <div className="newspaper-viewer-overlay">
//             <div className="newspaper-viewer-container">
//                 <button className="newspaper-viewer-close" onClick={onClose}>×</button>
//                 <Document
//                     file={pdfUrl}
//                     onLoadSuccess={onDocumentLoadSuccess}
//                     loading={<p>טוען PDF...</p>}
//                     error={<p>שגיאה בטעינת ה-PDF</p>}
//                 >
//                     <Page pageNumber={pageNumber} width={550} />
//                 </Document>
//                 <div className="newspaper-viewer-controls">
//                     <button onClick={() => changePage(-1)} disabled={pageNumber <= 1}>
//                         הקודם
//                     </button>
//                     <p>
//                         עמוד {pageNumber} מתוך {numPages}
//                     </p>
//                     <button onClick={() => changePage(1)} disabled={pageNumber >= numPages}>
//                         הבא
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NewspaperViewer;
//                 {loading && <p>טוען PDF...</p>}
//                 {error && <p>שגיאה בטעינת ה-PDF: {error.message}</p>}
//                 {pdf && (
//                     <>
//                         <Page pageNumber={pageNumber} pdf={pdf} width={550} />
//                         <div className="newspaper-viewer-controls">
//                             <button onClick={() => changePage(-1)} disabled={pageNumber <= 1}>
//                                 הקודם
//                             </button>
//                             <p>
//                                 עמוד {pageNumber} מתוך {numPages}
//                             </p>
//                             <button onClick={() => changePage(1)} disabled={pageNumber >= numPages}>
//                                 הבא
//                             </button>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default NewspaperViewer;