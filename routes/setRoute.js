const express = require('express');
const router = express.Router();
const { setAsync } = require('../db/redisconfig');

router.post('/:chave/:valor', async (req, res) => {
    const chave = req.params.chave;
    const valor = req.params.valor;
    try {
        await setAsync(chave, valor); // Utiliza a função assíncrona do Redis transformada em Promise
        res.json({ chave, valor });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao adicionar valor ao Redis' });
    }
});

module.exports = router;
