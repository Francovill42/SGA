const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const conectarDB = require("./config/dtb")
require("dotenv").config()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

// Sirve el frontend (HTML, CSS, JS del cliente)
app.use(express.static(path.join(__dirname, "..", "frontend")))

const alumnosRoutes = require('./routes/alumnosruotes');
app.use("/alumnos", alumnosRoutes)

conectarDB()
console.log("Ejecutado con nodemon")

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})


// Creo un middleware
// app.use((req, res, next) => {
//     console.log(req.method)
//     console.log(req.url)
//     next()
// })