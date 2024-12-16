import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // 스타일을 위한 함수 (선택된 링크 강조)
  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <Drawer
        variant="permanent" // 사이드바를 고정
        anchor="left" // 왼쪽에 고정
        PaperProps={{
          sx: { width: 240, backgroundColor: "#f4f6f8", color: "#333" }, // 사이드바 스타일
        }}
      >
        <div style={{ marginTop: "1rem" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/dashboard"
                selected={isActive("/dashboard")}
              >
                <ListItemText primary="대시보드" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/orders"
                selected={isActive("/orders")}
              >
                <ListItemText primary="주문 관리" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/menu"
                selected={isActive("/menu")}
              >
                <ListItemText primary="메뉴 관리" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/users"
                selected={isActive("/users")}
              >
                <ListItemText primary="사용자 관리" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/logs"
                selected={isActive("/logs")}
              >
                <ListItemText primary="로그 및 통계" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
