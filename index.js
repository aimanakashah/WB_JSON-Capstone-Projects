import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://open.er-api.com/v6/latest/USD";

app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index.ejs", {
    exchange: "Exchange Rate Application",
  });
});

app.get("/exchange", async (req, res) => {
  const first = req.query.firstCurrency; //getting the rates of the first currency chose
  const second = req.query.secondCurrency; //getting the rates of the second currency
  const insertedNumber = req.query.numberInserted; //getting the number inserted in the input

  try {
    const result = await axios.get(`${API_URL}`); //getting the data from web server using API

    const numberExchanged =
      (insertedNumber / result.data.rates[first]) * result.data.rates[second];

    res.render("index.ejs", {
      exchange: numberExchanged.toFixed(2),
      first,
      second,
      insertedNumber,
    });
  } catch (error) {
    console.log("Currency exchange is unavailable.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
