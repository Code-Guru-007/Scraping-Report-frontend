import React  from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


function PdfPage(props) {

    // const { filename } = useParams()
    const location = useLocation()
    const { fileLink } = location.state
    const navigate = useNavigate()

    const googleViewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fileLink)}`;

    return (
        <div style={{width: "100%", height: "100vh"}}>
            <iframe 
                src={googleViewerUrl} 
                width="100%" 
                height="100%" 
                style={{ border: "none" }}
                title="PDF Viewer"
            ></iframe>
            <div style={{position: 'fixed', left: '50px', top: '50px'}}> 
                <IconButton 
                    aria-label="Back"  
                    color="primary"
                    onClick={() => navigate(-1)}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
            </div>
        </div>
    );

}

export default PdfPage;