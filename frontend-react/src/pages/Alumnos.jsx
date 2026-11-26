import { ListaAlumnos } from "../components/ListaAlumnos"
import { useState } from "react"
import FormularioA from "../components/FormularioA"
import { useAuth } from "../context/useAuth"

export default function Alumnos() {
const { esAdmin } = useAuth()
const [actualizar, setActualizar] = useState(0)
const [alumnoEditar, setAlumnoEditar] = useState(null)

function alumnoCreado() {
  setActualizar(valor => valor + 1)
  setAlumnoEditar(null)
}

function seleccionarAlumno(alumno) {
  setAlumnoEditar(alumno)
}

return (
   <>
   {esAdmin && (
     <FormularioA key={alumnoEditar?.legajo ?? "nuevo"}
     onAlumnoCreado={alumnoCreado}
     alumnoEditar={alumnoEditar}
     onCancelar={() => setAlumnoEditar(null)}
     />
   )}
   <ListaAlumnos 
   actualizar={actualizar} 
   onAlumnoCreado={alumnoCreado}
   onEditarAlumno={seleccionarAlumno} 
   /> 
  </>
  )
}