import "dotenv/config";
import express from "express";
import cors from "cors";
import mercadopagoPkg from "mercadopago";

const mercadopago = new mercadopagoPkg.MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

const preference = new mercadopagoPkg.Preference(mercadopago);

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
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
          success: "http://localhost:5173/success",
          failure: "http://localhost:5173/failure",
          pending: "http://localhost:5173/pending",
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
