const API_URL = "http://localhost:3000/alumnos"

const formulario = document.querySelector("#formAlumno")
const mensaje = document.querySelector("#mensaje")
const listaAlumnos = document.querySelector("#listaAlumnos")

let alumnoEditandoLegajo = null

// Guardamos los datos que tenía el alumno antes de editar
let datosOriginales = null


// GUARDAR / EDITAR ALUMNO

formulario.addEventListener("submit", async function (event) {

    event.preventDefault()

    const legajoTexto = document.querySelector("#legajo").value.trim()
    const nombre = document.querySelector("#nombre").value.trim()
    const carrera = document.querySelector("#carrera").value.trim()
    const correo = document.querySelector("#correo").value.trim()


    // VALIDAR CAMPOS VACÍOS

    if (legajoTexto === "" || nombre === "" || carrera === "" || correo === "") {

        mostrarMensaje(
            "Todos los campos son obligatorios",
            "mje-error"
        )

        return
    }


    // VALIDAR LEGAJO

    const legajo = Number(legajoTexto)

    if (Number.isNaN(legajo)) {

        mostrarMensaje(
            "El legajo debe ser un número",
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


    // AGREGAR ALUMNO

    if (alumnoEditandoLegajo === null) {

        try {

            const respuesta = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ legajo, nombre, carrera, correo })
            })

            const datos = await respuesta.json()

            if (!respuesta.ok) {

                mostrarMensaje(
                    datos.mensaje || "No se pudo guardar el alumno",
                    "mje-error"
                )

                return
            }

            mostrarMensaje(
                "Alumno guardado correctamente",
                "mje-exito"
            )

        } catch (error) {

            mostrarMensaje(
                "No se pudo conectar con el servidor",
                "mje-error"
            )

            return
        }
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

        try {

            const respuesta = await fetch(`${API_URL}/${alumnoEditandoLegajo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, carrera, correo })
            })

            const datos = await respuesta.json()

            if (!respuesta.ok) {

                mostrarMensaje(
                    datos.mensaje || "No se pudo actualizar el alumno",
                    "mje-error"
                )

                return
            }

            mostrarMensaje(
                "Alumno actualizado correctamente",
                "mje-exito"
            )

        } catch (error) {

            mostrarMensaje(
                "No se pudo conectar con el servidor",
                "mje-error"
            )

            return
        }

        cancelarEdicion()
    }


    // LIMPIAR FORMULARIO

    formulario.reset()


    // REFRESCAR LISTA DESDE EL SERVIDOR

    await cargarAlumnos()

})


// OBTENER ALUMNOS DESDE EL SERVIDOR

async function obtenerAlumnos() {

    const respuesta = await fetch(API_URL)

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener los alumnos")
    }

    return respuesta.json()
}


// CARGAR Y MOSTRAR ALUMNOS

async function cargarAlumnos() {

    try {

        const alumnos = await obtenerAlumnos()

        mostrarAlumnos(alumnos)

    } catch (error) {

        mostrarMensaje(
            "No se pudo conectar con el servidor",
            "mje-error"
        )
    }
}


// MOSTRAR ALUMNOS EN LA TABLA

function mostrarAlumnos(alumnos) {

    listaAlumnos.innerHTML = ""


    for (const alumno of alumnos) {

        listaAlumnos.innerHTML += `

            <tr>

                <td>${alumno.legajo}</td>

                <td>${alumno.nombre}</td>

                <td>${alumno.carrera}</td>

                <td>${alumno.correo}</td>

                <td>

                    <button
                        class="btn-editar"
                        data-legajo="${alumno.legajo}"
                        title="Editar alumno">

                        <i class="fa-solid fa-pen"></i>

                    </button>


                    <button
                        class="btn-eliminar"
                        data-legajo="${alumno.legajo}"
                        title="Eliminar alumno">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

        `
    }
}


// ELIMINAR ALUMNO

async function eliminarAlumno(legajo) {

    try {

        const respuesta = await fetch(`${API_URL}/${legajo}`, {
            method: "DELETE"
        })

        const datos = await respuesta.json()

        if (!respuesta.ok) {

            mostrarMensaje(
                datos.mensaje || "No se pudo eliminar el alumno",
                "mje-error"
            )

            return
        }

        // SI ESTABA EDITANDO EL ALUMNO ELIMINADO

        if (alumnoEditandoLegajo === legajo) {

            cancelarEdicion()
        }

        mostrarMensaje(
            "Alumno eliminado correctamente",
            "mje-exito"
        )

        await cargarAlumnos()

    } catch (error) {

        mostrarMensaje(
            "No se pudo conectar con el servidor",
            "mje-error"
        )
    }
}


// BOTONES DE EDITAR Y ELIMINAR

listaAlumnos.addEventListener("click", async function (e) {


    // BOTÓN ELIMINAR

    const botonEliminar =
        e.target.closest(".btn-eliminar")


    if (botonEliminar) {

        const legajo =
            Number(botonEliminar.dataset.legajo)


        const confirmar = confirm(
            "¿Está seguro de eliminar este alumno?"
        )


        if (confirmar) {

            await eliminarAlumno(legajo)

        }

        return
    }


    // BOTÓN EDITAR

    const botonEditar =
        e.target.closest(".btn-editar")


    if (botonEditar) {

        const legajo =
            Number(botonEditar.dataset.legajo)


        await editarAlumno(legajo)

    }

})


// EDITAR ALUMNO

async function editarAlumno(legajo) {

    let alumno

    try {

        const respuesta = await fetch(`${API_URL}/${legajo}`)

        if (!respuesta.ok) {
            mostrarMensaje(
                "No se pudo obtener el alumno",
                "mje-error"
            )
            return
        }

        alumno = await respuesta.json()

    } catch (error) {

        mostrarMensaje(
            "No se pudo conectar con el servidor",
            "mje-error"
        )

        return
    }


    // Guardamos los datos originales

    datosOriginales = {
        nombre: alumno.nombre,
        carrera: alumno.carrera,
        correo: alumno.correo
    }


    // Cargamos los datos en el formulario (el legajo no se puede editar)

    document.querySelector("#legajo").value =
        alumno.legajo

    document.querySelector("#legajo").disabled = true


    document.querySelector("#nombre").value =
        alumno.nombre


    document.querySelector("#carrera").value =
        alumno.carrera


    document.querySelector("#correo").value =
        alumno.correo


    // Guardamos el legajo del alumno que estamos editando

    alumnoEditandoLegajo = legajo


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

    alumnoEditandoLegajo = null
    datosOriginales = null

    formulario.reset()

    document.querySelector("#legajo").disabled = false

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

cargarAlumnos()
