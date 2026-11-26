const mongoose = require("mongoose")

const alumnoSchema = new mongoose.Schema({
    legajo: {
        type: String,
        required: true,
        unique: true
    },
    nombre: String,
    apellido: String,
    dni: String,
    email: String
},
{
    versionKey: false
}
)

const Alumno = mongoose.model("Alumno", alumnoSchema)

module.exports = Alumno