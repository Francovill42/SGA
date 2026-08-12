const formulario = document.querySelector("#forAlumno");
const mensaje = document.querySelector("#mensaje");
const listaAlumnos = document.querySelector("#listaAlumnos");
const alumnosCantidad = document.querySelector("#alumnosCantidad");

// Variable para saber si estamos editando
let alumnoEditandoId = null;


// GUARDAR / EDITAR ALUMNO
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const carrera = document.getElementById("carrera").value;
    const correo = document.getElementById("correo").value;

    const alumnitos = obtenerAlumnos();

    // SI ESTAMOS EDITANDO
    if (alumnoEditandoId !== null) {

        const alumno = alumnitos.find(
            alumno => alumno.id === alumnoEditandoId
        );

        if (alumno) {
            alumno.nombre = nombre;
            alumno.carrera = carrera;
            alumno.correo = correo;
        }

        localStorage.setItem(
            "alumnos",
            JSON.stringify(alumnitos)
        );

        mostrarMensaje("Alumno actualizado correctamente");

        mostrarAlumnos(alumnitos);

        formulario.reset();

        alumnoEditandoId = null;

        return;
    }


    // SI ESTAMOS AGREGANDO UN ALUMNO NUEVO
    const alumno = {
        id: Date.now(),
        nombre: nombre,
        carrera: carrera,
        correo: correo
    };

    alumnitos.push(alumno);

    localStorage.setItem(
        "alumnos",
        JSON.stringify(alumnitos)
    );

    mostrarMensaje("Alumno guardado correctamente");

    mostrarAlumnos(alumnitos);

    formulario.reset();
});


// OBTENER ALUMNOS
function obtenerAlumnos() {

    const datos = localStorage.getItem("alumnos");

    if (datos) {
        return JSON.parse(datos);
    }

    return [];
}


// MOSTRAR MENSAJE
function mostrarMensaje(texto) {

    mensaje.textContent = texto;

    setTimeout(() => {
        mensaje.textContent = "";
    }, 3000);
}


// MOSTRAR ALUMNOS
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


// ELIMINAR ALUMNO
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

    mostrarMensaje("Alumno eliminado correctamente");
}


// BOTONES EDITAR Y ELIMINAR
listaAlumnos.addEventListener("click", (e) => {

    // ELIMINAR
    if (e.target.classList.contains("btn-eliminar")) {

        const id = Number(e.target.dataset.id);

        eliminarAlumno(id);
    }


    // EDITAR
    if (e.target.classList.contains("btn-editar")) {

        const id = Number(e.target.dataset.id);

        editarAlumno(id);
    }
});


// EDITAR ALUMNO
function editarAlumno(id) {

    const alumnos = obtenerAlumnos();

    const alumno = alumnos.find(
        alumno => alumno.id === Number(id)
    );

    if (!alumno) {
        return;
    }

    document.getElementById("nombre").value = alumno.nombre;
    document.getElementById("carrera").value = alumno.carrera;
    document.getElementById("correo").value = alumno.correo;

    // Guardamos el ID del alumno que estamos editando
    alumnoEditandoId = alumno.id;
}


// MOSTRAR ALUMNOS AL CARGAR LA PÁGINA
mostrarAlumnos(obtenerAlumnos());