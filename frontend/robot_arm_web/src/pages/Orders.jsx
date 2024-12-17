import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Modal,
  Box,
} from "@mui/material";

const Orders = () => {
  const [orderItems, setOrderItems] = useState([]); //주문 관리
  const [selectedOrder, setSelectOrder] = useState([]); //상세 주문 관리
  const [open, setOpen] = useState(false); //모달 상태 관리

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((response) => {
        setOrderItems(response.data);
      })
      .catch((error) => {
        console.error("에러 발생: ", error);
      });
  }, []);

  const fetchOrderDetails = (orderId) => {
    axios
      .get(`http://localhost:5000/api/orders/${orderId}`)
      .then((response) => {
        // alert(`${orderId}번 상세보기`);
        setSelectOrder(response.data); //상세 정보 저장
        setOpen(true); //모달 열기
      })
      .catch((error) => {
        console.error("상세 정보 에러 발생: ", error);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectOrder(null);
  };

  // 주문 상태에 따라 스타일을 반환하는 함수
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return { backgroundColor: "#FFCDD2", color: "#D32F2F" }; // 빨간색
      case "completed":
        return { backgroundColor: "#C8E6C9", color: "#388E3C" }; // 초록색
      default:
        return {};
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography
        fontWeight="bold"
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
      >
        주문 관리 페이지
      </Typography>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                주문 ID
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                사용자
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                주문 상태
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                주문 금액
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                주문 시간
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                주문 변경 시간
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItems.map((item) => (
              <TableRow
                key={item.주문ID}
                hover
                style={{ cursor: "pointer" }}
                onClick={() => fetchOrderDetails(item.주문ID)}
              >
                <TableCell>{item.주문ID}</TableCell>
                <TableCell>{item.사용자명}</TableCell>
                <TableCell style={getStatusStyle(item.주문상태)}>
                  {item.주문상태}
                </TableCell>
                <TableCell>{item.주문금액}</TableCell>
                <TableCell>{item.주문시간}</TableCell>
                <TableCell>{item.주문변경시간}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 모달창 */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor:
              selectedOrder?.상태 === "completed"
                ? "#C8E6C9" // 초록색
                : selectedOrder?.상태 === "pending"
                ? "#FFCDD2"
                : "#FFFFFF", // 빨간색 또는 기본색
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedOrder ? (
            <>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                주문 상세 정보
              </Typography>
              <Typography>주문 ID: {selectedOrder.주문ID}</Typography>
              <Typography>사용자명: {selectedOrder.사용자명}</Typography>
              <Typography>음료 이름: {selectedOrder.음료이름}</Typography>
              <Typography>음료 가격: {selectedOrder.음료가격}</Typography>
              <Typography>수량: {selectedOrder.수량}</Typography>
              <Typography>총 금액: {selectedOrder.금액}</Typography>
            </>
          ) : (
            <Typography>상세 정보를 불러오는 중...</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Orders;
