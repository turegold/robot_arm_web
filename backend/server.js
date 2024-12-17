const db = require("./personal_information");
const MenuRouter = require("./routes/drinks");
const UserRouter = require("./routes/users");
const OrderRouter = require("./routes/orders");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 5000;

//미들웨어
app.use(cors());
app.use(express.json());
app.use("/api/menus", MenuRouter);
app.use("/api/users", UserRouter);
app.use("/api/orders", OrderRouter);

db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
    return;
  }
  console.log("MySQL에 성공적으로 연결됨");
});

app.listen(PORT, () => {
  console.log(`Server on ${PORT}!`);
});
