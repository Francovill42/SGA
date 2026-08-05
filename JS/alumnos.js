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
