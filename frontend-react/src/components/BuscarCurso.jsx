import { useState } from "react"
import { Alert, Box, Button, Chip, Paper, Stack, TextField, Typography } from "@mui/material"
import { useAuth } from "../context/useAuth"
import API_URL from "../../config/api"

const API_CURSOS = `${API_URL}/cursos`


export default function BuscarCurso({ onEditarCurso }) {
    const [codigo, setCodigo] = useState("")
    const [curso, setCurso] = useState(null)
    const [error, setError] = useState("")
    const [buscando, setBuscando] = useState(false)
    const { token, esAdmin, cerrarSesion } = useAuth()

    async function buscar(e) {
        e.preventDefault()
        setError("")
        setCurso(null)

        if (!codigo.trim()) {
            setError("Ingresá el código del curso que querés consultar")
            return
        }

        setBuscando(true)
        try {
            const respuesta = await fetch(`${API_CURSOS}/${encodeURIComponent(codigo.trim())}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (respuesta.status === 401) { 
                cerrarSesion()
                return
            }
            if (!respuesta.ok) {
                const datos = await respuesta.json()
                setError(datos.mensaje || `No se pudo consultar el curso. Estado HTTP: ${respuesta.status}`)
                return
            }

            setCurso(await respuesta.json())
        } catch (error) {
            console.error("Error al consultar:", error)
            setError("No se pudo conectar con el servidor")
        } finally {
            setBuscando(false)
        }
    }

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
                Consultar curso por código
            </Typography>
            <Box
                component="form"
                onSubmit={buscar}
                sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}
            >
                <TextField
                    id="codigoBusqueda"
                    label="Código"
                    value={codigo}
                    onChange={e => setCodigo(e.target.value)}
                    sx={{ flex: "1 1 220px" }}
                />
                <Button type="submit" variant="contained" disabled={buscando}>
                    {buscando ? "Buscando..." : "Buscar"}
                </Button>
            </Box>
            {error && (
                <Alert severity="error" role="alert" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
            {curso && (
                <Paper
                    elevation={0}
                    sx={{
                        mt: 2,
                        p: { xs: 2, sm: 2.5 },
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 3,
                        display: "flex",
                        alignItems: { xs: "stretch", sm: "center" },
                        justifyContent: "space-between",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2
                    }}
                >
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", flexWrap: "wrap" }}>
                        <Chip label={curso.codigo} color="primary" variant="outlined" size="small" />
                        <Box>
                            <Typography fontWeight={600}>{curso.nombre}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {curso.cargaHoraria} hs - {curso.estado}
                            </Typography>
                            {curso.descripcion && (
                                <Typography variant="body2" color="text.secondary">
                                    {curso.descripcion}
                                </Typography>
                            )}
                        </Box>
                    </Stack>
                    {esAdmin && (
                        <Button
                            type="button"
                            variant="outlined"
                            size="small"
                            onClick={() => onEditarCurso(curso)}
                        >
                            Editar
                        </Button>
                    )}
                </Paper>
            )}
        </Paper>
    )
}