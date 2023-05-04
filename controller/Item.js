const redis = require('redis');
const { promisify } = require('util');

const client =  redis.createClient({
    url: "redis://default:Y8JmIHCKLDskYrd5IBk5gJEOuFwa6rnQ@redis-11439.c274.us-east-1-3.ec2.cloud.redislabs.com:11439"
  });
   client.connect();

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);
const itemController = {

    create: async (req, res) => {

        try {
            const item = {
              chave: req.body.chave,
              valor: req.body.valor,
            };
          
            const response = await setAsync(item.chave, JSON.stringify(item));
          
            res.status(200).json({ response, msg: "Item criado com sucesso!" });
          } catch (error) {
            console.log(error);
          }
          
    },

    getAll: async (req, res) => {
        try {
            
            client.keys('*', async (err, keys) => {
                if (err) return console.log(err);

                const items = await Promise.all(
                    keys.map(async (key) => {
                        const value = await get(key);
                        return JSON.parse(value);
                    })
                );

                res.json(items);
            });

        } catch (error) {
            console.log(error)
        }
    },
     
    get: async (req, res) => {
        try {
            const chave = req.params.chave;

            const item = await getAsync(chave);

            if (!item) {
                res.status(404).json({ msg: "Item não encontrado." });
                return;
            }

            res.json(JSON.parse(item));

        } catch (error) {
            console.log(error)
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
            console.log(error)
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

}

module.exports = itemController;
