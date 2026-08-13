// ======================================================
// ELEMENTOS DEL HTML
// ======================================================

const formulario = document.querySelector("#forAlumno");
const mensaje = document.querySelector("#mensaje");
const listaAlumnos = document.querySelector("#listaAlumnos");
const alumnosCantidad = document.querySelector("#alumnosCantidad");


// ======================================================
// VARIABLE PARA SABER SI ESTAMOS EDITANDO
// ======================================================

let alumnoEditandoId = null;


// ======================================================
// GUARDAR / EDITAR ALUMNO
// ======================================================

formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const carrera = document.getElementById("carrera").value.trim();
    const correo = document.getElementById("correo").value.trim();


    // ==================================================
    // VALIDACIONES
    // ==================================================

    if (nombre === "" || carrera === "" || correo === "") {

        mostrarMensaje(
            "Todos los campos son obligatorios",
            "msj-error"
        );

        return;
    }


    if (nombre.length < 3) {

        mostrarMensaje(
            "El nombre debe tener al menos 3 caracteres",
            "msj-error"
        );

        return;
    }


    if (!correo.includes("@")) {

        mostrarMensaje(
            "Ingrese un correo electrónico válido",
            "msj-error"
        );

        return;
    }


    // Obtiene los alumnos guardados
    const alumnos = obtenerAlumnos();


    // ==================================================
    // EDITAR ALUMNO
    // ==================================================

    if (alumnoEditandoId !== null) {

        const alumno = alumnos.find(
            alumno => alumno.id === alumnoEditandoId
        );


        if (alumno) {

            alumno.nombre = nombre;
            alumno.carrera = carrera;
            alumno.correo = correo;

            localStorage.setItem(
                "alumnos",
                JSON.stringify(alumnos)
            );


            mostrarMensaje(
                "Alumno actualizado correctamente",
                "msj-exito"
            );


            mostrarAlumnos(alumnos);

            formulario.reset();

            alumnoEditandoId = null;

            formulario.querySelector("button").textContent =
                "Guardar Alumno";
        }

        return;
    }


    // ==================================================
    // CREAR NUEVO ALUMNO
    // ==================================================

    const alumno = {

        id: Date.now(),

        nombre: nombre,

        carrera: carrera,

        correo: correo
    };


    // Agrega el alumno
    alumnos.push(alumno);


    // Guarda en localStorage
    localStorage.setItem(
        "alumnos",
        JSON.stringify(alumnos)
    );


    // Muestra mensaje
    mostrarMensaje(
        "Alumno guardado correctamente",
        "msj-exito"
    );


    // Actualiza la tabla
    mostrarAlumnos(alumnos);


    // Limpia el formulario
    formulario.reset();

});


// ======================================================
// OBTENER ALUMNOS
// ======================================================

function obtenerAlumnos() {

    const datos = localStorage.getItem("alumnos");

    if (datos) {

        return JSON.parse(datos);
    }

    return [];
}


// ======================================================
// MOSTRAR MENSAJE
// ======================================================

function mostrarMensaje(texto, tipo) {

    mensaje.textContent = texto;

    mensaje.className = tipo;


    setTimeout(() => {

        mensaje.textContent = "";

        mensaje.className = "oculto";

    }, 3000);
}


// ======================================================
// MOSTRAR ALUMNOS
// ======================================================

function mostrarAlumnos(alumnos) {

    listaAlumnos.innerHTML = "";


    alumnosCantidad.textContent =
        `Cantidad de alumnos: ${alumnos.length}`;


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
                        data-id="${alumno.id}">
                        Editar
                    </button>

                    <button
                        class="btn-eliminar"
                        data-id="${alumno.id}">
                        Eliminar
                    </button>

                </td>

            </tr>
        `;
    }
}


// ======================================================
// ELIMINAR ALUMNO
// ======================================================

function eliminarAlumno(id) {

    const alumnos = obtenerAlumnos();


    const alumnosActualizados = alumnos.filter(
        alumno => alumno.id !== Number(id)
    );


    localStorage.setItem(
        "alumnos",
        JSON.stringify(alumnosActualizados)
    );


    mostrarAlumnos(alumnosActualizados);


    mostrarMensaje(
        "Alumno eliminado correctamente",
        "msj-exito"
    );
}


// ======================================================
// BOTONES EDITAR Y ELIMINAR
// ======================================================

listaAlumnos.addEventListener("click", (e) => {


    // ==================================================
    // ELIMINAR
    // ==================================================

    if (e.target.classList.contains("btn-eliminar")) {

        const id = Number(e.target.dataset.id);

        eliminarAlumno(id);
    }


    // ==================================================
    // EDITAR
    // ==================================================

    if (e.target.classList.contains("btn-editar")) {

        const id = Number(e.target.dataset.id);

        editarAlumno(id);
    }

});


// ======================================================
// EDITAR ALUMNO
// ======================================================

function editarAlumno(id) {

    const alumnos = obtenerAlumnos();


    const alumno = alumnos.find(
        alumno => alumno.id === Number(id)
    );


    if (!alumno) {
        return;
    }


    document.getElementById("nombre").value =
        alumno.nombre;

    document.getElementById("carrera").value =
        alumno.carrera;

    document.getElementById("correo").value =
        alumno.correo;


    alumnoEditandoId = alumno.id;


    formulario.querySelector("button").textContent =
        "Actualizar Alumno";
}


// ======================================================
// MOSTRAR ALUMNOS AL CARGAR LA PÁGINA
// ======================================================

mostrarAlumnos(obtenerAlumnos());