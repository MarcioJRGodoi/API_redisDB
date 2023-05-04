const redis = require('redis');
const { promisify } = require('util');
const { client } = require('../db/redisconfig');
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);
const scanAsync = promisify(client.scan).bind(client);

const itemController = {
  create: async (req, res) => {
    try {
      const item = {
        chave: req.body.chave,
        valor: req.body.valor,
      };
      const response = await client.set(item.chave, JSON.stringify(item));
      res.status(200).json({ response, msg: "Item criado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async (req, res) => {
    try {
      let cursor = '0';
      const items = [];
      do {
        const [nextCursor, keys] = await client.get(cursor, 'MATCH', '*', 'COUNT', '100');
        cursor = nextCursor;
  
        const values = await Promise.all(keys.map(key => getAsync(key)));
        items.push(...values.map(value => JSON.parse(value)));
      } while (cursor !== '0');
  
      res.json(items);
    } catch (error) {
      console.log(error)
    }
  },
  get: async (req, res) => {
    try {
      const chave = req.params.chave;
      const item = await client.get(chave);
      if (!item) {
        res.status(404).json({ msg: "Item não encontrado." });
        return;
      }
      res.json(JSON.parse(item));
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.body.id;
      client.del(id, (err, response) => {
        if (err) return console.log(err);
        if (response == 1) {
          res.status(200).json({ response, msg: "Item excluído com sucesso!" });
        } else {
          res.status(404).json({ msg: "Item não encontrado." });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.body.id;
      const item = {
        chave: req.body.id,
        valor: req.body.nome,
      };
      const response = await setAsync(id, JSON.stringify(item));
      res.status(200).json({ item, msg: "Item atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = itemController;
