/* const alumnos = [
    {id: 1, nombre: "Ana", edad: 20 },
    {id: 2, nombre: "Juan", edad: 22 },
    {id: 3, nombre: "Pedro", edad: 21 }
];

function obtenerAlumno() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Obteniendo alumnos...");
            resolve(alumnos);
        }, 2000);
    });
}

async function iniciar() {
    const alumnos = await obtenerAlumno();
    console.table(alumnos);
}
iniciar(); */
/* 

const materias = [
    {id: 1, nombre: "Matemáticas", profesor: "Dr. Smith" },
    {id: 2, nombre: "Historia", profesor: "Prof. Johnson" },
    {id: 3, nombre: "Ciencias", profesor: "Dr. Brown" }
];

function obtenerMaterias() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Obteniendo materias...");
            resolve(materias);
        }, 2000);
    });
}


async function materiasObtenidas() {
    const materias = await obtenerMaterias();
    console.table(materias);
}
materiasObtenidas();

const Docentes = [
    {id: 1, nombre: "Dr. Smith", materia: "Matemáticas" },
    {id: 2, nombre: "Prof. Johnson", materia: "Historia" },
    {id: 3, nombre: "Dr. Brown", materia: "Ciencias" }
];

function Docentesescolares(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Obteniendo docentes de la escuela...");
            resolve(Docentes);
        }, 2000);
    });
}


async function docentesObtenidos() {
    const docentes = await Docentesescolares();
    console.table(docentes);
}
docentesObtenidos();
 */

/* 
fetch("https://jsonplaceholder.typicode.com/users").then((response)=>{
    return response.json();
}).then((data)=>{
    console.log(data);
}).catch((error)=>{
    console.log("Error al obtener los datos: ", error);
}); */

/* async function obtenerAlumnos() {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    const alumnos = await respuesta.json();
    return alumnos
}

function obtener(alumnos) {
    console.table(alumnos);
    /* console.log(alumnos[1].name); */
    /*  for(const alumno of alumnos.slice(0, 5)) {
        console.log(alumno.name, alumno.email, alumno.phone, alumno.id);
    } */
/* }

async function iniciar() {
    const alumnos = await obtenerAlumnos();
    obtener(alumnos);
}
iniciar(); */ 


//traer posts
//traer comentarios
//id, title, body

//POSTS

/* async function obtenerPosts() {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await respuesta.json();
    return posts
}

function mostrarPosts(posts) {
    console.table({
        id: posts[0].id,
        title: posts[0].title,
        body: posts[0].body
    });
}

async function iniciarPosts() {
    const posts = await obtenerPosts();
    mostrarPosts(posts);
}
iniciarPosts();
 */


//COMENTARIOS

/* async function obtenerComentarios() {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/comments");
    const comentarios = await respuesta.json();
    return comentarios
}

function mostrarComentarios(comentarios) {
    console.table({
        id: comentarios[0].id,
        name: comentarios[0].name,
        email: comentarios[0].email,
        body: comentarios[0].body
    });
}

async function iniciarComentarios() {
    const comentarios = await obtenerComentarios();
    mostrarComentarios(comentarios);
}   

iniciarComentarios(); */