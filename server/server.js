const express = require('express'); 
const app = express(); 
const port = 5000;
const getData = require('./api/getData');
const postData = require('./api/postData');
const fileUpload = require("express-fileupload")
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
app.use(cors());
app.use(fileUpload({
    createParentPath: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.raw({limit:'1gb', type:'application/pdf'}))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/checkCredentials/:cred', (req, res) => {
    let tcred = req.params.cred;
    let cred = JSON.parse(tcred);
    getData.getUserData(cred).then(row => {
        console.log(row);
        if(row[0]!==undefined) {res.send(row[0])} else res.send(false);
    }).catch(err => {setImmediate(()=>{throw err})});
    //console.log(userData);
})

app.post('/postReport', (req, res) => {
    //console.log(req.files.file.data);
    //console.log(req.body.otherData);
    var responseID;
    var otherData = JSON.parse(req.body.otherData);
    var now = new Date();
    var timestamp = now.getFullYear().toString();
    timestamp += (now.getMonth < 9 ? '0' : '')+(now.getMonth().toString());
    timestamp += ((now.getDate<10)?'0':'')+(now.getDate().toString());
    timestamp += (now.getHours().toString())
    timestamp += (now.getMinutes().toString())+(now.getSeconds().toString())+(now.getMilliseconds().toString());
    console.log(timestamp)
    try{
        fs.writeFile(`./reportpdf/report${timestamp}.pdf`, req.files.file.data, 'binary', function(err){console.log(`error is ${err}`)});
        //console.log('Success in writing file')
    } catch(err){console.log(err)}
    getData.getLastReportIDAndAuthorID(otherData.author).then(row => {
        //console.log(row)
        responseID = row;
        var maxID = (responseID.maxID===null)? 99 : parseInt(responseID.maxID);
        //console.log(maxID)
        otherData.reportID = maxID+1;
        otherData.pdf = `report${timestamp}.pdf`;
        console.log(`otherData is ${JSON.stringify(otherData)}`)
        postData.postReport(otherData).then(res.send("done with posting"))
    }).catch(err => {setImmediate(()=>{throw err})})
})

app.get('/getReports/:com', (req, res) => {
    var committee = JSON.parse(req.params.com);
    console.log(committee)
    getData.getReportsByCommittee(committee).then(rows => {
        console.log(rows)
        if(rows.length==0){
            res.send([])
        }
        else(res.send(rows))
    }).catch(err => {setImmediate(()=>{throw err})});
})

app.get('/getReportPDF/:name', (req, res) => {
    var url = JSON.parse(req.params.name);
    var data = fs.readFileSync(`./reportpdf/${url}`, {encoding: 'base64'});
    //console.log("******************************************")
    //console.log(data)
    res.send(data);
})

app.listen(port, () => console.log(`Listening on port ${port}`)); 
