const express = require("express");

const router = express.Router();

const {
    obtenerAlumnos,
    obtenerAlumnoPorId,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
} = require("../controllers/alumnoscontrollers");

// GET /alumnos
router.get("/", obtenerAlumnos);

// GET /alumnos/:id
router.get("/:id", obtenerAlumnoPorId);

// POST /alumnos
router.post("/", crearAlumno);

// PUT /alumnos/:id
router.put("/:id", actualizarAlumno);

// DELETE /alumnos/:id
router.delete("/:id", eliminarAlumno);

module.exports = router;