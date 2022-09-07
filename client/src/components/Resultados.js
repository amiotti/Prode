import { useContext } from "react";
import { Navigate } from "react-router-dom";
import "../App.css";
import AuthVerify from "../common/AuthVerify";
import Navigation from "./Navigation";
import { UserContext } from "./Context";

const apiToken = "cfccda3b57e4496d884919c349c9f8a7";

const Resultados = () => {
  const userLogged = AuthVerify();

  const { users, table, loading, loading2 } = useContext(UserContext);

  async function fetchData() {
    try {
      const data = await fetch(
        "https://api.football-data.org/v2/competitions/WC/matches",
        {
          headers: { "X-Auth-Token": `${apiToken}` },
        }
      );
      const response = await data.json();
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  // const testMatch = [
  //   { matchId: 391881, winner: "Netherlands", goalHome: 2, goalAway: 3 },
  //   { matchId: 391882, winner: "Draw", goalHome: 0, goalAway: 0 },
  //   { matchId: 391883, winner: "Qatar", goalHome: 3, goalAway: 2 },
  // ];

  //{userId:1, points: 19 + 3 + 0 = 22}
  //{userId:2, points: 6 + 0 + 0 = 6}

  // const testBet = [
  //   {
  //     matchId: 391881,
  //     winner: "Netherlands",
  //     goalHome: 2,
  //     goalAway: 3,
  //     userId: 1,
  //   },
  //   { matchId: 391882, winner: "Draw", goalHome: 1, goalAway: 1, userId: 1 },
  //   {
  //     matchId: 391883,
  //     winner: "Senegal",
  //     goalHome: 1,
  //     goalAway: 3,
  //     userId: 1,
  //   },
  //   {
  //     matchId: 391881,
  //     winner: "Netherlands",
  //     goalHome: 1,
  //     goalAway: 3,
  //     userId: 2,
  //   },
  //   { matchId: 391882, winner: "Qatar", goalHome: 2, goalAway: 1, userId: 2 },
  //   {
  //     matchId: 391883,
  //     winner: "Draw",
  //     goalHome: 1,
  //     goalAway: 1,
  //     userId: 2,
  //   },
  // ];

  return userLogged ? (
    table && users && loading && loading2 && (
      <header className="masthead">
        <Navigation />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">USER ID</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">SECTOR</th>
              <th scope="col">PUNTOS</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              table.map((table) => (
                <>
                  <tr key={table.userId}>
                    <td>{table.userId}</td>
                    <td>
                      {users.filter((user) => user.id === table.userId)[0].name}{" "}
                      {
                        users.filter((user) => user.id === table.userId)[0]
                          .lastname
                      }
                    </td>
                    <td>
                      {
                        users.filter((user) => user.id === table.userId)[0]
                          .sector
                      }
                    </td>
                    <td>{table.points}</td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </header>
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default Resultados;
