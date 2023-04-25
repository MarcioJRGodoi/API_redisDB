const express = require('express');
const app = express();
const conn = require('./db/redisconfig');
conn()
.then(() => {
  console.log('Conexão Redis estabelecida com sucesso');
})
.catch((err) => {
  console.error('Erro ao estabelecer conexão Redis:', err);
});

// Importar as rotas
const setRoute = require('./routes/setRoute');
const getRoute = require('./routes/getRoute');

// Registrar as rotas
app.use('/get', getRoute);
app.use('/set', setRoute);

// Iniciar o servidor na porta 3000
app.listen(3002, () => {
  console.log('Servidor iniciado na porta 3002');
});

