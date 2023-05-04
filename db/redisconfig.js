const redis = require('redis');
const { promisify } = require('util');

async function configureRedisClient() {
  try{
    const client = await redis.createClient({
      url: "redis://default:Y8JmIHCKLDskYrd5IBk5gJEOuFwa6rnQ@redis-11439.c274.us-east-1-3.ec2.cloud.redislabs.com:11439"
    });
     client.connect();

    
    const setAsync = promisify(client.set).bind(client);
     return new Promise(async (resolve, reject) => {
        
        await client.on('error', (err) => {
            console.error('Erro ao conectar ao banco Redis:', err);
            reject(err);
        });

        
        await client.on('connect', () => {
            console.log('Conectado ao banco Redis');
            const getAsync = promisify(client.get).bind(client);
            resolve({ client, getAsync, setAsync });
        });
    });    
  }
    catch(err){
      console.log(err)
    }
}

module.exports = configureRedisClient
  
