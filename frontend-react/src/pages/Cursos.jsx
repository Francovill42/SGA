import { useState } from "react"
import { Alert } from "@mui/material"
import { ListaCursos } from "../components/ListaCursos"
import FormularioCurso from "../components/FormularioCurso"
import BuscarCurso from "../components/BuscarCurso"
import { useAuth } from "../context/useAuth"

export default function Cursos() {
    const { esAdmin } = useAuth()
    const [recargar, setRecargar] = useState(0)
    const [cursoEditar, setCursoEditar] = useState(null)
    const [mensaje, setMensaje] = useState("")

    function alGuardar(accion) {
        setRecargar(n => n + 1)
        setCursoEditar(null)
        setMensaje(accion ? `Curso ${accion} correctamente` : "")
    }

    function alEditar(curso) {
        setCursoEditar(curso)
        setMensaje("")
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <>
            {mensaje && <Alert severity="success" sx={{ mb: 3 }}>{mensaje}</Alert>}

            {esAdmin && (
                <FormularioCurso
                    key={cursoEditar?.codigo ?? "nuevo"}
                    cursoEditar={cursoEditar}
                    onCursoCreado={alGuardar}
                    onCancelar={() => setCursoEditar(null)}
                />
            )}

            <BuscarCurso onEditarCurso={alEditar} />
            <ListaCursos
                actualizar={recargar}
                onCursoCreado={alGuardar}
                onEditarCurso={alEditar}
            />
        </>
    )
}