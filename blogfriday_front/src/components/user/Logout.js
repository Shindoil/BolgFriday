import axios from "axios";
import React, { useEffect } from "react";

const Logout = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      user_idemail: localStorage.getItem("user_idemail"),
    },
  };

  const handleCommit = async () => {
    await axios
      .get(`/user/logout`, config)
      .then((response) => {
        localStorage.removeItem("user_idemail");
        localStorage.removeItem("user_name");
        localStorage.removeItem("isLogin");
        localStorage.clear();
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleCommit();
  }, []);
};

export default Logout;
