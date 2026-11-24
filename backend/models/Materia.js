const mongoose = require("mongoose")

const materiaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 20
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    descripcion: {
        type: String,
        trim: true
    },
    cargaHoraria: {
        type: Number,
        required: true,
        min: [1, "La carga horaria debe ser mayor que cero"],
        validate: {
            validator: Number.isInteger,
            message: "La carga horaria debe ser un número entero"
        }
    },
    estado: {
        type: String,
        required: true,
        enum: ["activa", "inactiva"]
    }
},
{
    versionKey: false
}
)

const Materia = mongoose.model("Materia", materiaSchema)

module.exports = Materia
