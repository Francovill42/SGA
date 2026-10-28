import { useState } from "react";
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
const API_ALUMNOS = "http://localhost:3000/alumnos"

function FormularioA({ onAlumnoCreado, alumnoEditar, onCancelar, onAviso }){
    const [formulario, setFormulario] = useState({
        legajo: String(alumnoEditar?.legajo ?? ""),
        nombre: alumnoEditar?.nombre ?? "",
        carrera: alumnoEditar?.carrera ?? "",
        correo: alumnoEditar?.correo ?? ""
    })
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)

    function manejarCambio(e) {
        const { name, value} = e.target

        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    async function guardar(e) {
        e.preventDefault()
        setError("")

        const editando = Boolean(alumnoEditar)
        const datos = {
            nombre: formulario.nombre.trim(),
            carrera: formulario.carrera.trim(),
            correo: formulario.correo.trim()
        }

        // Si está editando y no cambió nada, avisamos y no llamamos al servidor
        if (editando) {
            const sinCambios =
                datos.nombre === String(alumnoEditar.nombre ?? "").trim() &&
                datos.carrera === String(alumnoEditar.carrera ?? "").trim() &&
                datos.correo === String(alumnoEditar.correo ?? "").trim()

            if (sinCambios) {
                onAviso("No se editó nada: no hiciste ningún cambio en el alumno.", "warning")
                return
            }
        } else if (Number.isNaN(Number(formulario.legajo))) {
            setError("El legajo debe ser un número")
            return
        }

        setGuardando(true)

        const url = editando
                    ? `${API_ALUMNOS}/${alumnoEditar.legajo}`
                    : API_ALUMNOS
        const cuerpo = editando
                    ? datos
                    : { ...datos, legajo: Number(formulario.legajo) }
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(cuerpo)
            })

            if (!respuesta.ok) {
                const detalle = await respuesta.json().catch(() => ({}))
                throw new Error(detalle.mensaje || `No se pudo guardar el alumno. Estado HTTP: ${respuesta.status}`)
            }

            setFormulario({
                legajo: "",
                nombre: "",
                carrera: "",
                correo: ""
            })
            onAlumnoCreado()
            onAviso(editando
                ? "Alumno editado correctamente"
                : "Alumno guardado correctamente")
        } catch (error) {
            console.error("Error al guardar:", error)
            setError(error.message || "No se pudo conectar con el servidor")
            onAviso(error.message || "No se pudo conectar con el servidor", "error")
        } finally {
            setGuardando(false)
        }
    }
    function cancelar(){
        onCancelar()
    }
    return(
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                mb: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                {alumnoEditar ? "Editar alumno" : "Nuevo Alumno"}
            </Typography>
            <Box
                component="form"
                onSubmit={guardar}
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                    gap: 2
                }}
            >
                {!alumnoEditar && (
                    <TextField
                        id="legajo"
                        name="legajo"
                        label="Legajo"
                        value={formulario.legajo}
                        onChange={manejarCambio}
                        required
                        fullWidth
                    />
                )}
                <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <TextField
                    id="carrera"
                    name="carrera"
                    label="Carrera"
                    value={formulario.carrera}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <TextField
                    id="correo"
                    name="correo"
                    label="Correo"
                    value={formulario.correo}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <Box
                    sx={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        justifyContent: "flex-end",
                        flexWrap: "wrap",
                        gap: 1.5,
                        mt: 1
                    }}
                >
                    <Button type="submit" variant="contained" disabled={guardando}>
                        {guardando
                            ? "Guardando..."
                            : alumnoEditar
                                ? "Guardar cambios"
                                : "Guardar"}
                    </Button>
                    {alumnoEditar && (
                        <Button
                            type="button"
                            onClick={cancelar}
                            disabled={guardando}
                            variant="outlined"
                        >
                            Cancelar
                        </Button>
                    )}
                </Box>
                {error && (
                    <Alert severity="error" role="alert" sx={{ gridColumn: "1 / -1" }}>
                        {error}
                    </Alert>
                )}
            </Box>
        </Paper>
    )
}
export default FormularioA