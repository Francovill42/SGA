import { useEffect, useState } from "react"
import { Alert, Box, Button, Chip, Paper, Stack, Typography } from "@mui/material"
import { useAuth } from "../context/useAuth"
import API_URL from "../../config/api"

const API_CURSOS = `${API_URL}/cursos`


const estiloCaja = {
    border: 1,
    borderColor: "divider",
    borderRadius: 3,
    p: 2.5
}

function TarjetaCurso({ curso, esAdmin, onEditar, onEliminar }) {
    return (
        <Paper
            component="li"
            elevation={0}
            sx={{
                ...estiloCaja,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2
            }}
        >
            
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <Chip label={curso.codigo} color="primary" variant="outlined" size="small" />
                <Box>
                    <Typography fontWeight={600}>{curso.nombre}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {curso.cargaHoraria} HS
                    </Typography>
                    {curso.descripcion && (
                        <Typography variant="body2" color="text.secondary">
                            {curso.descripcion}
                        </Typography>
                    )}
                </Box>
            </Stack>


            {esAdmin && (
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" size="small" onClick={() => onEditar(curso)}>
                        Editar
                    </Button>
                    <Button variant="outlined" color="error" size="small" onClick={() => onEliminar(curso.codigo)}>
                        Eliminar
                    </Button>
                </Stack>
            )}
        </Paper>
    )
}



export function ListaCursos({ actualizar, onCursoCreado, onEditarCurso }) {
    const { token, esAdmin, cerrarSesion } = useAuth()

    const [cursos, setCursos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    // Borrar un curso
    async function eliminarCurso(codigo) {
        if (!window.confirm("¿Seguro que querés eliminar este curso?")) return

        try {
            const respuesta = await fetch(`${API_CURSOS}/${encodeURIComponent(codigo)}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            })

            if (!respuesta.ok) {
                const datos = await respuesta.json()
                alert(datos.mensaje || `No se pudo eliminar (error ${respuesta.status})`)
                return
            }

            onCursoCreado("eliminado")
        } catch (error) {
            console.error("Error al eliminar:", error)
            alert("No se pudo conectar con el servidor")
        }
    }


    useEffect(() => {
        async function cargarCursos() {
            setCargando(true)
            setError("")

            try {
                const respuesta = await fetch(API_CURSOS, {
                    headers: { Authorization: `Bearer ${token}` }
                })


                if (respuesta.status === 401) {
                    cerrarSesion()
                    return
                }
                if (!respuesta.ok) {
                    throw new Error(`Error ${respuesta.status}`)
                }

                setCursos(await respuesta.json())
            } catch (error) {
                console.error("Error de conexión:", error)
                setError("No se pudo cargar la lista de cursos.")
            } finally {
                setCargando(false)
            }
        }

        cargarCursos()
    }, [actualizar, token, cerrarSesion])


    if (cargando) return <Typography color="text.secondary">Cargando cursos...</Typography>
    if (error) return <Alert severity="error">{error}</Alert>

    return (
        <Paper component="section" elevation={0} sx={{ ...estiloCaja, p: 3.5 }}>
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                Cursos
            </Typography>

            {cursos.length === 0 ? (
                <Typography color="text.secondary">No hay cursos registrados.</Typography>
            ) : (
                <Stack component="ul" spacing={1.5} sx={{ listStyle: "none", p: 0, m: 0 }}>
                    {cursos.map(curso => (
                        <TarjetaCurso
                            key={curso.codigo}
                            curso={curso}
                            esAdmin={esAdmin}
                            onEditar={onEditarCurso}
                            onEliminar={eliminarCurso}
                        />
                    ))}
                </Stack>
            )}
        </Paper>
    )
}