const formulario = document.querySelector("#formAlumno")
const mensaje = document.querySelector("#mensaje")
const listaAlumnos = document.querySelector("#listaAlumnos")

let alumnoEditandoId = null


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

        const alumno = alumnos.find(
            alumno => alumno.id === alumnoEditandoId
        )


        if (alumno) {

            alumno.nombre = nombre
            alumno.carrera = carrera
            alumno.correo = correo

        }


        alumnoEditandoId = null

        formulario.querySelector("button").textContent =
            "Guardar Alumno"


        mostrarMensaje(
            "Alumno actualizado correctamente",
            "mje-exito"
        )
    }


    // GUARDAR EN LOCALSTORAGE

    localStorage.setItem(
        "alumnos",
        JSON.stringify(alumnos)
    )


    // MOSTRAR ALUMNOS

    mostrarAlumnos(alumnos)


    // LIMPIAR FORMULARIO

    formulario.reset()

})


// OBTENER ALUMNOS

function obtenerAlumnos() {

    const datos = localStorage.getItem("alumnos")

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

        formulario.reset()

        alumnoEditandoId = null

        formulario.querySelector("button").textContent =
            "Guardar Alumno"
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


    document.querySelector("#nombre").value =
        alumno.nombre


    document.querySelector("#carrera").value =
        alumno.carrera


    document.querySelector("#correo").value =
        alumno.correo


    alumnoEditandoId = id


    formulario.querySelector("button").textContent =
        "Actualizar Alumno"


    document.querySelector("#nombre").focus()

}


// MOSTRAR ALUMNOS AL CARGAR LA PÁGINA

const alumnos = obtenerAlumnos()

mostrarAlumnos(alumnos)