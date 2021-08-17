import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../static/Login.css";

function AddReport(props){
    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    var author = localStorage.getItem('username');
    var authorID = localStorage.getItem('userID');
    var committee = localStorage.getItem('committee')

    function validateForm(){
        return heading.length>0 && subHeading.length>0;
    }

    function handleSubmit(event){
        var textData = {
            "heading":heading,
            "subheading":subHeading,
            "author":author,
            "authorID":authorID,
            "committee":committee
        };
        var sTextData = JSON.stringify(textData);
        props.history.push({pathname:`/onlyAuthorizedAllowedHere/addreportfile/`,state:sTextData});
    }

    return(<>
        <div className="Login">
            <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="heading" className="mb-3">
                    <Form.Label>Heading</Form.Label>
                    <Form.Control autofocus type="text" value={heading} onChange={(u)=>setHeading(u.target.value)}/>
                </Form.Group>
                <Form.Group size="lg" controlId="subHeading" className="mb-3">
                    <Form.Label>Sub-Heading</Form.Label>
                    <Form.Control autofocus type="text" value={subHeading} onChange={(p)=>setSubHeading(p.target.value)}/>
                </Form.Group>
                <Button block size='lg' type='submit' disabled={!validateForm()}>Continue</Button>
            </Form>
        </div>
    </>)
}

export default AddReport;