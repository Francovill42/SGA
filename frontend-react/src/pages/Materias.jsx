import { ListaMaterias } from "../components/ListaMaterias"
import { useState } from "react"
import { Alert } from "@mui/material"
import FormularioMateria from "../components/FormularioMateria"
import { useAuth } from "../context/useAuth"

export default function Materias() {
  const { esAdmin } = useAuth()
  const [actualizar, setActualizar] = useState(0)
  const [materiaEditar, setMateriaEditar] = useState(null)
  const [mensaje, setMensaje] = useState("")

  function materiaCreada(accion) {
    setActualizar(valor => valor + 1)
    setMateriaEditar(null)
    setMensaje(accion ? `Materia ${accion} correctamente` : "")
  }

  function seleccionarMateria(materia) {
    setMateriaEditar(materia)
    setMensaje("")
  }

  return (
    <>
      {mensaje && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {mensaje}
        </Alert>
      )}
      {esAdmin && (
        <FormularioMateria key={materiaEditar?.codigo ?? "nueva"}
          onMateriaCreada={materiaCreada}
          materiaEditar={materiaEditar}
          onCancelar={() => setMateriaEditar(null)}
        />
      )}
      <ListaMaterias
        actualizar={actualizar}
        onMateriaCreada={materiaCreada}
        onEditarMateria={seleccionarMateria}
      />
    </>
  )
}
