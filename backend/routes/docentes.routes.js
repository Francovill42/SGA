const express = require("express") 
const { verificarToken, permitirRoles } = require("../middlewares/authMiddleware") // Importar los middlewares de token y de roles
// const alumnosController = require("../controllers/alumnos.controller")
const { 
    obtenerDocentes, 
    obtenerDocente, 
    crearDocente, 
    actualizarDocente, 
    eliminarDocente } = require("../controllers/docentes.controller")
const router = express.Router() 

router.get("/", verificarToken, obtenerDocentes) 

router.get("/:id", verificarToken, obtenerDocente) 

router.post("/", verificarToken, permitirRoles("admin"), crearDocente) // Registrar, modificar y eliminar: solo admin

router.put("/:id", verificarToken, permitirRoles("admin"), actualizarDocente) 

router.delete("/:id", verificarToken, permitirRoles("admin"), eliminarDocente) 

module.exports = router 