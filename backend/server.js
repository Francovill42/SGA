const express = require("express")

const app = express()
app.use(express.json())


const alumnos = [
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
]

// GET /alumnos


app.get("/alumnos", (req, res) => {
    res.json(alumnos)
})

// GET /alumnos/:id

app.get("/alumnos/:id", (req, res) => {

    const id = Number(req.params.id)

    const alumno = alumnos.find(a => a.id === id)

    res.json(alumno) 
}),

app.post("/alumnos",(req, res) => {
    const nuevoAlumno = req.body
    alumnos.push(nuevoAlumno)

    res.json({mensaje: "Alumno registrado correctamente"})
})

app.put("/alumnos/:id", (req, res) => {
    const id = Number(req.params.id)
    const alumno = alumnos.find(alumno => alumno.id === id)
    alumno.id = req.body.id
    alumno.nombre = req.body.nombre
    alumno.carrera = req.body.carrera
    res.json({mensaje: "Alumno actualizado correctamente mi REYYYYYYYYYYYYYYY"})
})


app.listen(3000, () => {
    console.log("Servidor funcionando en http://localhost:3000")
})

