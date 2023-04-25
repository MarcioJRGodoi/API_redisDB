const express = require('express');
const router = express.Router();
const { getAsync } = require('../db/redisconfig');

router.get('/:chave', async (req, res) => {
    const chave = req.params.chave;
    try {
        const valor = await getAsync(chave); // Utiliza a função assíncrona do Redis transformada em Promise
        if (!valor) {
            return res.status(404).json({ error: 'Chave não encontrada no Redis' });
        }
        res.json({ chave, valor });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao recuperar valor do Redis' });
    }
});

module.exports = router;
