const Curso = require("../models/Curso")

// Revisa los datos. Devuelve un mensaje si hay un problema, o "" si está todo bien.
function validarCurso({ codigo, nombre, descripcion, cargaHoraria, estado }, exigirCodigo) {
    if (exigirCodigo && (typeof codigo !== "string" || !codigo.trim())) {
        return "El código es obligatorio y debe ser texto"
    }
    if (typeof nombre !== "string" || !nombre.trim()) {
        return "El nombre es obligatorio y debe ser texto"
    }
    if (descripcion !== undefined && typeof descripcion !== "string") {
        return "La descripción debe ser texto"
    }
    if (!Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
        return "La carga horaria debe ser un número entero mayor que cero"
    }
    if (estado !== "activo" && estado !== "inactivo") {
        return "El estado debe ser activo o inactivo"
    }
    return ""
}

async function obtenerCursos(req, res) {
    const cursos = await Curso.find()
    res.json(cursos)
}

async function obtenerCurso(req, res) {
    const curso = await Curso.findOne({ codigo: req.params.id })
    if (!curso) {
        return res.status(404).json({ mensaje: "Curso no encontrado" })
    }
    res.json(curso)
}

async function crearCurso(req, res) {
    const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body

    const problema = validarCurso(req.body, true)
    if (problema) {
        return res.status(400).json({ mensaje: problema })
    }

    const existe = await Curso.findOne({ codigo })
    if (existe) {
        return res.status(400).json({ mensaje: "El código ya existe" })
    }

    const nuevoCurso = await Curso.create({
        codigo,
        nombre,
        descripcion,
        cargaHoraria,
        estado
    })
    res.status(201).json(nuevoCurso)
}

async function actualizarCurso(req, res) {
    const { nombre, descripcion, cargaHoraria, estado } = req.body

    const problema = validarCurso(req.body, false)
    if (problema) {
        return res.status(400).json({ mensaje: problema })
    }

    const curso = await Curso.findOneAndUpdate(
        { codigo: req.params.id },
        { nombre, descripcion, cargaHoraria, estado },
        { returnDocument: "after" }
    )

    if (!curso) {
        return res.status(404).json({ mensaje: "Curso no encontrado" })
    }
    res.json(curso)
}

async function eliminarCurso(req, res) {
    const curso = await Curso.findOneAndDelete({ codigo: req.params.id })

    if (!curso) {
        return res.status(404).json({ mensaje: "El curso no existe" })
    }
    res.json({ mensaje: "El curso se eliminó correctamente" })
}

module.exports = {
    obtenerCursos,
    obtenerCurso,
    crearCurso,
    actualizarCurso,
    eliminarCurso
}