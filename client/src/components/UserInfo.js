import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthVerify from "../common/AuthVerify";
import { UserContext } from "./Context";

export default function UserInfo() {
  const userLogged = AuthVerify();
  const navigate = useNavigate();

  const { users } = useContext(UserContext);

  useEffect(() => {
    if (!userLogged) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <li>{userLogged.name}</li>
    </div>
  );
}
