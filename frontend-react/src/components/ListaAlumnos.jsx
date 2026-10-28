import { useEffect, useState } from "react"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
const API_ALUMNOS = "http://localhost:3000/alumnos"

export function ListaAlumnos({ actualizar, onAlumnoCreado, onEditarAlumno, onAviso }) {
    const [alumnos, setAlumnos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")
    const [busqueda, setBusqueda] = useState("")

    async function eliminarAlumno(legajo){
        const confirmar = window.confirm("¿Seguro que querés eliminar este alumno?")
        if (!confirmar) {
            return
        }
        try {
            const respuesta = await fetch(`${API_ALUMNOS}/${legajo}`, 
                { method: "DELETE" }
            )
            if (!respuesta.ok) {
                throw new Error(`No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            onAlumnoCreado()
            onAviso("Alumno eliminado correctamente")
        } catch (error) {
            console.error("Error al eliminar: ", error)
            onAviso(error.message || "No se pudo eliminar el alumno", "error")
        }
    }
    useEffect(() => {
        async function cargarAlumnos(){
            setCargando(true)
            setError("")

            try {
            const respuesta = await fetch(API_ALUMNOS)

            if (!respuesta.ok){
                throw new Error("No se pudo obtener la lista", respuesta.status)
            }

            const datos = await respuesta.json()
            setAlumnos(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de alumnos.")
        } finally {
            setCargando(false)
        }
    }
        cargarAlumnos()
    }, [actualizar])

    const termino = busqueda.trim()
    const filtrados = termino === ""
        ? alumnos
        : alumnos.filter(alumno => String(alumno.legajo).includes(termino))

    if (cargando) {
        return (
            <Paper component="section" elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 4 }}>
                <Typography color="text.secondary">Cargando alumnos...</Typography>
            </Paper>
        )
    }
    if (error) {
        return <Alert severity="error" role="alert">{error}</Alert>
    }
    return (
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                Alumnos
            </Typography>
            <TextField
                value={busqueda}
                onChange={e => setBusqueda(e.target.value.replace(/\D/g, ""))}
                placeholder="Buscar por legajo"
                size="small"
                fullWidth
                sx={{ mb: 2.5 }}
                slotProps={{
                    htmlInput: { inputMode: "numeric", "aria-label": "Buscar alumno por legajo" },
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: busqueda && (
                            <InputAdornment position="end">
                                <IconButton
                                    size="small"
                                    aria-label="Limpiar búsqueda"
                                    onClick={() => setBusqueda("")}
                                >
                                    <ClearIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
            />
            {filtrados.length === 0
                ? (
                    <Typography color="text.secondary">
                        {alumnos.length === 0
                            ? "No hay alumnos registrados."
                            : `No se encontraron alumnos con legajo ${termino}.`}
                    </Typography>
                )
                : (
                    <Stack
                        component="ul"
                        spacing={1.5}
                        sx={{ listStyle: "none", p: 0, m: 0 }}
                    >
                        {filtrados.map(alumno => (
                            <Paper
                                component="li"
                                key={alumno.legajo}
                                elevation={0}
                                sx={{
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
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                    sx={{ alignItems: "center", flexWrap: "wrap" }}
                                >
                                    <Chip label={`Legajo ${alumno.legajo}`} color="primary" variant="outlined" size="small" />
                                    <Box>
                                        <Typography fontWeight={600}>{alumno.nombre}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {alumno.carrera}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                                    <Button
                                        type="button"
                                        onClick={() => onEditarAlumno(alumno)}
                                        variant="outlined"
                                        size="small"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => eliminarAlumno(alumno.legajo)}
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                    >
                                        Eliminar
                                    </Button>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                )}
        </Paper>
    )
}