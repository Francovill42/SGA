import { useState } from "react";
import { Alert, Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material"
import { useAuth } from "../context/useAuth";
import API_URL from "../../config/api"

const API_MATERIAS = `${API_URL}/materias`

function FormularioMateria({ onMateriaCreada, materiaEditar, onCancelar }){
    const [formulario, setFormulario] = useState({
        codigo: materiaEditar?.codigo ?? "",
        nombre: materiaEditar?.nombre ?? "",
        descripcion: materiaEditar?.descripcion ?? "",
        cargaHoraria: String(materiaEditar?.cargaHoraria ?? ""),
        estado: materiaEditar?.estado ?? "activa"
    })
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)
    const { token } = useAuth()

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

        // Validaciones antes de enviar (el backend vuelve a validar)
        if (!formulario.codigo.trim() || !formulario.nombre.trim()) {
            setError("El código y el nombre son obligatorios")
            return
        }
        if (formulario.codigo.trim().length > 20) {
            setError("El código no puede superar los 20 caracteres")
            return
        }
        if (formulario.nombre.trim().length > 100) {
            setError("El nombre no puede superar los 100 caracteres")
            return
        }
        if (formulario.descripcion !== "" && !formulario.descripcion.trim()) {
            setError("La descripción no puede tener solo espacios")
            return
        }
        const cargaHoraria = Number(formulario.cargaHoraria)
        if (!Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
            setError("La carga horaria debe ser un número entero mayor que cero")
            return
        }
        if (formulario.estado !== "activa" && formulario.estado !== "inactiva") {
            setError("El estado debe ser activa o inactiva")
            return
        }

        setGuardando(true)

    const materia = {
        ...formulario,
        cargaHoraria
    }
    const editando = Boolean(materiaEditar)
    const url = editando
                ? `${API_MATERIAS}/${materiaEditar.codigo}`
                : API_MATERIAS
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(materia)
            })

            if (!respuesta.ok) {
                const datos = await respuesta.json()
                setError(datos.mensaje || `No se pudo guardar la materia. Estado HTTP: ${respuesta.status}`)
                return
            }

            setFormulario({
                codigo: "",
                nombre: "",
                descripcion: "",
                cargaHoraria: "",
                estado: "activa"
            })
            onMateriaCreada(editando ? "modificada" : "creada")
        } catch (error) {
            console.error("Error al guardar:", error)
            setError("No se pudo conectar con el servidor")
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
                {materiaEditar ? "Editar materia" : "Nueva Materia"}
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
                <TextField
                    id="codigo"
                    name="codigo"
                    label="Código"
                    value={formulario.codigo}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
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
                    id="descripcion"
                    name="descripcion"
                    label="Descripción"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                    fullWidth
                />
                <TextField
                    id="cargaHoraria"
                    name="cargaHoraria"
                    label="Carga horaria"
                    value={formulario.cargaHoraria}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <TextField
                    select
                    id="estado"
                    name="estado"
                    label="Estado"
                    value={formulario.estado}
                    onChange={manejarCambio}
                    required
                    fullWidth
                >
                    <MenuItem value="activa">Activa</MenuItem>
                    <MenuItem value="inactiva">Inactiva</MenuItem>
                </TextField>
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
                            : materiaEditar
                                ? "Guardar cambios"
                                : "Guardar"}
                    </Button>
                    {materiaEditar && (
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
export default FormularioMateria