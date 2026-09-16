const express = require("express")
const { obtenerAlumnos, obtenerAlumno, crearAlumno, actualizarAlumno, eliminarAlumno } = require("../controllers/alumnoscontrollers.js")
const router = express.Router()

router.get("/", obtenerAlumnos)

router.get("/:id", obtenerAlumno)

router.post("/", crearAlumno)

router.put("/:id", actualizarAlumno)

router.delete("/:id", eliminarAlumno)

module.exports = router