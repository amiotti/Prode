import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Navigation from "./Navigation";
import AuthVerify from "../common/AuthVerify";
import { UserContext } from "./Context";
import TokenService from "../services/token.services";

function Masthead() {
  //verify if actual token is expired
  const userLogged = AuthVerify();
  const navigate = useNavigate();
  console.log("USERLOGGED", userLogged);

  const { setId, groupMatches } = useContext(UserContext);

  useEffect(() => {
    !userLogged ? setId(false) : setId(userLogged.id);

    // if (/*userLogged &&*/ !userLogged.suscription) {
    //   navigate("/suscripcion");
    //   // } else if (userLogged.suscription === false) {
    //   //   navigate("/suscripcion", {
    //   //     state: { preference_id: userLogged.preference },
    //   //   });
    // }

    if (!userLogged) {
      navigate("/login");
    }
  }, []);

  return (
    groupMatches && (
      <>
        <Navigation />
        <header className="masthead">
          <div className="container px-4 px-lg-5 h-100">
            <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
              <div className="col-lg-8 align-self-end">
                <h1 className="text-white font-weight-bold">
                  Prode LBB Qatar 2022
                </h1>
                <hr className="divider" />
              </div>
              <div className="col-lg-8 align-self-baseline">
                <p className="text-white-75 mb-5"></p>
              </div>
            </div>
          </div>
          <div className="masthead">
            <div className="container px-4 px-lg-5 h-100">
              {/* <Pronostico
              id={userId}
              groupMatches={groupMatches}
              teams={teams}
              getImg={getImg}
            /> */}
            </div>
          </div>
        </header>
      </>
    )
  );
}

export default Masthead;
