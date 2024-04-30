import axios from "axios";
import { useEffect } from "react";

const UserRemove = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  const userRemove = async () => {
    await axios
      .delete(`/user/delete/${localStorage.getItem("user_idemail")}`, config)
      .then((response) => {
        console.log(response);
        localStorage.removeItem("Authorization");
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
    userRemove();
  }, []);
};

export default UserRemove;
