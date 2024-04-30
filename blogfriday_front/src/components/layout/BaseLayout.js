// // BaseLayout 컴포넌트

import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const activeStyle = {
  fontWeight: "bold",
};

const BaseLayout = () => {
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  const handleUserRemove = async () => {
    try {
      await axios.delete(
        `/user/delete/${localStorage.getItem("user_idemail")}`,
        config
      );
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleEditInfo = () => {
    navigate("/editinfo");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <nav className="navbar navbar-expand-lg bg-body-tertiary justify-content-center">
        <ul className="navbar-nav">
          {/* 사용자가 로그인한 경우에만 사용자 탐색 모음 표시 */}
          {localStorage.getItem("user_idemail") != null && (
            <>
              <li className="nav-item">
                <button
                  style={activeStyle}
                  className="nav-link btn"
                  onClick={handleLogout}
                >
                  {localStorage.getItem("user_name")}
                  <span style={{ fontSize: "10px" }}>로그아웃</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  style={activeStyle}
                  className="nav-link btn"
                  onClick={handleEditInfo}
                >
                  회원수정
                </button>
              </li>
              <li className="nav-item">
                <button
                  style={activeStyle}
                  className="nav-link btn"
                  onClick={handleUserRemove}
                >
                  회원탈퇴
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <hr />
      {/* 사용자가 로그인하지 않은 경우에만 Outlet 표시 */}
      {localStorage.getItem("user_idemail") == null && <Outlet />}
    </div>
  );
};

export default BaseLayout;
