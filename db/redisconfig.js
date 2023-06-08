const redis = require("redis");

const client = redis.createClient({
  url: "redis://localhost:6379",
  //url: "redis://default:Y8JmIHCKLDskYrd5IBk5gJEOuFwa6rnQ@redis-11439.c274.us-east-1-3.ec2.cloud.redislabs.com:11439",
});

client.connect();
client.on("error", (err) => {
  console.error("Erro ao conectar ao banco Redis:", err);
});

client.on("connect", () => {
  console.log("Conectado ao banco Redis");
});

module.exports = { client };
