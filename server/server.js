require("dotenv").config();
const mercadopago = require("mercadopago");
const PORT = process.env.PORT || 3000;
const db = require("./models/index");
const { Users, Pronostico } = require("./models/models");
//const emailSender = require("./controllers/contact.controller");
const app = require("./app");

require("../server/middlewares/authJwt");
require("./middlewares/verifySignUp");

// const ACCESS_TOKEN = "TEST-f5ddaa57-7f70-451f-b329-2c430b78ac8f";

const ACCESS_TOKEN_PRUEBA =
  "TEST-4192509694015148-052021-bba601e9fc2caf5e23355ccae89314a3-1127476200";

//ROUTES
require("../server/routes/auth.routes")(app);
require("../server/routes/user.routes")(app);

app.post("/pronosticos", async (req, res) => {
  try {
    for (let i = 0; i < req.body.length; i++) {
      const pronostico = await Pronostico.findOne({
        where: { matchId: req.body[i].matchId, userId: req.body[i].userId },
      });
      console.log("PRONOSTICO", pronostico);
      if (!pronostico || !{} || null) {
        await Pronostico.create({
          matchId: req.body[i].matchId,
          winner: req.body[i].winner,
          goalHome: req.body[i].goalHome,
          goalAway: req.body[i].goalAway,
          userId: req.body[i].userId,
        });
      } else {
        console.log("YA ENVIASTE ESTE PRONOSTICO");
        res.status(400).send({ message: "Ya enviaste este pronostico" });
      }
    }

    res.status(200).send("Enviado");
  } catch (err) {
    console.log("ERROR en POST /pronosticos", err.message);
  }
});

app.get("/pronosticos", async (req, res) => {
  try {
    const usersPronostico = await Pronostico.findAll();
    res.send(usersPronostico);
  } catch (error) {
    console.log("ERROR en GET /pronosticos", error.message);
  }
});

//CONTACT

app.post("/contact", async (req, res) => {
  console.log(
    "EMAIL",
    await emailSender.main(req.name, req.email, req.textarea)
  );
  res.send(await emailSender.main(req.name, req.email, req.textarea));
});

//MP INTEGRATION
mercadopago.configure({ access_token: ACCESS_TOKEN_PRUEBA });

app.post("/api/orders", (req, res) => {
  console.log("REQ.>BODY", req.body);
  const preference = {
    items: [
      {
        title: "Suscripción Prode",
        unit_price: 1250,
        quantity: 1,
        currency_id: "ARS",
      },
    ],
    payer: {
      name: req.body.name,
      surname: req.body.lastname,
      email: req.body.email,
    },
    back_urls: { success: "http://localhost:3001/login" },
    auto_return: "approved",
  };

  console.log("ORDERs", preference);
  mercadopago.preferences.create(preference).then(async (preference) => {
    const payer = preference.body.payer.email;

    //Find and update user with preference_id
    const user = await Users.findOne({
      where: { email: payer },
    });
    await user.set({ preference_id: preference.body.id });
    await user.save();
    //console.log(await user);

    res.status(200).send(preference.body);
  });
});

app.post("/notify", async (req, res) => {
  const user = await Users.findOne({
    where: { preference_id: req.body.preference_id },
  });

  if (user) {
    await user.set({ suscripcion: true });
    //UPDATE TOKEN HERE?
    await user.save();
  }

  res.status(200).send(await user);
});

//SERVER AND DATABASE CONNECTION
const force = false;
db.sync(force).then(() => {
  console.log(`Connected to DB: ${process.env.DB || "Production DB"}  `);

  // https
  //   .createServer(
  //     {
  //       key: fs.readFileSync("server.key"),
  //       cert: fs.readFileSync("server.cert"),
  //     },
  //     app
  //   )
  app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT} `);
  });
});
