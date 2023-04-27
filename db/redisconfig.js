const redis = require('redis');
const { promisify } = require('util');

async function configureRedisClient() {
    const client = redis.createClient({
        password: 'RYYzD3Y3bqF3be2wGqto4lSwcfBfAKRq',
        socket: {
            host: 'redis-13453.c8.us-east-1-4.ec2.cloud.redislabs.com',
            port: 13453
        }
    });

    
     new Promise((resolve, reject) => {
        
        client.on('error', (err) => {
            console.error('Erro ao conectar ao banco Redis:', err);
            reject(err);
        });

        
        client.on('connect', () => {
            console.log('Conectado ao banco Redis');
            const getAsync = promisify(client.get).bind(client);
            const setAsync = promisify(client.set).bind(client);
            resolve({ client, getAsync, setAsync });
        });
    });
}

module.exports = async function() {
  try {
    const conn = await configureRedisClient();
    global.conn = conn;
    return conn;
  } catch (err) {
    console.error('Erro ao estabelecer conexão Redis:', err);
  }
};
