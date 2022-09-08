import React, { useEffect, useContext } from "react";
import GroupStats from "./GroupStats";
import Navigation from "./Navigation";
import "../App.css";
import AuthVerify from "../common/AuthVerify";
import { UserContext } from "./Context";
import { useNavigate } from "react-router-dom";

export default function Estadisticas() {
  const userLogged = AuthVerify();
  const { groupData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogged) {
      navigate("/login");
    }
  }, []);

  return (
    groupData && (
      <>
        <Navigation />
        <header className="masthead">
          <h1>TABLA DE POSICIONES</h1>
          <div className="container px-4 px-lg-5 h-100">
            <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
              <div className="col-lg-8 align-self-end">
                <div>
                  {groupData.map((group) => (
                    <>
                      <h2>{group.group}</h2>
                      <GroupStats info={group} />
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  );
}
