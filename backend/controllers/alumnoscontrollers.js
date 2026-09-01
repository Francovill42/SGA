let alumnos = [
    {
        id: 1,
        nombre: "Jose",
        carrera: "Programacion"
    },
    {
        id: 2,
        nombre: "Pablo",
        carrera: "Sistemas"
    },
    {
        id: 3,
        nombre: "Franco",
        carrera: "Programacion"
    },
    {
        id: 4,
        nombre: "Axel",
        carrera: "Analista de Sistemas"
    },
    {
        id: 5,
        nombre: "Lautaro",
        carrera: "Programacion"
    }
];

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

    const alumnoExiste = alumnos.some(alumno => alumno.id === id);

    if (!alumnoExiste) {
        return res.status(404).json({
            mensaje: "Alumno no encontrado"
        });
    }

    alumnos = alumnos.filter(alumno => alumno.id !== id);

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