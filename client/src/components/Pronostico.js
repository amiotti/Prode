import { useState, useContext, useEffect } from "react";
import "../App.css";
import "../css/pronostico.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import AuthVerify from "../common/AuthVerify";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Context";

export default function Pronostico() {
  const userLogged = AuthVerify();
  const { id, teams, groupMatches, getImg, results, setResults } =
    useContext(UserContext);
  // const [results, setResults] = useState([
  //   { goalHome: "", goalAway: "", matchId: "", homeTeam: "", awayTeam: "" },
  // ]);
  const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const [disable, setDisable] = useState(true);
  const [inputsResults, setinputsResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogged) {
      navigate("/login");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const winner = (el) => {
        if (el.homeTeam === null || el.awayTeam === null) {
          return "Quali Pending";
        } else if (el.goalHome > el.goalAway) {
          return el.homeTeam;
        } else if (el.goalHome < el.goalAway) {
          return el.awayTeam;
        } else return "Draw";
      };
      const aux = [];

      results.map((el) =>
        aux.push({
          matchId: el.matchId,
          winner: winner(el),
          goalHome: el.goalHome,
          goalAway: el.goalAway,
          homeTeam: el.homeTeam,
          awayTeam: el.awayTeam,
          userId: /*props.*/ id || userLogged.id,
        })
      );
      for (let i = 0; i < 6; i++) {
        //console.log("results", results[i]);

        //aux= [{awayTeam: "Ecuador", goalAway: "2", goalHome: "1",homeTeam:"Qatar"]
        //console.log("AUX", aux[i]);

        const winner = async () => {
          if (aux[i].homeTeam === null || aux[i].awayTeam === null) {
            return "Quali Pending";
          } else if (aux[i].goalHome > aux[i].goalAway) {
            return aux[i].homeTeam;
          } else if (aux[i].goalHome < aux[i].goalAway) {
            return aux[i].awayTeam;
          } else return "Draw";
        };

        // console.log("TEST", {
        //   awayTeam: results[i],
        //   userId: /*props.*/ id || userLogged.id,
        // });

        // TEST {matchId:391882,winner:eCUADOR}

        // obj.push({
        // matchId: results[i].matchId,
        // winner: await winner(),
        // goalHome: results[i].goalHome,
        // goalAway: results[i].goalAway,
        // homeTeam: results[i].homeTeam,
        // awayTeam: results[i].awayTeam,
        // userId: /*props.*/ id || userLogged.id,
        // });

        //console.log(sendData);
        // if (sendData) {
        //   alert("Ya enviaste este pronostico");
        // }
        //console.log(sendData);

        //setDisable(true);
      }
      //console.log("OBJ", obj);
      console.log("AUX", aux);
      const sendData = await fetch("http://localhost:3000/pronosticos", {
        method: "POST",
        made: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aux),
      });
      console.log("SENDDATA", sendData);
      setResults([
        { goalHome: "", goalAway: "", matchId: "", homeTeam: "", awayTeam: "" },
      ]);

      console.log("Pronostico Enviado");
    } catch (error) {
      console.log(error);
    }
  }
  async function handleChange(e, i, id, home, away, group) {
    const { name, value } = e.target;

    /* -------------------------------------------------------------------------- */
    /*        Validando los inputs con el botón habilitado o deshabilitado        */
    /* -------------------------------------------------------------------------- */

    let homeValue = "";
    let awayValue = "";
    "goalHome" === name ? (homeValue = value) : (awayValue = value);

    if (inputsResults.length === 0) {
      inputsResults.push({
        group,
        results: [
          {
            matchId: id,
            homeTeam: home,
            homeValue,
            awayTeam: away,
            awayValue,
          },
        ],
      });
    } else {
      let isFoundGroup = false;

      for (const iterator of inputsResults) {
        if (iterator.group === group) {
          isFoundGroup = true;
        }
      }

      if (!isFoundGroup) {
        inputsResults.push({
          group,
          results: [
            {
              matchId: id,
              homeTeam: home,
              homeValue,
              awayTeam: away,
              awayValue,
            },
          ],
        });
      } else {
        let isAddedResult = false;
        for (const iterator of inputsResults) {
          if (iterator.group === group) {
            for (let index = 0; index < iterator.results.length; index++) {
              if (id === iterator.results[index].matchId) {
                isAddedResult = true;
              }
            }

            if (isAddedResult) {
              for (let index = 0; index < iterator.results.length; index++) {
                if (id === iterator.results[index].matchId) {
                  if (name === "goalHome") {
                    iterator.results[index].homeValue = value;
                    break;
                  } else {
                    iterator.results[index].awayValue = value;
                    break;
                  }
                }
              }
            } else {
              iterator.results.push({
                matchId: id,
                homeTeam: home,
                homeValue,
                awayTeam: away,
                awayValue,
              });
              break;
            }
          }
        }
      }
    }

    let isNumber = true;
    for (const iterator of inputsResults) {
      if (iterator.group === group) {
        if (iterator.results.length === 6) {
          for (const iterator2 of iterator.results) {
            console.log(`homeValue: ${iterator2.homeValue}`);
            console.log(`awayValue: ${parseInt(iterator2.awayValue)}`);
            if (
              !parseInt(iterator2.homeValue) &&
              parseInt(iterator2.homeValue) !== 0
            ) {
              isNumber = false;
            } else if (
              !parseInt(iterator2.awayValue) &&
              parseInt(iterator2.awayValue) !== 0
            ) {
              isNumber = false;
            }
          }
        } else {
          isNumber = false;
        }
      }
    }

    if (isNumber) {
      const btnEnviar = document.querySelector(`#btnEnviar${group}`);
      btnEnviar.disabled = false;
    }

    const list = [...results, {}];
    list[i][name] = parseInt(value);

    list[i]["matchId"] = id;
    list[i]["homeTeam"] = home;
    list[i]["awayTeam"] = away;
    console.log("SLICE", list.slice(0, 6));

    setResults(list.slice(0, 6));
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
            <div className="paisesIzquierda">
              <img
                className="home-img mr-3"
                src={
                  /*props.*/ getImg
                    .filter((img) => img.id === match.homeTeam.id)
                    .map((url) => url.url)
                }
                alt=""
              />
              <h4 className="mr-3">{match.homeTeam.name}</h4>
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
                    match.awayTeam.name,
                    group
                  )
                }
              />
            </div>

            <h4 className="vs-text">vs</h4>

            <div className="paisesDerecha">
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
                    match.awayTeam.name,
                    group
                  )
                }
              />

              <h4 className="ml-3">{match.awayTeam.name}</h4>
              <img
                className="home-img ml-3"
                src={
                  /*props.*/ getImg
                    .filter((img) => img.id === match.awayTeam.id)
                    .map((url) => url.url)
                }
                alt=""
              />
            </div>
          </li>
        </>
      ))
    );
  }

  return (
    groupMatches && (
      <header className="masthead">
        <Navigation />
        <Carousel interval={null}>
          {groups.map((group) => (
            <Carousel.Item>
              <div className="containerCarrousel carrusel">
                <h2>
                  {"GRUPO"} {group}
                </h2>

                <ul>
                  {carrouselElement(group)}
                  <div className="cajaBoton">
                    <button
                      disabled={false}
                      onClick={handleSubmit}
                      className="btn btn-outline-light mt-5 p-30 w-25 btnEnviar"
                      id={`btnEnviar${group}`}
                    >
                      Enviar
                    </button>
                  </div>
                </ul>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </header>
    )
  );
}
