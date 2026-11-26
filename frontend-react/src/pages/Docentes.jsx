import { ListaDocentes } from "../components/ListaDocentes"
import { useState } from "react"
import FormularioD from "../components/FormularioD"
import { useAuth } from "../context/useAuth"

export default function Docentes() {
const { esAdmin } = useAuth()
const [actualizar, setActualizar] = useState(0)
const [docenteEditar, setDocenteEditar] = useState(null)

function docenteCreado() {
  setActualizar(valor => valor + 1)
  setDocenteEditar(null)
}

function seleccionarDocente(alumno) {
  setDocenteEditar(alumno)
}

return (
   <>
   {esAdmin && (
     <FormularioD key={docenteEditar?.dni ?? "nuevo"}
     onDocenteCreado={docenteCreado}
     docenteEditar={docenteEditar}
     onCancelar={() => setDocenteEditar(null)}
     />
   )}
   <ListaDocentes 
   actualizar={actualizar} 
   onDocenteCreado={docenteCreado}
   onEditarDocente={seleccionarDocente} 
   /> 
  </>
  )
}