const mysql = require('mysql');

const con = mysql.createConnection({
  host: "sql8.freesqldatabase.com",
  user: "sql8615476",
  password: "xqpJ1pSM6x",
  database: "sql8615476"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
});

module.exports = con;

