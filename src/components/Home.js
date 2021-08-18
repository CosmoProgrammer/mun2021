import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import ReportsDisplay from './ReportsDisplay';

function HomePage(){
    const [viewCommittee, changeViewCommittee] = useState("ls");
    function verifyCommittee(){
        //console.log(`The committee in local storage is ${localStorage.getItem('committee')} and its type is ${typeof(localStorage.getItem('committee'))}`);
        //console.log(`The committee in view is ${viewCommittee} and its type is ${typeof(viewCommittee)}`);
        if(localStorage.getItem('committee')===viewCommittee){
            return false;
        } else return true;
    }
    return(<>
        <br /><br /><br /><center>
        <ButtonGroup classname="me-2">
            <Button variant="outline-primary" onClick={()=>{changeViewCommittee('ls')}}>Lok Sabha</Button>
            <Button variant="outline-primary" onClick={()=>{changeViewCommittee('unsc')}}>UNSC</Button>
            <Button variant="outline-primary" onClick={()=>{changeViewCommittee('disec')}}>DISEC</Button>
        </ButtonGroup></center>
        <br />
        <div style={{ display: "flex" }}>
            <Link className="btn btn-outline-warning" style={{ marginLeft: "auto" }} to="/onlyAuthorizedAllowedHere/addreport" onClick={(event)=>{
                var r = verifyCommittee();
                if (r){ event.preventDefault(); }
            }}>+  Add a Report</Link>
        </div>
        <br />
        <ReportsDisplay committee={viewCommittee}/>
    </>)
}

export default HomePage;