import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../static/Login.css";

function LoginPage(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    function validateForm(){
        return username.length>0 && password.length>0;
    }

    function handleSubmit(event){
        event.preventDefault();
        var request = new XMLHttpRequest();
        var credentials = {'username': username, 'password': password};
        request.onreadystatechange = function(){
            if(request.readyState===4 && request.status===200){
                /*console.log(this.responseText);*/
                if(this.responseText==='false' || this.responseText===false){
                    localStorage.setItem('authenticated', this.responseText)
                } else{
                    localStorage.setItem('authenticated', true);
                    let tempVar = JSON.parse(this.responseText);
                    /*console.log("=>",typeof(JSON.parse(this.responseText)));
                    console.log("=>",this.responseText.valueOf('username'));*/
                    //console.log(tempVar);
                    localStorage.setItem('username', tempVar['username']);
                    localStorage.setItem('committee', tempVar['committee']);
                    localStorage.setItem('userID', tempVar['userID']);
                    props.history.push("/onlyAuthorizedAllowedHere/home")
                }
            }   
        }
        request.open('GET', 'http://localhost:5000/checkCredentials/'+JSON.stringify(credentials), true);
        request.send();
        /*console.log(request.responseText)*/
    }

    return(
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username" className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control autofocus type="text" value={username} onChange={(u)=>setUsername(u.target.value)}/>
                </Form.Group>
                <Form.Group size="lg" controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control autofocus type="password" value={password} onChange={(p)=>setPassword(p.target.value)}/>
                </Form.Group>
                <Button block size='lg' type='submit' disabled={!validateForm()}>Login</Button>
            </Form>
        </div>
    )
}

export default LoginPage;