const express = require("express")
const router = express.Router()

const { verificarToken } = require("../middlewares/authMiddleware")
const { login, perfil } = require("../controllers/authController")

router.post("/login", login)

router.get("/me", verificarToken, perfil) // Devuelve los datos del usuario del token (para recuperar la sesión)

module.exports = router
