//console.log("Inicio del programa");

//function obtenerAlumno() {
  //  return new Promise((resolve) => {
       // setTimeout(() => {
         //   console.log("Obteniendo alumnos...");
     //       resolve(["Ana", "Juan", "Pedro"]);
   //     }, 3000);
 //   });
//}

//obtenerAlumno().then((alumnos) => {
//    console.log(alumnos);
//});

//async function iniciar() {
  //  const alumnos = await obtenerAlumno();
  //  console.log(alumnos);
//}
//iniciar();

/*function obtenerClima() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Obteniendo clima...");
            resolve("Sol");
        }, 3000);
    });
}*/

//Con Then 
//obtenerClima().then((clima) => {
  //  console.log(clima);
//});

//Con Async/Await

/*async function mostrarClima() {
    const clima = await obtenerClima();
    console.log(clima);
}

mostrarClima();*/

/* function constultarSaldo() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Consultando saldo...");
            resolve(100000);
        }, 3000);
    });
}

async function mostrarSaldo() {
    const saldo = await constultarSaldo();
    console.log(`El saldo es: $${saldo}`);
}
mostrarSaldo(); */

/* function IniciarSesion() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Iniciando sesión...");
            resolve("Sesión iniciada");
        }, 3000);
    });
}

async function mostrarSesion() {
    const sesion = await IniciarSesion();
    console.log(sesion);
}
mostrarSesion(); */


/* function obtenerUsuariosrey() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Datos obtenidos mi rey...");
            resolve({
                id: 1,
                nombre: "rey",
                apellido: "francisco",
                edad: 30
            })
        }, 3000);
    });
}

async function mostrarUsuarios(){
    console.log("Consultando a la base de datos...");
    const usuarios = await obtenerUsuariosrey();
    console.log(usuarios);
}

mostrarUsuarios(); */

