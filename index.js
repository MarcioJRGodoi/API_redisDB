const express = require('express');
const app = express();
const conn = require('./db/redisconfig');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
conn()

  // Importar as rotas
const setRoute = require('./routes/setRoute');

// Registrar as rotas
app.use('/api', setRoute);

// Iniciar o servidor na porta 3000
app.listen(3002, () => {
  console.log('Servidor iniciado na porta 3002');
});




