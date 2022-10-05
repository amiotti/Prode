import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import AuthVerify from "../common/AuthVerify";
import Navigation from "./Navigation";
import { UserContext } from "./Context";

const Resultados = () => {
  const userLogged = AuthVerify();
  const navigate = useNavigate();

  const { users, table, loading, loading2 } = useContext(UserContext);
  console.log("TABLE", table);
  useEffect(() => {
    if (!userLogged) {
      navigate("/login");
    }
  }, []);

  return (
    table &&
    users &&
    loading &&
    loading2 && (
      <header className="masthead">
        <Navigation />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">POS</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">SECTOR</th>
              <th scope="col">PUNTOS</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              table.map((table, i) => (
                <>
                  <tr key={table.userId}>
                    <td>{i + 1}</td>
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
  );
};

export default Resultados;
