const Materia = require("../models/Materia")

// Validaciones que se repiten en el alta y en la modificación
function validarDatos({ codigo, nombre, descripcion, cargaHoraria, estado }) {
    if (typeof codigo !== "string" || codigo.trim() === "") {
        return "El código es obligatorio"
    }
    if (codigo.trim().length > 20) {
        return "El código no puede superar los 20 caracteres"
    }
    if (typeof nombre !== "string" || nombre.trim() === "") {
        return "El nombre es obligatorio"
    }
    if (nombre.trim().length > 100) {
        return "El nombre no puede superar los 100 caracteres"
    }
    if (descripcion && (typeof descripcion !== "string" || descripcion.trim() === "")) {
        return "La descripción no puede tener solo espacios"
    }
    if (!Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
        return "La carga horaria debe ser un número entero mayor que cero"
    }
    if (estado !== "activa" && estado !== "inactiva") {
        return "El estado debe ser activa o inactiva"
    }
    return null
}

async function obtenerMaterias(req, res) {
    try {
        const materias = await Materia.find()
        res.json(materias)
    } catch (error) {
        console.error("Error al obtener materias: ", error)
        res.status(500).json({
            mensaje: "No se pudieron obtener las materias"
        })
    }
}

async function obtenerMateria(req, res) {
    try {
        const materia = await Materia.findOne({
            codigo: req.params.codigo
        })
        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }
        res.json(materia)
    } catch (error) {
        console.error("Error al obtener la materia: ", error)
        res.status(500).json({
            mensaje: "No se pudo obtener la materia"
        })
    }
}

async function crearMateria(req, res) {
    try {
        const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body
        const mensajeError = validarDatos(req.body)
        if (mensajeError) {
            return res.status(400).json({
                mensaje: mensajeError
            })
        }
        const existe = await Materia.findOne({
            codigo: codigo.trim()
        })
        if (existe) {
            return res.status(400).json({
                mensaje: "El código ya existe"
            })
        }
        const nuevaMateria = await Materia.create({
            codigo,
            nombre,
            descripcion,
            cargaHoraria,
            estado
        })
        res.status(201).json(nuevaMateria)
    } catch (error) {
        // 11000 es el error de MongoDB cuando se repite un campo unique
        if (error.code === 11000) {
            return res.status(400).json({
                mensaje: "El código ya existe"
            })
        }
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Los datos de la materia no son válidos"
            })
        }
        console.error("Error al crear la materia: ", error)
        res.status(500).json({
            mensaje: "No se pudo crear la materia"
        })
    }
}

async function actualizarMateria(req, res) {
    try {
        const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body
        // Si no se envía un código nuevo, la materia conserva el que tiene
        const codigoNuevo = codigo === undefined ? req.params.codigo : codigo
        const mensajeError = validarDatos({
            codigo: codigoNuevo,
            nombre,
            descripcion,
            cargaHoraria,
            estado
        })
        if (mensajeError) {
            return res.status(400).json({
                mensaje: mensajeError
            })
        }
        const existente = await Materia.findOne({
            codigo: req.params.codigo
        })
        if (!existente) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }
        // Solo se busca un duplicado si el código cambió (así no choca con el suyo)
        if (codigoNuevo.trim() !== req.params.codigo) {
            const duplicada = await Materia.findOne({
                codigo: codigoNuevo.trim()
            })
            if (duplicada) {
                return res.status(400).json({
                    mensaje: "El código ya existe"
                })
            }
        }
        const materia = await Materia.findOneAndUpdate(
            { codigo: req.params.codigo },
            { codigo: codigoNuevo, nombre, descripcion, cargaHoraria, estado },
            { returnDocument: "after", runValidators: true }
        )
        res.json(materia)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                mensaje: "El código ya existe"
            })
        }
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Los datos de la materia no son válidos"
            })
        }
        console.error("Error al actualizar la materia: ", error)
        res.status(500).json({
            mensaje: "No se pudo actualizar la materia"
        })
    }
}

async function eliminarMateria(req, res) {
    try {
        const materia = await Materia.findOneAndDelete(
            { codigo: req.params.codigo }
        )
        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }
        res.json({ mensaje: "Materia eliminada correctamente" })
    } catch (error) {
        console.error("Error al eliminar la materia: ", error)
        res.status(500).json({
            mensaje: "No se pudo eliminar la materia"
        })
    }
}

module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
}