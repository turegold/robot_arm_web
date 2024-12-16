const express = require("express");
const router = express.Router();
const db = require("../personal_information");

// 음료 목록 조회
router.get("/", (req, res) => {
  db.query("SELECT * FROM drinks", function (error, results) {
    if (error) {
      console.error("에러 발생: ", error);
      res.status(500).send("에러 발생");
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
