const formulario = document.querySelector("#formAlumno")
const mensaje = document.querySelector("#mensaje")
const listaAlumnos = document.querySelector("#listaAlumnos")

let alumnoEditandoId = null

// Guardamos los datos que tenía el alumno antes de editar
let datosOriginales = null


// GUARDAR / EDITAR ALUMNO

formulario.addEventListener("submit", function (event) {

    event.preventDefault()

    const nombre = document.querySelector("#nombre").value.trim()
    const carrera = document.querySelector("#carrera").value.trim()
    const correo = document.querySelector("#correo").value.trim()


    // VALIDAR CAMPOS VACÍOS

    if (nombre === "" || carrera === "" || correo === "") {

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


    const alumnos = obtenerAlumnos()


    // AGREGAR ALUMNO

    if (alumnoEditandoId === null) {

        const alumno = {

            id: Date.now(),
            nombre: nombre,
            carrera: carrera,
            correo: correo

        }

        alumnos.push(alumno)

        mostrarMensaje(
            "Alumno guardado correctamente",
            "mje-exito"
        )

    }


    // EDITAR ALUMNO

    else {

        // Comparamos el objeto completo con los datos originales
        // en vez de campo por campo (más fácil de mantener)

        const datosNuevos = { nombre, carrera, correo }

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
            "¿Está seguro de actualizar este alumno?"
        )

        if (!confirmarEdicion) {
            return
        }


        const alumno = alumnos.find(
            alumno => alumno.id === alumnoEditandoId
        )


        if (alumno) {

            alumno.nombre = nombre
            alumno.carrera = carrera
            alumno.correo = correo

        }


        cancelarEdicion()


        mostrarMensaje(
            "Alumno actualizado correctamente",
            "mje-exito"
        )
    }


    // MOSTRAR ALUMNOS

    mostrarAlumnos(alumnos)


    // GUARDAR DATOS

    guardarDatos("alumnos", alumnos)


    // LIMPIAR FORMULARIO

    formulario.reset()

})


// OBTENER ALUMNOS

function obtenerAlumnos() {
    return obtenerDatos("alumnos")
}


// MOSTRAR ALUMNOS EN LA TABLA

function mostrarAlumnos(alumnos) {

    listaAlumnos.innerHTML = ""


    for (const alumno of alumnos) {

        listaAlumnos.innerHTML += `

            <tr>

                <td>${alumno.id}</td>

                <td>${alumno.nombre}</td>

                <td>${alumno.carrera}</td>

                <td>${alumno.correo}</td>

                <td>

                    <button
                        class="btn-editar"
                        data-id="${alumno.id}"
                        title="Editar alumno">

                        <i class="fa-solid fa-pen"></i>

                    </button>


                    <button
                        class="btn-eliminar"
                        data-id="${alumno.id}"
                        title="Eliminar alumno">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

        `
    }
}


// ELIMINAR ALUMNO

function eliminarAlumno(id) {

    const alumnos = obtenerAlumnos()


    const alumnosActualizados = alumnos.filter(
        alumno => alumno.id !== id
    )


    localStorage.setItem(
        "alumnos",
        JSON.stringify(alumnosActualizados)
    )


    mostrarAlumnos(alumnosActualizados)


    // SI ESTABA EDITANDO EL ALUMNO ELIMINADO

    if (alumnoEditandoId === id) {

        cancelarEdicion()
    }


    mostrarMensaje(
        "Alumno eliminado correctamente",
        "mje-exito"
    )
}


// BOTONES DE EDITAR Y ELIMINAR

listaAlumnos.addEventListener("click", function (e) {


    // BOTÓN ELIMINAR

    const botonEliminar =
        e.target.closest(".btn-eliminar")


    if (botonEliminar) {

        const id =
            Number(botonEliminar.dataset.id)


        const confirmar = confirm(
            "¿Está seguro de eliminar este alumno?"
        )


        if (confirmar) {

            eliminarAlumno(id)

        }

        return
    }


    // BOTÓN EDITAR

    const botonEditar =
        e.target.closest(".btn-editar")


    if (botonEditar) {

        const id =
            Number(botonEditar.dataset.id)


        editarAlumno(id)

    }

})


// EDITAR ALUMNO

function editarAlumno(id) {

    const alumnos = obtenerAlumnos()


    const alumno = alumnos.find(
        alumno => alumno.id === id
    )


    if (!alumno) {
        return
    }


    // Guardamos los datos originales

    datosOriginales = {
        nombre: alumno.nombre,
        carrera: alumno.carrera,
        correo: alumno.correo
    }


    // Cargamos los datos en el formulario

    document.querySelector("#nombre").value =
        alumno.nombre


    document.querySelector("#carrera").value =
        alumno.carrera


    document.querySelector("#correo").value =
        alumno.correo


    // Guardamos el ID del alumno que estamos editando

    alumnoEditandoId = id


    // Cambiamos el botón

    formulario.querySelector("button").textContent =
        "Actualizar Alumno"


    // Mostramos el botón de cancelar

    const botonCancelar = document.querySelector("#btnCancelar")

    if (botonCancelar) {
        botonCancelar.style.display = "inline-block"
    }


    document.querySelector("#nombre").focus()

}


// CANCELAR EDICIÓN

function cancelarEdicion() {

    alumnoEditandoId = null
    datosOriginales = null

    formulario.reset()

    formulario.querySelector("button").textContent =
        "Guardar Alumno"


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


// MOSTRAR ALUMNOS AL CARGAR LA PÁGINA

const alumnos = obtenerAlumnos()

mostrarAlumnos(alumnos)