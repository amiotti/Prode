import React, { Navigate, useContext } from "react";
import moment from "moment";
import Navigation from "./Navigation";
import AuthVerify from "../common/AuthVerify";
import { UserContext } from "./Context";

export default function Fechas(props) {
  const userLogged = AuthVerify();
  const { today, getImg } = useContext(UserContext);

  return userLogged ? (
    today && (
      <header className="masthead">
        <Navigation />
        <div className="container px-4 px-lg-5 h-100">
          <h2 className="mt-0">
            Today´s Match:
            {<span>{moment(today[0].utcDate).format(" MMM d, yyyy")}</span>}
          </h2>

          <ul>
            {getImg &&
              today.map((match) => (
                <li key={match.id} type="none">
                  <span>{match.group}</span>
                  <img
                    src={
                      getImg.filter((flag) => flag.id === match.homeTeam.id)[0]
                        .url
                    }
                  />
                  {match.homeTeam.name}
                  <span>vs</span>
                  {match.awayTeam.name}
                  <img
                    src={
                      getImg.filter((flag) => flag.id === match.awayTeam.id)[0]
                        .url
                    }
                  />
                </li>
              ))}
          </ul>
        </div>
      </header>
    )
  ) : (
    <Navigate to="/login" />
  );
}
