const express = require("express");
const app = express();

app.use(express.json());

// Importar rutas
const alumnosRoutes = require("./routes/alumnosrouter");

app.use("/alumnos", alumnosRoutes);

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor funcionando en http://localhost:3000");
});