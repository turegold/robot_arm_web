const db = require("./personal_information");

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
    return;
  }
  console.log("MySQL에 성공적으로 연결됨");
});

db.query("SELECT * FROM drinks", function (error, results, fields) {
  if (error) throw error;
  console.log("drinks: ", results);
});
