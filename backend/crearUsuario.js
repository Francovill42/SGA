const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
require("dotenv").config()

const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"]) // Igual que en server.js: evita el error querySrv ECONNREFUSED

const Usuario = require("./models/Usuario")

const usuariosDePrueba = [
    {
        nombre: "Administrador de prueba",
        email: "admin@sga.com",
        password: "ClaveDePrueba123!",
        rol: "admin"
    },
    {
        nombre: "Usuario de prueba",
        email: "usuario@sga.com",
        password: "ClaveDePrueba123!",
        rol: "usuario"
    }
]

async function crearUsuarios() {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        for (const datos of usuariosDePrueba) {
            const existe = await Usuario.findOne({ email: datos.email })

            if (existe) {
                console.log("Ya existe, se omite:", datos.email)
                continue
            }
            const hash = await bcrypt.hash(datos.password, 10)

            await Usuario.create({ ...datos, password: hash }) // Guardar el usuario en la base de datos

            console.log("Usuario creado:", datos.email, "| rol:", datos.rol)
        }
    } catch (error) {
        console.error("Error al crear los usuarios: ", error.message)
    } finally {
        await mongoose.disconnect()
    }
}

crearUsuarios()
