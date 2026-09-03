const alumnos = require('../data/alumnos');
// GET /alumnos
function obtenerAlumnos(req, res) {
    res.json(alumnos);
}

// GET /alumnos/:id
function obtenerAlumnoPorId(req, res) {

    const id = Number(req.params.id);

    const alumno = alumnos.find(alumno => alumno.id === id);

    if (!alumno) {
        return res.status(404).json({
            mensaje: "Alumno no encontrado"
        });
    }

    res.json(alumno);
}

// POST /alumnos
function crearAlumno(req, res) {

    const nuevoAlumno = req.body;
    const { id, nombre, carrera } = nuevoAlumno;

    // Verificar que los campos existan
    if (id === undefined || nombre === undefined || carrera === undefined) {
        return res.status(400).json({
            mensaje: "Faltan datos del alumno"
        });
    }

    // Verificar tipos
    if (
        typeof id !== "number" ||
        typeof nombre !== "string" ||
        typeof carrera !== "string"
    ) {
        return res.status(400).json({
            mensaje: "Tipo de dato incorrecto"
        });
    }

    // Verificar campos vacíos
    if (
        nombre.trim() === "" ||
        carrera.trim() === ""
    ) {
        return res.status(400).json({
            mensaje: "Los campos no pueden estar vacíos"
        });
    }

    alumnos.push(nuevoAlumno);

    res.status(201).json({
        mensaje: "Alumno registrado correctamente",
        alumno: nuevoAlumno
    });
}

// PUT /alumnos/:id
function actualizarAlumno(req, res) {

    const id = Number(req.params.id);

    const alumno = alumnos.find(alumno => alumno.id === id);

    if (!alumno) {
        return res.status(404).json({
            mensaje: "Alumno no encontrado"
        });
    }

    alumno.nombre = req.body.nombre;
    alumno.carrera = req.body.carrera;

    res.json({
        mensaje: "Alumno actualizado correctamente",
        alumno: alumno
    });
}

// DELETE /alumnos/:id
function eliminarAlumno(req, res) {

    const id = Number(req.params.id);

    const indice = alumnos.findIndex(alumno => alumno.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Alumno no encontrado"
        });
    }

    alumnos.splice(indice, 1);

    res.json({
        mensaje: "Alumno eliminado correctamente"
    });
}

module.exports = {
    obtenerAlumnos,
    obtenerAlumnoPorId,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
};