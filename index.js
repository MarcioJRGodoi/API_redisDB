const express = require("express");
const app = express();
const conn = require("./db/redisconfig");
const { client } = require("./db/redisconfig");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
// Importar as rotas
const routes = require("./routes/router");
// Registrar as rotas
app.use("/api", routes);
// Iniciar o servidor na porta 3000
client.on("ready", () => {
  app.listen(3002, () => {
    console.log("Servidor iniciado na porta 3002");
  });
});
