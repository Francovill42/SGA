const Docente = require("../models/Docente")

async function obtenerDocentes(req, res) {
    try {
        const docentes = await Docente.find()
        res.json(docentes)
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los docentes" })
    }
}

async function obtenerDocente(req, res) {
    try {
        const docente = await Docente.findOne({
            dni: Number(req.params.id)
        })
        if (!docente) {
            return res.status(404).json({
                mensaje: "Docente no encontrado"
            })
        }
        res.json(docente)
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el docente" })
    }
}

async function crearDocente(req, res) {
    try {
        const { dni, nombre, especialidad, correo } = req.body
        if (!dni || !nombre || !especialidad || !correo) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            })
        }
        if (typeof nombre !== "string") {
            return res.status(400).json({
                mensaje: "El nombre debe ser un texto"
            })
        }
        if (typeof dni !== "number" || Number.isNaN(dni)) {
            return res.status(400).json({
                mensaje: "El DNI debe ser un número"
            })
        }
        const existe = await Docente.findOne({ dni })
        if (existe) {
            return res.status(400).json({
                mensaje: "El DNI ya existe"
            })
        }
        const nuevoDocente = await Docente.create({
            dni,
            nombre,
            especialidad,
            correo
        })
        res.status(201).json(nuevoDocente)
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el docente" })
    }
}

async function actualizarDocente(req, res) {
    try {
        const { nombre, especialidad, correo } = req.body
        const docente = await Docente.findOneAndUpdate(
            { dni: Number(req.params.id) },
            { nombre, especialidad, correo },
            { returnDocument: "after" }
        )
        if (!docente) {
            return res.status(404).json({
                mensaje: "Docente no encontrado"
            })
        }
        res.json(docente)
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el docente" })
    }
}

async function eliminarDocente(req, res) {
    try {
        const docente = await Docente.findOneAndDelete(
            { dni: Number(req.params.id) }
        )
        if (!docente) {
            return res.status(404).json({
                mensaje: "Docente no encontrado"
            })
        }
        res.json({ mensaje: "Docente eliminado correctamente" })
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el docente" })
    }
}

module.exports = {
    obtenerDocentes,
    obtenerDocente,
    crearDocente,
    actualizarDocente,
    eliminarDocente
}
