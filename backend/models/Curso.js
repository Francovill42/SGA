const mongoose = require("mongoose")

const cursoSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, default: "" },
    cargaHoraria: { type: Number, required: true },
    estado: { type: String, enum: ["activo", "inactivo"], default: "activo" }
})

module.exports = mongoose.model("Curso", cursoSchema)