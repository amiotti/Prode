import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Masthead from "./components/Masthead";
import Resultados from "./components/Resultados";
import Registration from "./components/Registration";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pronostico from "./components/Pronostico";
import Suscripcion from "./components/Suscripcion";
import Fechas from "./components/Fechas";
import Contact from "./components/Contact";
import { UserContext } from "./components/Context";
import moment from "moment";
import UserService from "./services/user.services";
import Estadisticas from "./components/Estadisticas";
import axios from "axios";

function App() {
  const apiToken = "cfccda3b57e4496d884919c349c9f8a7";
  const urlMatches = "https://api.football-data.org/v2/competitions/WC/matches";
  const urlTeams = "https://api.football-data.org/v2/competitions/WC/teams";
  const urlFlags = "https://flagcdn.com/en/codes.json";
  const urlFlagFormat = "https://flagcdn.com/32x24/";
  const urlStatics =
    "https://api.football-data.org/v2/competitions/WC/standings";
  const stage = [
    "GROUP_STAGE",
    "LAST_16",
    "QUARTER_FINALS",
    "SEMI_FINALS",
    "FINAL",
  ];

  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [groupMatches, setGroupMatches] = useState([]);
  const [getImg, setGetImg] = useState("");
  const [id, setId] = useState(null);
  const [today, setToday] = useState("");
  const [users, setUsers] = useState([]);
  const [table, setTable] = useState({});
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [groupData, setGroupData] = useState([]);

  const getFlags = async (name) => {
    const flags = await fetch(urlFlags);
    const data = await flags.json();
    const list = Object.entries(data);
    const code = list.filter((flag) => flag[1] === name)[0][0];

    return code;
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(urlMatches, {
          headers: { "X-Auth-Token": `${apiToken}` },
        });

        const json = await response.json();

        setMatches(await json);
        setGroupMatches(
          await json.matches.filter((matches) => matches.stage === stage[0])
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchMatches();

    const fetchTeams = async () => {
      try {
        const response2 = await fetch(urlTeams, {
          headers: { "X-Auth-Token": `${apiToken}` },
        });
        const json2 = await response2.json();
        //console.log(json2);
        setTeams(await json2);

        const codeState = json2.teams.map(async (url) => ({
          id: url.id,
          url: urlFlagFormat + (await getFlags(url.name)) + ".png",
        }));

        const flagURL = await Promise.all(codeState);

        setGetImg(flagURL);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeams();
  }, []);

  //for Fechas.js
  useEffect(() => {
    const fetchMatches = async () => {
      const hoy = moment(Date.now()).format("DD/MM/YYYY");
      const futuro = moment("2022-11-23T01:00:00-0300").format("DD/MM/YYYY");
      try {
        const data = await fetch(urlMatches, {
          headers: { "X-Auth-Token": `${apiToken}` },
        });
        const partidos = await data.json();
        console.log("PARTIDOS", partidos);

        setToday(
          await partidos.matches.filter(
            (dia) => moment(dia.utcDate).format("DD/MM/YYYY") === futuro
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchMatches();
  }, []);

  //for Resultados.js
  const testMatch = [
    { matchId: 391881, winner: "Netherlands", goalHome: 2, goalAway: 3 },
    { matchId: 391882, winner: "Draw", goalHome: 0, goalAway: 0 },
    { matchId: 391883, winner: "Qatar", goalHome: 3, goalAway: 2 },
  ];
  useEffect(() => {
    const getBets = async () => {
      try {
        const response = await fetch("http://localhost:3000/pronosticos");

        const bets = await response.json();
        console.log("RESULTADOS", bets);
        let ids = await bets.map((bet) => bet.userId);
        let uniqueIds = [...new Set(ids)];
        let obj = [];

        for (let j = 0; j < uniqueIds.length; j++) {
          let points = 0;
          let userFilter = bets.filter((bet) => bet.userId === uniqueIds[j]); //filter by userId
          //console.log("USERFILTER", userFilter);

          for (let k = 0; k < testMatch.length; k++) {
            let caseWinner =
              userFilter.filter(
                (match) => match.matchId === testMatch[k].matchId
              )[0].winner === testMatch[k].winner;

            let caseGoalHome =
              userFilter.filter(
                (match) => match.matchId === testMatch[k].matchId
              )[0].goalHome === testMatch[k].goalHome;
            let caseGoalAway =
              userFilter.filter(
                (match) => match.matchId === testMatch[k].matchId
              )[0].goalAway === testMatch[k].goalAway;

            if (caseWinner) {
              points += 3;
            }

            if (caseGoalHome) {
              points += 3;
            }

            if (caseGoalAway) {
              points += 3;
            }

            //All
            if (caseWinner && caseGoalHome && caseGoalAway) {
              points += 10;
            }
          }
          obj.push({ userId: uniqueIds[j], points });

          //setTable(obj);
        }

        setTable(
          obj.sort((a, b) => {
            return b.points - a.points;
          })
        );
        setLoading(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    getBets();

    const getUsers = async () => {
      try {
        const allUsers = await UserService.getAllUsers();

        setUsers(allUsers.data);
        setLoading2(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUsers();
  }, []);

  //for Estadisticas.js
  useEffect(() => {
    const infoFetched = async () => {
      try {
        const fetchData = await axios.get(urlStatics, {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": `${apiToken}`,
          },
        });
        setGroupData(fetchData.data.standings);
      } catch (error) {
        console.log(error.message);
      }
    };
    infoFetched();
  }, []);

  return (
    groupMatches &&
    today &&
    table &&
    users &&
    teams &&
    getImg &&
    loading &&
    loading2 &&
    groupData && (
      <UserContext.Provider
        value={{
          groupData,
          id,
          setId,
          today,
          setToday,
          teams,
          groupMatches,
          getImg,
          users,
          table,
          loading,
          loading2,
        }}
      >
        <>
          <div id="page-top">
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route exact path={`/`} element={<Masthead />} />
                <Route exact path="/resultados" element={<Resultados />} />
                <Route exact path="/registro" element={<Registration />} />
                <Route exact path="/suscripcion" element={<Suscripcion />} />
                <Route exact path="/fechas" element={<Fechas />} />
                <Route exact path="/pronosticos" element={<Pronostico />} />
                <Route exact path="/estadisticas" element={<Estadisticas />} />
                <Route exact path="/contacto" element={<Contact />} />
              </Routes>
            </Router>
          </div>
        </>
      </UserContext.Provider>
    )
  );
}

export default App;
