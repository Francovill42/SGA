const express = require("express")
const { verificarToken, permitirRoles } = require("../middlewares/authMiddleware") // Importar los middlewares de token y de roles

const {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria } = require("../controllers/materias.controller")
const router = express.Router()

router.get("/", verificarToken, obtenerMaterias) // Consultar: cualquier usuario con sesión

router.get("/:codigo", verificarToken, obtenerMateria)

router.post("/", verificarToken, permitirRoles("admin"), crearMateria) // Registrar, modificar y eliminar: solo admin

router.put("/:codigo", verificarToken, permitirRoles("admin"), actualizarMateria)

router.delete("/:codigo", verificarToken, permitirRoles("admin"), eliminarMateria)

module.exports = router
