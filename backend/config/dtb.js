// Importamos mongoose para poder trabajar con MongoDB desde Node.js
const mongoose = require("mongoose");

// Función encargada de conectar nuestra aplicación con MongoDB
async function conectarDB() {

    try {
        // Intentamos conectarnos a MongoDB
        // localhost = nuestra propia computadora
        // 27017 = puerto por defecto de MongoDB
        // SGA = nombre de la base de datos que vamos a utilizar
        await mongoose.connect("mongodb://localhost:27017/SGA");

        // Si la conexión funciona, mostramos este mensaje
        console.log("MongoDB conectado");

    } catch (error) {

        // Si ocurre algún error durante la conexión,
        // mostramos el error en la consola
        console.log("Error al conectar MongoDB:", error);
    }
}

// Exportamos la función para poder utilizarla
// desde otros archivos de nuestro proyecto
module.exports = conectarDB;