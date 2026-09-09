// Importamos mongoose para definir el esquema y modelo de Alumno
const mongoose = require("mongoose");

// Definimos la estructura de los documentos de alumnos
const alumnoSchema = new mongoose.Schema({

    // Número de legajo del alumno
    legajo: Number,

    // Nombre del alumno
    nombre: String,

    // Carrera que está estudiando
    carrera: String,

    // Correo electrónico del alumno
    correo: String
});

// Creamos el modelo Alumno usando el Schema
// "Alumno" será el modelo que utilizaremos desde el controller
const Alumno = mongoose.model("Alumno", alumnoSchema);

// Exportamos el modelo para poder utilizarlo en otros archivos
module.exports = Alumno;