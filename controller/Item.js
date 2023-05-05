const redis = require('redis');
const { promisify } = require('util');
const { client } = require('../db/redisconfig');

const itemController = {
  create: async (req, res) => {
    try {
      const item = {
        chave: req.body.chave,
        valor: req.body.valor,
        cod: req.body.cod,
      };
      const response = await client.hSet(item.chave,item.cod,item.valor, JSON.stringify(item));
      res.status(200).json({ response, msg: "Item criado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const keys = await new Promise((resolve, reject) => {
        client.keys("*", (err, keys) => {
          if (err) reject(err);
          resolve(keys);
        });
      });
      client.
      console.log("Keys:", keys);
  
      const values = await new Promise((resolve, reject) => {
        client.get(keys, (err, values) => {
          if (err) reject(err);
          resolve(values);
        });
      });
  
      console.log("Values:", values);
      
      const data = {};
      keys.forEach((key, index) => {
        const value = values[index];
        if (value !== null) {
          data[key] = value;
        }
      });
  
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const chave = req.params.chave;
      const hesh = req.params.hesh;
      const item = await client.hGet(hesh, chave);
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
      const item = {
        chave: req.body.chave,
        valor: req.body.valor,
        cod: req.body.cod,
      };
      const response = await client.hSet(item.chave,item.valor, item.cod, JSON.stringify(item));
      res.status(200).json({ item, msg: "Item atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = itemController;
