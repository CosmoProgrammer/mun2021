import React, { useEffect, useState, ReactDOM } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';


function ReportsDisplay(props){
    var committee = props.committee;
    const [reports, setReports] = useState([])

    //console.log(committee)
    useEffect(()=>{
        axios.get(`http://localhost:5000/getReports/${JSON.stringify(committee)}`).then((response) => {
            try{
                setReports(response.data)
            } catch(e){setReports(null)}
            if (reports == null) return null;
        })
    }, [committee]);
    var reportComponent = reports.map(function(report){
        return(
            <>
                <Card bg={"light"} text={"black"} border="primary">
                    <Card.Header>{report.author}</Card.Header>
                    <Card.Body>
                        <Card.Title>{report.heading}</Card.Title>
                        <Card.Text>{report.subheading}</Card.Text>
                        <Link className="btn btn-outline-primary" to={{pathname:`/AuthorizedAllowedHere/pdfDisplayer/${report.pdf}`, param1:report.pdf}}>View Report</Link>
                    </Card.Body>
                </Card>
                <br />
            </>
        )
    })

    if (reports.length > 0){
        return (<>
            {reportComponent}
        </>)
    } else if (reports.length == 0){
        return(<>No Reports Available</>)
    }

    ReactDOM.render(document.getElementById('root'))
}

export default ReportsDisplay;