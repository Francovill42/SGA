
// Importamos Express
const express = require("express");

// Creamos un Router
const router = express.Router();


// Importamos las funciones del controller
const {
    obtenerAlumnos,
    obtenerAlumnoPorLegajo,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
} = require("../controllers/alumnoscontrollers");


// =====================================================
// GET /alumnos
// Obtener todos los alumnos
// =====================================================

router.get("/", obtenerAlumnos);


// =====================================================
// GET /alumnos/:legajo
// Obtener un alumno por su legajo
// =====================================================

router.get("/:legajo", obtenerAlumnoPorLegajo);


// =====================================================
// POST /alumnos
// Crear un nuevo alumno
// =====================================================

router.post("/", crearAlumno);


// =====================================================
// PUT /alumnos/:legajo
// Actualizar un alumno
// =====================================================

router.put("/:legajo", actualizarAlumno);


// =====================================================
// DELETE /alumnos/:legajo
// Eliminar un alumno
// =====================================================

router.delete("/:legajo", eliminarAlumno);


// =====================================================
// EXPORTAR ROUTER
// =====================================================

module.exports = router;