import { useState, useContext } from "react"
import "../App.css"
import "../css/pronostico.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Carousel from "react-bootstrap/Carousel"
import AuthVerify from "../common/AuthVerify"
import Navigation from "./Navigation"
import { Navigate } from "react-router-dom"
import { UserContext } from "./Context"

export default function Pronostico() {
  const userLogged = AuthVerify()
  const { id, teams, groupMatches, getImg } = useContext(UserContext)
  const [results, setResults] = useState([
    { goalHome: "", goalAway: "", matchId: "", homeTeam: "", awayTeam: "" },
  ])

  const groups = ["A", "B", "C", "D", "E", "F", "G", "H"]
  const [disable, setDisable] = useState(true)
  const [inputsResults, setinputsResults] = useState([])

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const aux = []
      for (let i = 0; i < 6; i++) {
        aux.push(results[i])

        if (aux[i].homeTeam === null) {
          aux[i].homeTeam = "Qualy Pending"
        }
        if (aux[i].awayTeam === null) {
          aux[i].awayTeam = "Qualy Pending"
        }

        const winner = async () => {
          if (aux[i].homeTeam === null || aux[i].awayTeam === null) {
            return "Quali Pending"
          } else if (aux[i].goalHome > aux[i].goalAway) {
            return aux[i].homeTeam
          } else if (aux[i].goalHome < aux[i].goalAway) {
            return aux[i].awayTeam
          } else return "Draw"
        }

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
        })

        //setDisable(true);
      }
      setResults([
        { goalHome: "", goalAway: "", matchId: "", homeTeam: "", awayTeam: "" },
      ])
      console.log(aux)
      console.log("Pronostico Enviado")
    } catch (error) {
      console.log(error)
    }
  }
  async function handleChange(e, i, id, home, away, group) {
    const { name, value } = e.target
    console.log(e.target.value)

    /* -------------------------------------------------------------------------- */
    /*        Validando los inputs con el botón habilitado o deshabilitado        */
    /* -------------------------------------------------------------------------- */

    let homeValue = ""
    let awayValue = ""
    "goalHome" === name ? (homeValue = value) : (awayValue = value)

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
      })
    } else {
      let isFoundGroup = false

      for (const iterator of inputsResults) {
        if (iterator.group === group) {
          isFoundGroup = true
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
        })
      } else {
        let isAddedResult = false
        for (const iterator of inputsResults) {
          if (iterator.group === group) {
            for (let index = 0; index < iterator.results.length; index++) {
              if (id === iterator.results[index].matchId) {
                isAddedResult = true
              }
            }

            if (isAddedResult) {
              for (let index = 0; index < iterator.results.length; index++) {
                if (id === iterator.results[index].matchId) {
                  if (name === "goalHome") {
                    iterator.results[index].homeValue = value
                    break
                  } else {
                    iterator.results[index].awayValue = value
                    break
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
              })
              break
            }
          }
        }
      }
    }

    let isNumber = true
    for (const iterator of inputsResults) {
      if (iterator.group === group) {
        if (iterator.results.length === 6) {
          for (const iterator2 of iterator.results) {
            console.log(`homeValue: ${iterator2.homeValue}`)
            console.log(`awayValue: ${parseInt(iterator2.awayValue)}`)
            if (
              !parseInt(iterator2.homeValue) &&
              parseInt(iterator2.homeValue) !== 0
            ) {
              isNumber = false
            } else if (
              !parseInt(iterator2.awayValue) &&
              parseInt(iterator2.awayValue) !== 0
            ) {
              isNumber = false
            }
          }
        } else {
          isNumber = false
        }
      }
    }

    if (isNumber) {
      const btnEnviar = document.querySelector(`#btnEnviar${group}`)
      btnEnviar.disabled = false
    }

    const list = [...results, {}]

    list[i]["matchId"] = id
    list[i]["homeTeam"] = home
    list[i]["awayTeam"] = away

    setResults(list)
  }

  function carrouselElement(group) {
    const groupX = groupMatches.filter(
      matches => matches.group === "GROUP_" + `${group}`
    )

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
                    .filter(img => img.id === match.homeTeam.id)
                    .map(url => url.url)
                }
                alt=""
              />
              <h4 className="mr-3">{match.homeTeam.name}</h4>
              <input
                className="input-pronosticos"
                name="goalHome"
                value={results.goalHome}
                onChange={e =>
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
                onChange={e =>
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
                    .filter(img => img.id === match.awayTeam.id)
                    .map(url => url.url)
                }
                alt=""
              />
            </div>
          </li>
        </>
      ))
    )
  }

  return userLogged && groupMatches ? (
    <header className="masthead">
      <Navigation />
      <Carousel interval={null}>
        {groups.map(group => (
          <Carousel.Item>
            <div className="containerCarrousel carrusel">
              <h2>
                {"GRUPO"} {group}
              </h2>

              <ul>
                {carrouselElement(group)}
                <div className="cajaBoton">
                  <button
                    disabled={disable}
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
  ) : (
    <Navigate to="/login" />
  )
}
