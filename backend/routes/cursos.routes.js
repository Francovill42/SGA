const express = require("express")
const { verificarToken, permitirRoles } = require("../middlewares/authMiddleware")

const {
    obtenerCursos,
    obtenerCurso,
    crearCurso,
    actualizarCurso,
    eliminarCurso } = require("../controllers/cursoController")

const router = express.Router()

router.get("/", verificarToken, obtenerCursos)

router.get("/:id", verificarToken, obtenerCurso)

router.post("/", verificarToken, permitirRoles("admin"), crearCurso)

router.put("/:id", verificarToken, permitirRoles("admin"), actualizarCurso)

router.delete("/:id", verificarToken, permitirRoles("admin"), eliminarCurso)

module.exports = router