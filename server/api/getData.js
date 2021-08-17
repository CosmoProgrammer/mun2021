const mysql = require('mysql');

function getUserData(cred){
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'IPCWebsite'
    })
    
    connection.connect((err) => {
        if (err) console.error(err);
        console.log('Connected!');
    });

    var sql = `SELECT * FROM userData WHERE username = '${cred.username}' AND password = '${cred.password}'`;

    return new Promise((resolve, reject) => {
        connection.query(sql, function(err, result){
            if (err) return reject(err);
            //console.log(result);;
            var rows = JSON.parse(JSON.stringify(result))
            resolve(rows);
        })    
    })
}

function getLastReportIDAndAuthorID(author){
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'IPCWebsite'
    })
    connection.connect((err) => {
        if (err) console.error(err);
        console.log('Connected!');
    });

    var sql = "SELECT MAX(reportID) as maxID FROM reports";

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) return reject(err);
            var rows = JSON.parse(JSON.stringify(result));
            resolve(rows[0]);
        })
    })
}

function getReportsByCommittee(committee){
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'IPCWebsite'
    })
    connection.connect((err) => {
        if (err) console.error(err);
        console.log('Connected!');
    });

    var sql =`SELECT * FROM reports WHERE committee = '${committee}'`;

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) return reject(err);
            var rows = JSON.parse(JSON.stringify(results));
            resolve(rows)
        })
    })
}

module.exports = {getUserData, getLastReportIDAndAuthorID, getReportsByCommittee};