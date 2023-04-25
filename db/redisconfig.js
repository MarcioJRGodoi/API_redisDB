const redis = require('redis');
const { promisify } = require('util');

// Função para configurar o cliente Redis e transformar as funções assíncronas em Promises
function configureRedisClient() {
    const client = redis.createClient({
        password: 'RYYzD3Y3bqF3be2wGqto4lSwcfBfAKRq',
        socket: {
            host: 'redis-13453.c8.us-east-1-4.ec2.cloud.redislabs.com',
            port: 13453
        }
    });
    client.on("connect", () => {
        console.log('Conectado ao banco Redis');
        const getAsync = promisify(client.get).bind(client);
        const setAsync = promisify(client.set).bind(client);
        resolve({ client, getAsync, setAsync });
    });

    // Retornar uma Promise que resolve com o objeto { client, getAsync, setAsync }
    return new Promise((resolve, reject) => {
        // Lidar com o evento de erro do cliente Redis
        client.on('error', (err) => {
            console.error('Erro ao conectar ao banco Redis:', err);
            reject(err);
        });

        // Verificar se o cliente Redis está conectado
        client.on('connect', () => {
            console.log('Conectado ao banco Redis');
            const getAsync = promisify(client.get).bind(client);
            const setAsync = promisify(client.set).bind(client);
            resolve({ client, getAsync, setAsync });
        });
    });
}

module.exports = configureRedisClient;
