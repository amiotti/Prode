import React, { useEffect, useContext } from "react";
import GroupStats from "./GroupStats";
import Navigation from "./Navigation";
import "../App.css";
import AuthVerify from "../common/AuthVerify";
import { UserContext } from "./Context";
import { useNavigate } from "react-router-dom";
import PlayerStats from "./PlayerStats";

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
          <div className="container px-4 px-lg-5 h-100">
            <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
              <div className="col-lg-8 align-self-end">
                <h1>TABLA DE POSICIONES</h1>
                <div>
                  {groupData.map((group) => (
                    <>
                      <h2>{"GRUPO " + group.group.charAt(6)}</h2>
                      <GroupStats info={group} />
                    </>
                  ))}
                </div>
                <h1>GOLEADORES</h1>
                <div>
                  <PlayerStats />
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  );
}
