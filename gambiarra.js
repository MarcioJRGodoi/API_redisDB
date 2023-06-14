const { client } = require("../db/redisconfig");

const itemController = {
  create: async (req, res) => {
    try {
      const item = {
        chave: req.body.chave,
        valor: req.body.valor,
      };
      const response = await client.hSet(
        "Pessoas",
        item.chave,
        JSON.stringify(item.valor)
      );
      res.status(200).json({ response, msg: "Item criado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const hesh = req.params.hesh;
      const heshs = await client.scan(0, {
        MATCH: `${hesh}*`,
      });
      let valores = [];
      for (let i = 0; heshs.keys.length > i; i++) {
        const item = await client.hVals(heshs.keys[i]);
        if (!item) {
          res.status(404).json({ msg: "Item não encontrado." });
          return;
        }
        valores.push(
          item.map((val) => {
            return JSON.parse(val);
          })
        );
      }

      res.json(valores);
    } catch (error) {
      console.log(error);
    }
  },
  getOne: async (req, res) => {
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
  get: async (req, res) => {
    try {
      const chave = req.params.chave;
      const hesh = req.params.hesh;
      const heshs = await client.scan(0, {
        MATCH: `${hesh}*`,
      });
      let found = [];
      let keys = [];
      let num = 0;
      for (let i = 0; heshs.keys.length > i; i++) {
        const item = await client.hScan(heshs.keys[i], 0, {
          MATCH: `${chave}*`,
          COUNT: 10000,
        });
        found.push(item.tuples.map((t) => JSON.parse(t.value)));
        keys = item.tuples.map((t) => t.field);

        if (!item.tuples) {
          res.status(404).json({ msg: "Item não encontrado." });
          return;
        }
        num = num + found[i].length;
      }
      console.log(num);
      res.json(found);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    try {
      let response;
      const hesh = req.params.hesh;
      const chave = req.params.chave;
      const heshs = await client.scan(0, {
        MATCH: `${hesh}*`,
      });
      for (let i = 0; 2000 > i; i++) {
        response = client.hDel(heshs[0], chave);
      }

      res.status(200).json({ response, msg: "Item excluído com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      const hesh = req.params.hash;
      const chave = req.params.chave;
      const chaveExiste = await client.hExists(hesh, chave);

      if (!chaveExiste) {
        res.status(404).json({ msg: "Chave não encontrada." });
        return;
      }
      const heshs = await client.scan(0, {
        MATCH: `${hesh}*`,
      });
      let response = [];
      const item = {
        nome: req.body.nome,
        adress: req.body.adress,
        aniversario: req.body.aniversario,
        numero: req.body.numero,
      };
      for (let i = 0; 100000 > i; i++) {
        response = await client.hSet(
          heshs.keys[0],
          chave,
          JSON.stringify(item)
        );
      }

      res.status(200).json({ response, msg: "Item atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = itemController;
