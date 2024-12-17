const express = require("express");
const router = express.Router();
const db = require("../personal_information");

const select_orders = `
    SELECT
	o.order_id AS 주문ID,
    u.username AS 사용자명,
    o.status AS 주문상태,
    o.total_price AS 주문금액,
    o.created_at AS 주문시간,
    o.updated_at AS 주문변경시간
FROM orders o
JOIN 
	users u ON o.user_id = u.user_id
;
`;

const select_detail_orders = `
    SELECT 
	oi.order_id AS 주문ID,
    u.username AS 사용자명,
    d.name AS 음료이름,
    d.price AS 음료가격,
    oi.quantity AS 수량,
    oi.price AS 금액,
    o.status AS 상태
FROM order_items oi
JOIN
	drinks d ON oi.drink_id = d.drink_id
JOIN
	orders o ON oi.order_id = o.order_id
JOIN
	users u ON o.user_id = u.user_id
WHERE oi.order_id = ?
;
`;

// 주문 목록 조회
router.get("/", (req, res) => {
  db.query(select_orders, function (error, results) {
    if (error) {
      console.error("에러 발생: ", error);
      res.status(500).send("에러 발생");
    } else {
      const formattedResults = results.map((order) => ({
        ...order,
        주문시간: new Date(order.주문시간)
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        주문변경시간: new Date(order.주문시간)
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
      }));
      res.json(formattedResults);
    }
  });
});

// 주문 목록 조회
router.get("/:id", (req, res) => {
  const orderId = req.params.id;
  db.query(select_detail_orders, [orderId], function (error, results) {
    if (error) {
      console.error("에러 발생: ", error);
      res.status(500).send("에러 발생");
    } else {
      res.json(results[0]);
    }
  });
});

module.exports = router;
