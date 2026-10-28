import { useState } from "react";
import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material"
const API_DOCENTES = "http://localhost:3000/docentes"

function FormularioD({ onDocenteCreado, docenteEditar, onCancelar, onAviso }){
    const [formulario, setFormulario] = useState({
        dni: String(docenteEditar?.dni ?? ""),
        nombre: docenteEditar?.nombre ?? "",
        especialidad: docenteEditar?.especialidad ?? "",
        correo: docenteEditar?.correo ?? ""
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

        const editando = Boolean(docenteEditar)
        const datos = {
            nombre: formulario.nombre.trim(),
            especialidad: formulario.especialidad.trim(),
            correo: formulario.correo.trim()
        }

        // Si está editando y no cambió nada, avisamos y no llamamos al servidor
        if (editando) {
            const sinCambios =
                datos.nombre === String(docenteEditar.nombre ?? "").trim() &&
                datos.especialidad === String(docenteEditar.especialidad ?? "").trim() &&
                datos.correo === String(docenteEditar.correo ?? "").trim()

            if (sinCambios) {
                onAviso("No se editó nada: no hiciste ningún cambio en el docente.", "warning")
                return
            }
        } else if (Number.isNaN(Number(formulario.dni))) {
            setError("El DNI debe ser un número")
            return
        }

        setGuardando(true)

        const url = editando
                    ? `${API_DOCENTES}/${docenteEditar.dni}`
                    : API_DOCENTES
        const cuerpo = editando
                    ? datos
                    : { ...datos, dni: Number(formulario.dni) }
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(cuerpo)
            })

            if (!respuesta.ok) {
                const detalle = await respuesta.json().catch(() => ({}))
                throw new Error(detalle.mensaje || `No se pudo guardar el docente. Estado HTTP: ${respuesta.status}`)
            }

            setFormulario({
                dni: "",
                nombre: "",
                especialidad: "",
                correo: ""
            })
            onDocenteCreado()
            onAviso(editando
                ? "Docente editado correctamente"
                : "Docente guardado correctamente")
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
                {docenteEditar ? "Editar docente" : "Nuevo Docente"}
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
                {!docenteEditar && (
                    <TextField
                        id="dni"
                        name="dni"
                        label="DNI"
                        value={formulario.dni}
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
                    id="especialidad"
                    name="especialidad"
                    label="Especialidad"
                    value={formulario.especialidad}
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
                            : docenteEditar
                                ? "Guardar cambios"
                                : "Guardar"}
                    </Button>
                    {docenteEditar && (
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
export default FormularioD