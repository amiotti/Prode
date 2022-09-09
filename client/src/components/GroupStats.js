import React from "react";
import "../css/groupStats.css";

export default function GroupStats({ info }) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Equipo</th>
            <th scope="col">Puntos</th>
            <th scope="col">PJ</th>
            <th scope="col">GF</th>
            <th scope="col">GC</th>
            <th scope="col">PG</th>
            <th scope="col">PE</th>
            <th scope="col">PP</th>
            <th scope="col">DifGol</th>
          </tr>
        </thead>
        <tbody>
          {info.table.map((el) => (
            <tr key={el.team.id}>
              <th scope="row">{el.position}</th>
              <td>
                {el.team.name}{" "}
                <img src={el.team.crestUrl} className="statsimg"></img>
              </td>
              <td>{el.points}</td>
              <td>{el.playedGames}</td>
              <td>{el.goalsFor}</td>
              <td>{el.goalsAgainst}</td>
              <td>{el.won}</td>
              <td>{el.draw}</td>
              <td>{el.lost}</td>
              <td>{el.goalDifference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
