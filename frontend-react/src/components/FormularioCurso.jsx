import { useState } from "react"
import { Alert, Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material"
import { useAuth } from "../context/useAuth"
import API_URL from "../../config/api"

const API_CURSOS = `${API_URL}/cursos`


const FORMULARIO_VACIO = {
    codigo: "",
    nombre: "",
    descripcion: "",
    cargaHoraria: "",
    estado: "activo"
}


function validar(datos) {
    const codigo = datos.codigo.trim()
    const nombre = datos.nombre.trim()
    const cargaHoraria = Number(datos.cargaHoraria)

    if (!codigo || !nombre) return "El código y el nombre son obligatorios"
    if (codigo.length > 20) return "El código no puede superar los 20 caracteres"
    if (nombre.length > 100) return "El nombre no puede superar los 100 caracteres"
    if (datos.descripcion !== "" && !datos.descripcion.trim()) {
        return "La descripción no puede tener solo espacios"
    }
    if (!Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
        return "La carga horaria debe ser un número entero mayor que cero"
    }
    if (datos.estado !== "activo" && datos.estado !== "inactivo") {
        return "El estado debe ser activo o inactivo"
    }

    return "" // todo correcto
}


function FormularioCurso({ onCursoCreado, cursoEditar, onCancelar }) {
    const { token } = useAuth()
    const editando = Boolean(cursoEditar)


    const [formulario, setFormulario] = useState({
        codigo: cursoEditar?.codigo ?? "",
        nombre: cursoEditar?.nombre ?? "",
        descripcion: cursoEditar?.descripcion ?? "",
        cargaHoraria: String(cursoEditar?.cargaHoraria ?? ""),
        estado: cursoEditar?.estado ?? "activo"
    })
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)


    function manejarCambio(e) {
        const { name, value } = e.target
        setFormulario({ ...formulario, [name]: value })
    }


    async function guardar(e) {
        e.preventDefault()
        setError("")


        const problema = validar(formulario)
        if (problema) {
            setError(problema)
            return
        }


        const url = editando
            ? `${API_CURSOS}/${encodeURIComponent(cursoEditar.codigo)}`
            : API_CURSOS

        setGuardando(true)

        try {

            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formulario,
                    cargaHoraria: Number(formulario.cargaHoraria)
                })
            })


            if (!respuesta.ok) {
                const datos = await respuesta.json()
                setError(datos.mensaje || `No se pudo guardar el curso (error ${respuesta.status})`)
                return
            }


            setFormulario(FORMULARIO_VACIO)
            onCursoCreado(editando ? "modificado" : "creado")
        } catch (error) {
            console.error("Error al guardar:", error)
            setError("No se pudo conectar con el servidor")
        } finally {
            setGuardando(false)
        }
    }


    let textoBoton = "Guardar"
    if (guardando) textoBoton = "Guardando..."
    else if (editando) textoBoton = "Guardar cambios"

    return (
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
                {editando ? "Editar curso" : "Nuevo curso"}
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
                <TextField name="codigo" label="Código" value={formulario.codigo}
                    onChange={manejarCambio} required fullWidth />

                <TextField name="nombre" label="Nombre" value={formulario.nombre}
                    onChange={manejarCambio} required fullWidth />

                <TextField name="descripcion" label="Descripción" value={formulario.descripcion}
                    onChange={manejarCambio} fullWidth />

                <TextField name="cargaHoraria" label="Carga horaria" value={formulario.cargaHoraria}
                    onChange={manejarCambio} required fullWidth />

                <TextField select name="estado" label="Estado" value={formulario.estado}
                    onChange={manejarCambio} required fullWidth>
                    <MenuItem value="activo">Activo</MenuItem>
                    <MenuItem value="inactivo">Inactivo</MenuItem>
                </TextField>


                <Box sx={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", gap: 1.5, mt: 1 }}>
                    <Button type="submit" variant="contained" disabled={guardando}>
                        {textoBoton}
                    </Button>


                    {editando && (
                        <Button type="button" variant="outlined" onClick={onCancelar} disabled={guardando}>
                            Cancelar
                        </Button>
                    )}
                </Box>

                {error && (
                    <Alert severity="error" sx={{ gridColumn: "1 / -1" }}>
                        {error}
                    </Alert>
                )}
            </Box>
        </Paper>
    )
}

export default FormularioCurso