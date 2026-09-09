// Importamos Express.
// Express nos permite crear nuestro servidor y manejar
// las peticiones HTTP (GET, POST, PUT, DELETE).
const express = require("express");


// Creamos nuestra aplicación utilizando Express.
// "app" va a ser nuestro servidor.
const app = express();


// Middleware que permite que Express pueda recibir
// datos enviados en formato JSON.
//
// Por ejemplo, cuando desde Thunder Client enviamos:
//
// {
//     "legajo": 1002,
//     "nombre": "Juancruz",
//     "carrera": "Legislacion",
//     "correo": "Juancruz@gmail.com"
// }
//
// Express va a poder acceder a esos datos mediante req.body.
app.use(express.json());


// =====================================================
// IMPORTAR RUTAS
// =====================================================

// Importamos el archivo donde tenemos
// las rutas de los alumnos.
//
// "../" significa que salimos de la carpeta actual.
// "./routes/alumnosruotes" busca el archivo dentro
// de la carpeta routes.
const alumnosRouter = require("./routes/alumnosruotes");


// Le indicamos a Express que todas las rutas
// que están dentro de alumnosRouter van a comenzar
// con "/alumnos".
//
// Por ejemplo:
//
// router.get("/")       → GET /alumnos
// router.get("/:id")   → GET /alumnos/:id
// router.post("/")      → POST /alumnos
//
// Entonces "/alumnos" funciona como ruta base.
app.use("/alumnos", alumnosRouter);


// =====================================================
// CONEXIÓN CON MONGODB
// =====================================================

// Importamos la función encargada de conectarse
// a nuestra base de datos MongoDB.
//
// Esta función está dentro de:
// config/dtb.js
const conectarDB = require("./config/dtb");


// Ejecutamos la función para conectarnos a MongoDB.
conectarDB();


// =====================================================
// INICIAR SERVIDOR
// =====================================================

// app.listen() inicia nuestro servidor.
//
// El número 3000 es el puerto donde va a funcionar
// nuestra aplicación.
//
// Entonces nuestro servidor estará disponible en:
//
// http://localhost:3000
app.listen(3000, () => {

    // Este mensaje aparece en la consola
    // cuando el servidor se inicia correctamente.
    console.log("Servidor funcionando en http://localhost:3000");
});