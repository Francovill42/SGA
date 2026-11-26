const express = require("express") 
// const alumnosController = require(
const { verificarToken, permitirRoles } = require("../middlewares/authMiddleware") // Importar los middlewares de token y de roles

const { 
    obtenerAlumnos, 
    obtenerAlumno, 
    crearAlumno, 
    actualizarAlumno, 
    eliminarAlumno } = require("../controllers/alumnos.controller")
const router = express.Router() 

router.get("/", verificarToken, obtenerAlumnos) // Ruta para obtener todos los alumnos, protegida por el middleware de verificación de token

router.get("/:id", verificarToken, obtenerAlumno) 

router.post("/", verificarToken, permitirRoles("admin"), crearAlumno) // Registrar, modificar y eliminar: solo admin

router.put("/:id", verificarToken, permitirRoles("admin"), actualizarAlumno) 

router.delete("/:id", verificarToken, permitirRoles("admin"), eliminarAlumno) 

module.exports = router 