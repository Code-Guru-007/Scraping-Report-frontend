import React, { useEffect, useState }  from "react";
import { useParams } from "react-router-dom";


function PdfPage() {

    const { filename } = useParams()

    let buf = filename.split('_')
    let year = buf[buf.length -1]

    const pdfUrl = `http://188.245.216.211/public/download/${year}/${filename}.pdf`;
    const googleViewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;

    return (
        <div style={{width: "100%", height: "100vh"}}>
            <iframe 
                src={googleViewerUrl} 
                width="100%" 
                height="100%" 
                style={{ border: "none" }}
                title="PDF Viewer"
            ></iframe>
        </div>
    );

}

export default PdfPage;