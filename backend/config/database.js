
const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function conectarBD() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Base de datos conectada");
    } catch (error) {
        console.error("Error al conectar MongoDB:", error);
    }
}

module.exports = conectarBD;
