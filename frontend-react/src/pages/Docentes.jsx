import { ListaDocentes } from "../components/ListaDocentes"
import { useState } from "react"
import FormularioD from "../components/FormularioD"
import Aviso from "../components/Aviso"

export default function Docentes() {
const [actualizar, setActualizar] = useState(0)
const [docenteEditar, setDocenteEditar] = useState(null)
const [aviso, setAviso] = useState({ abierto: false, mensaje: "", severity: "success", id: 0 })

function mostrarAviso(mensaje, severity = "success") {
  setAviso(previo => ({ abierto: true, mensaje, severity, id: previo.id + 1 }))
}

function cerrarAviso() {
  setAviso(previo => ({ ...previo, abierto: false }))
}

function docenteCreado() {
  setActualizar(valor => valor + 1)
  setDocenteEditar(null)
}

function seleccionarDocente(docente) {
  setDocenteEditar(docente)
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
   <FormularioD key={docenteEditar?.dni ?? "nuevo"}
   onDocenteCreado={docenteCreado}
   docenteEditar={docenteEditar}
   onCancelar={() => setDocenteEditar(null)}
   onAviso={mostrarAviso}
   />
   <ListaDocentes 
   actualizar={actualizar} 
   onDocenteCreado={docenteCreado}
   onEditarDocente={seleccionarDocente} 
   onAviso={mostrarAviso}
   /> 
  </>
  )
}
