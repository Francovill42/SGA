const formulario = document.querySelector("#formDocente")
const mensaje = document.querySelector("#mensajeDocente")
const listaDocentes = document.querySelector("#listaDocentes")

let docenteEditandoId = null


// GUARDAR / EDITAR DOCENTE

formulario.addEventListener("submit", function (event) {

    event.preventDefault()


    const nombre =
        document.querySelector("#nombreDocente").value.trim()

    const especialidad =
        document.querySelector("#especialidad").value.trim()

    const correo =
        document.querySelector("#correo").value.trim()


    // VALIDAR CAMPOS VACÍOS

    if (
        nombre === "" ||
        especialidad === "" ||
        correo === ""
    ) {

        mostrarMensaje(
            "Todos los campos son obligatorios",
            "mje-error"
        )

        return
    }


    // VALIDAR CORREO

    if (!correo.includes("@")) {

        mostrarMensaje(
            "Ingrese un correo electrónico válido",
            "mje-error"
        )

        return
    }


    // VALIDAR NOMBRE

    if (nombre.length < 3) {

        mostrarMensaje(
            "El nombre debe tener al menos 3 caracteres",
            "mje-error"
        )

        return
    }


    const docentes = obtenerDocentes()


    // AGREGAR DOCENTE

    if (docenteEditandoId === null) {

        const docente = {

            id: Date.now(),
            nombre: nombre,
            especialidad: especialidad,
            correo: correo

        }

        docentes.push(docente)


        mostrarMensaje(
            "Docente guardado correctamente",
            "mje-exito"
        )

    }


    // EDITAR DOCENTE

    else {

        const docente = docentes.find(
            docente => docente.id === docenteEditandoId
        )


        if (docente) {

            docente.nombre = nombre
            docente.especialidad = especialidad
            docente.correo = correo

        }


        docenteEditandoId = null


        formulario.querySelector("button").textContent =
            "Guardar Docente"


        mostrarMensaje(
            "Docente actualizado correctamente",
            "mje-exito"
        )

    }


    // GUARDAR EN LOCALSTORAGE

    localStorage.setItem(
        "docentes",
        JSON.stringify(docentes)
    )


    // MOSTRAR DOCENTES

    mostrarDocentes(docentes)


    // LIMPIAR FORMULARIO

    formulario.reset()

})


// OBTENER DOCENTES

function obtenerDocentes() {

    const datos =
        localStorage.getItem("docentes")


    if (datos) {

        return JSON.parse(datos)

    }

    return []
}


// MOSTRAR MENSAJES

function mostrarMensaje(texto, tipo) {

    mensaje.textContent = texto

    mensaje.className = tipo


    setTimeout(() => {

        mensaje.textContent = ""

        mensaje.className = "oculto"

    }, 3000)

}


// MOSTRAR DOCENTES EN LA TABLA

function mostrarDocentes(docentes) {

    listaDocentes.innerHTML = ""


    for (const docente of docentes) {

        listaDocentes.innerHTML += `

            <tr>

                <td>${docente.id}</td>

                <td>${docente.nombre}</td>

                <td>${docente.especialidad}</td>

                <td>${docente.correo}</td>

                <td>

                    <button
                        class="btn-editar"
                        data-id="${docente.id}"
                        title="Editar docente">

                        <i class="fa-solid fa-pen"></i>

                    </button>


                    <button
                        class="btn-eliminar"
                        data-id="${docente.id}"
                        title="Eliminar docente">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

        `
    }
}


// ELIMINAR DOCENTE

function eliminarDocente(id) {

    const docentes = obtenerDocentes()


    const docentesActualizados = docentes.filter(
        docente => docente.id !== id
    )


    localStorage.setItem(
        "docentes",
        JSON.stringify(docentesActualizados)
    )


    mostrarDocentes(docentesActualizados)


    // SI ESTABA EDITANDO EL DOCENTE ELIMINADO

    if (docenteEditandoId === id) {

        formulario.reset()

        docenteEditandoId = null

        formulario.querySelector("button").textContent =
            "Guardar Docente"

    }


    mostrarMensaje(
        "Docente eliminado correctamente",
        "mje-exito"
    )
}


// BOTONES DE EDITAR Y ELIMINAR

listaDocentes.addEventListener("click", function (e) {


    // BOTÓN ELIMINAR

    const botonEliminar =
        e.target.closest(".btn-eliminar")


    if (botonEliminar) {

        const id =
            Number(botonEliminar.dataset.id)


        const confirmar = confirm(
            "¿Está seguro de eliminar este docente?"
        )


        if (confirmar) {

            eliminarDocente(id)

        }

    }


    // BOTÓN EDITAR

    const botonEditar =
        e.target.closest(".btn-editar")


    if (botonEditar) {

        const id =
            Number(botonEditar.dataset.id)


        editarDocente(id)

    }

})


// EDITAR DOCENTE

function editarDocente(id) {

    const docentes = obtenerDocentes()


    const docente = docentes.find(
        docente => docente.id === id
    )


    if (!docente) {
        return
    }


    document.querySelector("#nombreDocente").value =
        docente.nombre


    document.querySelector("#especialidad").value =
        docente.especialidad


    document.querySelector("#correo").value =
        docente.correo


    docenteEditandoId = id


    formulario.querySelector("button").textContent =
        "Actualizar Docente"


    document.querySelector("#nombreDocente").focus()

}


// MOSTRAR DOCENTES AL CARGAR LA PÁGINA

const docentes = obtenerDocentes()

mostrarDocentes(docentes)