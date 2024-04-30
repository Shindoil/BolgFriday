import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuth, RouteComponent }) => {
  const isLogin = localStorage.getItem("isLogin");
  console.log(isLogin);

  //인증이 반드시 필요한 페이지인데 인증이 된 페이지를 요청한 경우
  if (isAuth && isLogin) {
    return <RouteComponent />;
  }

  //인증이 반드시 필요한 페이지인데 인증이 안된 페이지를 요청한 경우
  else if (isAuth && !isLogin) {
    alert("로그인후 접속하세요.");
    return <Navigate to="/shophome" />;
  }

  //인증이 필요하지 않은 페이지인 경우
  else {
    return <RouteComponent />;
  }
};

export default PrivateRoute;
