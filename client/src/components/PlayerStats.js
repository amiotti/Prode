import React from "react";
import "../App.css";
import "../css/playerstats.css";

export default function PlayerStats() {
  const topScorers = {
    count: 10,
    filters: {
      season: "2021",
      limit: 10,
    },
    competition: {
      id: 2019,
      name: "Serie A",
      code: "SA",
      type: "LEAGUE",
      emblem: "https://crests.football-data.org/SA.png",
    },
    season: {
      id: 757,
      startDate: "2021-08-21",
      endDate: "2022-05-22",
      currentMatchday: 37,
      winner: null,
      stages: ["REGULAR_SEASON"],
    },
    scorers: [
      {
        player: {
          id: 2076,
          name: "Ciro Immobile",
          firstName: "Ciro",
          lastName: "Immobile",
          dateOfBirth: "1990-02-20",
          nationality: "Italy",
          position: "Offence",
          shirtNumber: null,
          lastUpdated: "2021-10-13T08:03:51Z",
        },
        team: {
          id: 110,
          name: "SS Lazio",
          shortName: "Lazio",
          tla: "LAZ",
          crest: "https://crests.football-data.org/110.svg",
          address: "Via di Santa Cornelia, 1000 Formello 00060",
          website: "http://www.sslazio.it",
          founded: 1900,
          clubColors: "White / Sky Blue",
          venue: "Stadio Olimpico",
          lastUpdated: "2020-11-26T02:19:41Z",
        },
        goals: 27,
        assists: 2,
        penalties: 7,
      },
      {
        player: {
          id: 82002,
          name: "Dušan Vlahović",
          firstName: "Dušan",
          lastName: null,
          dateOfBirth: "2000-01-28",
          nationality: "Serbia",
          position: "Offence",
          shirtNumber: null,
          lastUpdated: "2020-09-07T21:10:05Z",
        },
        team: {
          id: 109,
          name: "Juventus FC",
          shortName: "Juventus",
          tla: "JUV",
          crest: "https://crests.football-data.org/109.svg",
          address: "Corso Galileo Ferraris, 32 Torino 10128",
          website: "http://www.juventus.com",
          founded: 1897,
          clubColors: "White / Black",
          venue: "Allianz Stadium",
          lastUpdated: "2020-11-26T02:19:40Z",
        },
        goals: 24,
        assists: 3,
        penalties: 5,
      },
      {
        player: {
          id: 3220,
          name: "Lautaro Martínez",
          firstName: "Lautaro Javier",
          lastName: null,
          dateOfBirth: "1997-08-22",
          nationality: "Argentina",
          position: "Offence",
          shirtNumber: null,
          lastUpdated: "2020-09-07T21:10:27Z",
        },
        team: {
          id: 108,
          name: "FC Internazionale Milano",
          shortName: "Inter",
          tla: "INT",
          crest: "https://crests.football-data.org/108.png",
          address: "Corso Vittorio Emanuele II 9 Milano 20122",
          website: "http://www.inter.it",
          founded: 1908,
          clubColors: "Blue / Black",
          venue: "Stadio Giuseppe Meazza",
          lastUpdated: "2021-11-24T14:55:58Z",
        },
        goals: 21,
        assists: 3,
        penalties: 3,
      },
      {
        player: {
          id: 1789,
          name: "Giovanni Simeone",
          firstName: "Giovanni Pablo",
          lastName: null,
          dateOfBirth: "1995-07-05",
          nationality: "Argentina",
          position: "Offence",
          shirtNumber: null,
          lastUpdated: "2020-09-07T21:10:20Z",
        },
        team: {
          id: 450,
          name: "Hellas Verona FC",
          shortName: "Verona",
          tla: "HVE",
          crest: "https://crests.football-data.org/450.png",
          address: "Via Evangelista Torricelli, 37 Verona 37136",
          website: "http://www.hellasverona.it",
          founded: 1903,
          clubColors: "Yellow / Blue",
          venue: "Stadio Marc'Antonio Bentegodi",
          lastUpdated: "2022-02-19T08:54:02Z",
        },
        goals: 16,
        assists: 5,
        penalties: null,
      },
      {
        player: {
          id: 2681,
          name: "Gianluca Scamacca",
          firstName: "Gianluca",
          lastName: null,
          dateOfBirth: "1999-01-01",
          nationality: "Italy",
          position: "Offence",
          shirtNumber: null,
          lastUpdated: "2021-02-28T11:23:44Z",
        },
        team: {
          id: 471,
          name: "US Sassuolo Calcio",
          shortName: "Sassuolo",
          tla: "SAS",
          crest: "https://crests.football-data.org/471.svg",
          address: "Piazza Risorgimento, 47 Sassuolo 41049",
          website: "http://www.sassuolocalcio.it",
          founded: 1920,
          clubColors: "Green / Black",
          venue: "Mapei Stadium - Città del Tricolore",
          lastUpdated: "2021-04-12T13:07:30Z",
        },
        goals: 16,
        assists: null,
        penalties: 1,
      },
      {
        player: {
          id: 7985,
          name: "Tammy Abraham",
          firstName: "Tammy",
          lastName: null,
          dateOfBirth: "1997-10-02",
          nationality: "England",
          position: "Offence",
          shirtNumber: null,
          lastUpdated: "2022-01-25T07:53:22Z",
        },
        team: {
          id: 100,
          name: "AS Roma",
          shortName: "Roma",
          tla: "ROM",
          crest: "https://crests.football-data.org/100.svg",
          address: "Via di Trigoria km. 3,600 Roma 00128",
          website: "http://www.asroma.it",
          founded: 1927,
          clubColors: "Maroon / Orange / White",
          venue: "Stadio Olimpico",
          lastUpdated: "2021-04-08T22:27:08Z",
        },
        goals: 15,
        assists: 4,
        penalties: 2,
      },
      {
        player: {
          id: 2202,
          name: "Domenico Berardi",
          firstName: "Domenico",
          lastName: null,
          dateOfBirth: "1994-08-01",
          nationality: "Italy",
          position: "Offence",
          shirtNumber: null,
          lastUpdated: "2020-09-07T21:10:46Z",
        },
        team: {
          id: 471,
          name: "US Sassuolo Calcio",
          shortName: "Sassuolo",
          tla: "SAS",
          crest: "https://crests.football-data.org/471.svg",
          address: "Piazza Risorgimento, 47 Sassuolo 41049",
          website: "http://www.sassuolocalcio.it",
          founded: 1920,
          clubColors: "Green / Black",
          venue: "Mapei Stadium - Città del Tricolore",
          lastUpdated: "2021-04-12T13:07:30Z",
        },
        goals: 15,
        assists: 14,
        penalties: 6,
      },
      {
        player: {
          id: 8223,
          name: "Marko Arnautovic",
          firstName: "Marko",
          lastName: null,
          dateOfBirth: "1989-04-19",
          nationality: "Austria",
          position: "Offence",
          shirtNumber: 7,
          lastUpdated: "2021-05-26T09:57:09Z",
        },
        team: {
          id: 103,
          name: "Bologna FC 1909",
          shortName: "Bologna",
          tla: "BOL",
          crest: "https://crests.football-data.org/103.svg",
          address: "Via Casteldebole 10 Bologna 40132",
          website: "http://www.bolognafc.it",
          founded: 1909,
          clubColors: "Red / Blue / White",
          venue: "Stadio Renato Dall'Ara",
          lastUpdated: "2020-11-26T02:23:03Z",
        },
        goals: 14,
        assists: 1,
        penalties: 2,
      },
      {
        player: {
          id: 9434,
          name: "Victor Osimhen",
          firstName: "Victor James",
          lastName: null,
          dateOfBirth: "1998-12-29",
          nationality: "Nigeria",
          position: "Offence",
          shirtNumber: null,
          lastUpdated: "2020-09-07T21:10:37Z",
        },
        team: {
          id: 113,
          name: "SSC Napoli",
          shortName: "Napoli",
          tla: "NAP",
          crest: "https://crests.football-data.org/113.svg",
          address:
            "Centro Tecnico di Castel Volturno, Via S.S. Domitana, Km 35 Castel Volturno 81030",
          website: "http://www.sscnapoli.it",
          founded: 1904,
          clubColors: "Sky Blue / White",
          venue: "Stadio San Paolo",
          lastUpdated: "2020-11-26T02:19:45Z",
        },
        goals: 14,
        assists: 2,
        penalties: null,
      },
      {
        player: {
          id: 1822,
          name: "Edin Džeko",
          firstName: "Edin",
          lastName: "Džeko",
          dateOfBirth: "1986-03-17",
          nationality: "Bosnia-Herzegovina",
          position: "Offence",
          shirtNumber: null,
          lastUpdated: "2022-01-25T07:51:45Z",
        },
        team: {
          id: 108,
          name: "FC Internazionale Milano",
          shortName: "Inter",
          tla: "INT",
          crest: "https://crests.football-data.org/108.png",
          address: "Corso Vittorio Emanuele II 9 Milano 20122",
          website: "http://www.inter.it",
          founded: 1908,
          clubColors: "Blue / Black",
          venue: "Stadio Giuseppe Meazza",
          lastUpdated: "2021-11-24T14:55:58Z",
        },
        goals: 13,
        assists: 6,
        penalties: null,
      },
    ],
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Selección</th>
          <th scope="col">Goles</th>
          <th scope="col">Asistencias</th>
          <th scope="col">Penales</th>
        </tr>
      </thead>
      <tbody className="estadistica">
        {topScorers.scorers.map((scorer, i) => (
          <tr>
            <th scope="row">{i + 1}</th>
            <td>{scorer.player.name}</td>
            <td>{scorer.team.name}</td>
            <td>{scorer.goals}</td>
            <td>{scorer.assists}</td>
            <td>{scorer.penalties}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
