import { ListaAlumnos } from "../components/ListaAlumnos"
import { useState } from "react"
import FormularioA from "../components/FormularioA"
import Aviso from "../components/Aviso"

export default function Alumnos() {
const [actualizar, setActualizar] = useState(0)
const [alumnoEditar, setAlumnoEditar] = useState(null)
const [aviso, setAviso] = useState({ abierto: false, mensaje: "", severity: "success", id: 0 })

function mostrarAviso(mensaje, severity = "success") {
  setAviso(previo => ({ abierto: true, mensaje, severity, id: previo.id + 1 }))
}

function cerrarAviso() {
  setAviso(previo => ({ ...previo, abierto: false }))
}

function alumnoCreado() {
  setActualizar(valor => valor + 1)
  setAlumnoEditar(null)
}

function seleccionarAlumno(alumno) {
  setAlumnoEditar(alumno)
}

return (
   <>
   <Aviso
   key={aviso.id}
   abierto={aviso.abierto}
   mensaje={aviso.mensaje}
   severity={aviso.severity}
   onCerrar={cerrarAviso}
   />
   <FormularioA key={alumnoEditar?.legajo ?? "nuevo"}
   onAlumnoCreado={alumnoCreado}
   alumnoEditar={alumnoEditar}
   onCancelar={() => setAlumnoEditar(null)}
   onAviso={mostrarAviso}
   />
   <ListaAlumnos 
   actualizar={actualizar} 
   onAlumnoCreado={alumnoCreado}
   onEditarAlumno={seleccionarAlumno} 
   onAviso={mostrarAviso}
   /> 
  </>
  )
}
