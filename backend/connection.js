const mysql = require('mysql2');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Jaydeep@77',
  database: 'phonexapis',
  port: 3306,
});

con.connect((err) => {
  if (err) {
    console.error("Error in DB connection:", err);
  } else {
    console.log("DB connected successfully");
  }
});

module.exports = con;
