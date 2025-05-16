import "dotenv/config";
import express from "express";
import cors from "cors";
import mercadopagoPkg from "mercadopago";

const mercadopago = new mercadopagoPkg.MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

const preference = new mercadopagoPkg.Preference(mercadopago);

const myDomain = "https://meu-frontend.loca.lt/";

const app = express();
const allowedOrigins = ["http://localhost:5173", "https://meu-frontend.loca.lt"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origin not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

app.post("/create_preference", async (req, res) => {
  try {
    const items = req.body.items.map((item) => ({
      title: item.title,
      unit_price: item.unit_price,
      quantity: item.quantity,
      currency_id: "BRL",
    }));

    const preferenceResponse = await preference.create({
      body: {
        items,
        back_urls: {
          success: `${myDomain}success`,
          failure: `${myDomain}failure`,
          pending: `${myDomain}pending`,
        },
        auto_return: "approved",
      },
    });

    res.json({ init_point: preferenceResponse.init_point });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    res.status(500).json({ error: "Erro ao criar preferência" });
  }
});

const port = 3000;
app.listen(port, () => console.log(`Backend rodando na porta ${port}`));
