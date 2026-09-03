const express = require("express");
const app = express();

app.use(express.json());

// Importar rutas
const alumnosRouter = require("./routes/alumnosruotes");

app.use("/alumnos", alumnosRouter);

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor funcionando en http://localhost:3000");
});