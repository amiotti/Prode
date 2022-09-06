import { useState, useContext } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import AuthVerify from "../common/AuthVerify";
import Navigation from "./Navigation";
import { Navigate } from "react-router-dom";
import { UserContext } from "./Context";

export default function Pronostico() {
  const userLogged = AuthVerify();
  const { id, teams, groupMatches, getImg } = useContext(UserContext);

  const [results, setResults] = useState([
    { goalHome: "", goalAway: "", matchId: "", homeTeam: "", awayTeam: "" },
  ]);
  const [test, setTest] = useState([
    { goalHome: "", goalAway: "", matchId: "", homeTeam: "", awayTeam: "" },
  ]);

  const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const aux = [];
      for (let i = 0; i < 6; i++) {
        aux.push(results[i]);

        if (aux[i].homeTeam === null) {
          aux[i].homeTeam = "Qualy Pending";
        }
        if (aux[i].awayTeam === null) {
          aux[i].awayTeam = "Qualy Pending";
        }

        const winner = async () => {
          if (aux[i].homeTeam === null || aux[i].awayTeam === null) {
            return "Quali Pending";
          } else if (aux[i].goalHome > aux[i].goalAway) {
            return aux[i].homeTeam;
          } else if (aux[i].goalHome < aux[i].goalAway) {
            return aux[i].awayTeam;
          } else return "Draw";
        };

        fetch("http://localhost:3000/pronosticos", {
          method: "POST",
          made: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            matchId: aux[i].matchId,
            winner: await winner(),
            goalHome: aux[i].goalHome,
            goalAway: aux[i].goalAway,
            homeTeam: aux[i],
            awayTeam: aux[i],
            userId: /*props.*/ id || userLogged.id,
          }),
        });

        //setDisable(true);
      }
      setResults([
        { goalHome: "", goalAway: "", matchId: "", homeTeam: "", awayTeam: "" },
      ]);
      console.log(aux);
      console.log("Pronostico Enviado");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChange(e, i, id, home, away) {
    const { name, value } = e.target;
    console.log(e.target.value);

    const list = [...results, {}];

    const list2 = (prev) => [...results];

    list[i][name] = value;

    list[i]["matchId"] = id;
    list[i]["homeTeam"] = home;
    list[i]["awayTeam"] = away;
    console.log("LIST", list);
    setTest(list2);
    console.log("TEST", test);
    setResults(list);
  }

  function carrouselElement(group) {
    const groupX = groupMatches.filter(
      (matches) => matches.group === "GROUP_" + `${group}`
    );

    return (
      teams &&
      getImg &&
      groupX.map((match, i) => (
        <>
          <li key={match.id} className="matches">
            <img
              className="home-img"
              src={
                /*props.*/ getImg
                  .filter((img) => img.id === match.homeTeam.id)
                  .map((url) => url.url)
              }
            />
            <h4>{match.homeTeam.name}</h4>
            <input
              className="input-pronosticos"
              name="goalHome"
              value={results.goalHome}
              onChange={(e) =>
                handleChange(
                  e,
                  i,
                  match.id,
                  match.homeTeam.name,
                  match.awayTeam.name
                )
              }
            />

            <h4 className="vs-text">vs</h4>
            <h4>{match.awayTeam.name}</h4>
            <img
              className="home-img"
              src={
                /*props.*/ getImg
                  .filter((img) => img.id === match.awayTeam.id)
                  .map((url) => url.url)
              }
            />
            <input
              className="input-pronosticos"
              name="goalAway"
              value={results.goalAway}
              onChange={(e) =>
                handleChange(
                  e,
                  i,
                  match.id,
                  match.homeTeam.name,
                  match.awayTeam.name
                )
              }
            />
          </li>
        </>
      ))
    );
  }

  return userLogged && groupMatches ? (
    <header className="masthead">
      <Navigation />
      <Carousel interval={null}>
        {groups.map((group) => (
          <Carousel.Item>
            <div className="containerCarrousel">
              <h2>
                {"GRUPO"} {group}
              </h2>
              <ul>{carrouselElement(group)}</ul>
              <button onClick={handleSubmit}>Enviar</button>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </header>
  ) : (
    <Navigate to="/login" />
  );
}
