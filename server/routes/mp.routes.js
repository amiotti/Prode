require("dotenv").config();
const mercadopago = require("mercadopago");
const { Users } = require("../models/models");

const ACCESS_TOKEN_PRUEBA =
  "TEST-4192509694015148-052021-bba601e9fc2caf5e23355ccae89314a3-1127476200";

mercadopago.configure({ access_token: ACCESS_TOKEN_PRUEBA });

module.exports = function (app) {
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
};
