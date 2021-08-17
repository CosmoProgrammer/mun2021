import React, { useEffect, useState, ReactDOM } from 'react';
import axios from 'axios';

function PDFDisplayer(props){

    const [url, setURL] = useState(props.match.params.url);
    const [file, setFile] = useState("");

    useEffect(()=>{
        axios.get(`http://localhost:5000/getReportPDF/${JSON.stringify(url)}`).then(response=>{
            console.log(typeof(response.data))
            setFile(response.data)
            //console.log("******************************************")
            console.log(file)
        })
    }, [])

    return(<>
        <embed src={`data:application/pdf;base64,${file}`}  type="application/pdf" width="100%" height="1000"></embed>
    </>)
}

export default PDFDisplayer;