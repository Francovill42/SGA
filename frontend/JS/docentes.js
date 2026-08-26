const formulario = document.querySelector("#formDocente")
const mensaje = document.querySelector("#mensaje")
const listaDocentes = document.querySelector("#listaDocentes")

let docenteEditandoId = null

// Guardamos los datos originales del docente
let datosOriginales = null


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

        // Comparamos el objeto completo con los datos originales
        // en vez de campo por campo (más fácil de mantener)

        const datosNuevos = { nombre, especialidad, correo }

        const sinCambios =
            JSON.stringify(datosNuevos) === JSON.stringify(datosOriginales)

        if (sinCambios) {

            mostrarMensaje(
                "No realizaste ningún cambio",
                "mje-error"
            )

            return
        }


        // Confirmación antes de actualizar, igual que al eliminar

        const confirmarEdicion = confirm(
            "¿Está seguro de actualizar este docente?"
        )

        if (!confirmarEdicion) {
            return
        }


        const docente = docentes.find(
            docente => docente.id === docenteEditandoId
        )


        if (docente) {

            docente.nombre = nombre
            docente.especialidad = especialidad
            docente.correo = correo

        }


        cancelarEdicion()


        mostrarMensaje(
            "Docente actualizado correctamente",
            "mje-exito"
        )

    }


    // MOSTRAR DOCENTES

    mostrarDocentes(docentes)


    // GUARDAR DATOS

    guardarDatos("docentes", docentes)


    // LIMPIAR FORMULARIO

    formulario.reset()

})


// OBTENER DOCENTES

function obtenerDocentes() {
    return obtenerDatos("docentes")
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


    guardarDatos(
        "docentes",
        docentesActualizados
    )


    mostrarDocentes(docentesActualizados)


    // SI ESTABA EDITANDO EL DOCENTE ELIMINADO

    if (docenteEditandoId === id) {

        cancelarEdicion()
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

        return
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


    // GUARDAR LOS DATOS ORIGINALES

    datosOriginales = {

        nombre: docente.nombre,

        especialidad: docente.especialidad,

        correo: docente.correo

    }


    // CARGAR DATOS EN EL FORMULARIO

    document.querySelector("#nombreDocente").value =
        docente.nombre


    document.querySelector("#especialidad").value =
        docente.especialidad


    document.querySelector("#correo").value =
        docente.correo


    // GUARDAR EL ID DEL DOCENTE

    docenteEditandoId = id


    // CAMBIAR TEXTO DEL BOTÓN

    formulario.querySelector("button").textContent =
        "Actualizar Docente"


    // MOSTRAR EL BOTÓN DE CANCELAR

    const botonCancelar = document.querySelector("#btnCancelar")

    if (botonCancelar) {
        botonCancelar.style.display = "inline-block"
    }


    // LLEVAR EL CURSOR AL NOMBRE

    document.querySelector("#nombreDocente").focus()

}


// CANCELAR EDICIÓN

function cancelarEdicion() {

    docenteEditandoId = null
    datosOriginales = null

    formulario.reset()

    formulario.querySelector("button").textContent =
        "Guardar Docente"


    const botonCancelar = document.querySelector("#btnCancelar")

    if (botonCancelar) {
        botonCancelar.style.display = "none"
    }
}


// LISTENER DEL BOTÓN CANCELAR

const botonCancelar = document.querySelector("#btnCancelar")

if (botonCancelar) {

    botonCancelar.addEventListener("click", function () {

        cancelarEdicion()

        mostrarMensaje(
            "Edición cancelada",
            "mje-adv"
        )
    })
}


// MOSTRAR DOCENTES AL CARGAR LA PÁGINA

const docentes = obtenerDocentes()

mostrarDocentes(docentes)