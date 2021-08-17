import React,{ useState/*, useRef }*/} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../static/Login.css";

function AddReportFile(props){
    try{
        var tdata = props.location.state;
        var data = JSON.parse(tdata);
        console.log(data);   
    } catch(err){console.log(err)};

    const [fileState, setFileState] = useState();

    function createPost(sfile){
      var content = new FormData();
      content.append('file', sfile);
      content.append('otherData', JSON.stringify(data));
      axios.post('http://localhost:5000/postReport', content, {headers: {'encoding':'binary'}}).then((response) =>{
        console.log(response.data)
        toast.success('Submitted')
        props.history.push("/onlyAuthorizedAllowedHere/home")
      })
    }

    function onFileChange(event){
        try{
            const file = event.target.files[0];
            console.log(`Name is ${file.name}, type is ${file.type}, size is ${file.size}`);
            console.log(`Type is ${typeof(file)}`)
            setFileState(file);
            createPost(file);
        } catch(err){console.log(err);}
    }

    function maxSelectFile(event) {
        try{
        if (event && event.target.files) {
          let files = event.target.files;
          if (files.length > 2) {
            const errorMsg = "More than 2 files are not allowed";
            event.target.value = null;
            console.log(errorMsg);
            return false;
          }
          return true;
        }} catch(err){console.log(err)}
      };

      function validateType(f){
        if (f && f.size) {
          const fType = f.type;
    
          if (fType!=='application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return `Image should be a Word Doc`;
          }
        }
      };

      function handleSubmit(event){
          console.log('Submitted')
          event.preventDefault();
          //createPost();
      }
    

    return(<>
        <div className="Login">
            <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="heading" className="mb-3">
                <Form.Label>Word</Form.Label>
                <Form.Control autofocus type='file' onChange={onFileChange} validate={[maxSelectFile, validateType]}></Form.Control>
            </Form.Group>
            <Button block size='lg' type='submit' disabled={![maxSelectFile, validateType]}>Continue</Button>
            </Form>
        </div>
    </>)
}

export default AddReportFile;