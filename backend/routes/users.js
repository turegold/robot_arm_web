const express = require("express");
const router = express.Router();
const db = require("../personal_information");

// 음료 목록 조회
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", function (error, results) {
    if (error) {
      console.error("에러 발생: ", error);
      res.status(500).send("에러 발생");
    } else {
      const formattedResults = results.map((order) => ({
        ...order,
        created_at: new Date(order.created_at)
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
      }));
      res.json(formattedResults);
    }
  });
});

module.exports = router;
