const router = require("express").Router();
const { setAsync } = require('../db/redisconfig');

router.post('/:chave/:valor', async (req, res) => {
    const chave = req.params.chave;
    const valor = req.params.valor;
    if (!chave) {
        return res.status(400).json({ error: 'Chave não fornecida' });
    }
  try {
    await setAsync(chave, valor);
    res.json({ chave, valor });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar valor ao Redis' });
  }
});

module.exports = router;
