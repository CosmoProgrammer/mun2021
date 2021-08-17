const mysql = require('mysql');

function postReport(det){
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

    var sql = `INSERT INTO reports (reportID, heading, subheading, authorID, pdf, committee, author) VALUES (${det["reportID"]}, '${det["heading"]}', '${det["subheading"]}', ${det["authorID"]}, '${det["pdf"]}', '${det["committee"]}', '${det["author"]}');`
    console.log(sql);

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(`Posted report ${det["reportID"]}`);
        })
    })
}

module.exports = {postReport}