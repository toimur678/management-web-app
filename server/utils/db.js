import mysql from "mysql";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1234$$", // password here
  database: "app", // database name here
});

con.connect(function (err) {
  if (err) {
    console.log("connection error");
  } else {
    console.log("Connected");
  }
});

export default con;
