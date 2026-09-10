// Importamos el modelo Alumno desde la carpeta models.
// "Alumno" representa nuestra colección de alumnos en MongoDB.
const Alumno = require('../models/Alumno');

// =====================================================
// GET /alumnos
// Obtener todos los alumnos
// =====================================================

async function obtenerAlumnos(req, res) {

    try {

        // .find() busca todos los alumnos que existen
        // dentro de la colección de MongoDB.
        //
        // await espera a que MongoDB termine la búsqueda
        // antes de continuar con la siguiente línea.
        const alumnos = await Alumno.find();

        // Enviamos los alumnos encontrados al cliente
        // en formato JSON.
        res.json(alumnos);

    } catch (error) {

        // Si ocurre algún error con MongoDB,
        // devolvemos un error 500.
        res.status(500).json({
            mensaje: "Error al obtener los alumnos"
        });
    }
}


// =====================================================
// GET /alumnos/:legajo
// Obtener un alumno por su legajo
// =====================================================

async function obtenerAlumnoPorLegajo(req, res) {

    try {

        // req.params.legajo obtiene el "legajo"
        // que viene en la URL.
        //
        // Por ejemplo:
        //
        // GET /alumnos/1002
        //
        // req.params.legajo sería "1002".
        //
        // Number() lo convierte de String a Number.
        const legajo = Number(req.params.legajo);


        // Buscamos dentro de MongoDB un alumno
        // cuyo legajo sea igual al que recibimos.
        //
        // findOne() devuelve un solo alumno.
        const alumno = await Alumno.findOne({
            legajo: legajo
        });


        // Si no encontramos ningún alumno...
        //
        // findOne() devuelve null cuando
        // no encuentra ningún documento.
        if (!alumno) {

            // 404 significa "No encontrado".
            return res.status(404).json({

                mensaje: "Alumno no encontrado"
            });
        }


        // Si encontramos al alumno,
        // lo enviamos como respuesta.
        res.json(alumno);

    } catch (error) {

        // Si ocurre un error con MongoDB,
        // devolvemos un error 500.
        res.status(500).json({
            mensaje: "Error al buscar el alumno"
        });
    }
}

// =====================================================
// POST /alumnos
// Crear un nuevo alumno
// =====================================================

async function crearAlumno(req, res) {

    try {

        // req.body contiene los datos que el cliente
        // envió en el cuerpo de la petición.
        //
        // Por ejemplo:
        //
        // {
        //     "legajo": 1002,
        //     "nombre": "Juancruz",
        //     "carrera": "Legislacion",
        //     "correo": "Juancruz@gmail.com"
        // }
        const nuevoAlumno = req.body;


        // Desestructuración.
        //
        // Sacamos las propiedades legajo, nombre,
        // carrera y correo del objeto nuevoAlumno.
        const { legajo, nombre, carrera, correo } = nuevoAlumno;


        // =================================================
        // Verificar que los campos existan
        // =================================================

        // Comprobamos que legajo, nombre, carrera
        // y correo hayan sido enviados.
        if (
            legajo === undefined ||
            nombre === undefined ||
            carrera === undefined ||
            correo === undefined
        ) {

            // 400 significa que la petición
            // enviada por el cliente es incorrecta.
            return res.status(400).json({

                mensaje: "Faltan datos del alumno"
            });
        }


        // =================================================
        // Verificar tipos de datos
        // =================================================

        // typeof nos permite saber qué tipo de dato tenemos.
        //
        // legajo tiene que ser number.
        // nombre tiene que ser string.
        // carrera tiene que ser string.
        // correo tiene que ser string.
        if (
            typeof legajo !== "number" ||
            typeof nombre !== "string" ||
            typeof carrera !== "string" ||
            typeof correo !== "string"
        ) {

            return res.status(400).json({

                mensaje: "Tipo de dato incorrecto"
            });
        }


        // =================================================
        // Verificar campos vacíos
        // =================================================

        // trim() elimina los espacios que haya
        // al principio y al final de un texto.
        if (
            nombre.trim() === "" ||
            carrera.trim() === "" ||
            correo.trim() === ""
        ) {

            return res.status(400).json({

                mensaje: "Los campos no pueden estar vacíos"
            });
        }


        // =================================================
        // Verificar si el legajo ya existe
        // =================================================

        // Buscamos en MongoDB si ya existe
        // un alumno con el mismo legajo.
        const alumnoExistente = await Alumno.findOne({
            legajo: legajo
        });


        // Si encontramos un alumno,
        // significa que ese legajo ya está utilizado.
        if (alumnoExistente) {

            return res.status(400).json({

                mensaje: "El legajo ya existe"
            });
        }


        // =================================================
        // Crear el alumno
        // =================================================

        // Creamos un nuevo objeto utilizando
        // nuestro modelo Alumno.
        const alumno = new Alumno({

            legajo: legajo,
            nombre: nombre,
            carrera: carrera,
            correo: correo
        });


        // save() guarda el nuevo alumno
        // dentro de MongoDB.
        await alumno.save();


        // status(201) significa que se creó correctamente
        // un nuevo recurso.
        res.status(201).json({

            mensaje: "Alumno registrado correctamente",

            // Devolvemos también el alumno
            // que acabamos de crear.
            alumno: alumno
        });

    } catch (error) {

        // Si ocurre un error al guardar,
        // devolvemos un error 500.
        res.status(500).json({
            mensaje: "Error al crear el alumno"
        });
    }
}


// =====================================================
// PUT /alumnos/:legajo
// Actualizar un alumno
// =====================================================

async function actualizarAlumno(req, res) {

    try {

        // Obtenemos el legajo que viene en la URL.
        //
        // Ejemplo:
        //
        // PUT /alumnos/1003
        //
        // req.params.legajo = "1003"
        //
        // Number() lo convierte a número.
        const legajo = Number(req.params.legajo);

        
        // Buscamos el alumno cuyo legajo coincida
        // con el que recibimos.
        const alumno = await Alumno.findOne({
            legajo: legajo
        });


        // Si no encontramos el alumno...
        if (!alumno) {

            // Devolvemos 404 porque no existe.
            return res.status(404).json({

                mensaje: "Alumno no encontrado"
            });
        }


        // =================================================
        // Verificar los datos recibidos
        // =================================================

        // Sacamos los nuevos datos del body.
        const { nombre, carrera, correo } = req.body;


        // Verificamos que todos los datos
        // hayan sido enviados.
        if (
            nombre === undefined ||
            carrera === undefined ||
            correo === undefined
        ) {

            return res.status(400).json({

                mensaje: "Faltan datos del alumno"
            });
        }


        // Verificamos que tengan el tipo correcto.
        if (
            typeof nombre !== "string" ||
            typeof carrera !== "string" ||
            typeof correo !== "string"
        ) {

            return res.status(400).json({

                mensaje: "Tipo de dato incorrecto"
            });
        }


        // Verificamos que los campos no estén vacíos.
        if (
            nombre.trim() === "" ||
            carrera.trim() === "" ||
            correo.trim() === ""
        ) {

            return res.status(400).json({

                mensaje: "Los campos no pueden estar vacíos"
            });
        }


        // =================================================
        // Actualizar los datos
        // =================================================

        // Cambiamos el nombre del alumno.
        alumno.nombre = nombre;


        // Cambiamos la carrera del alumno.
        alumno.carrera = carrera;


        // Cambiamos el correo del alumno.
        alumno.correo = correo;


        // save() guarda los cambios realizados
        // en MongoDB.
        await alumno.save();


        // Enviamos una respuesta indicando que
        // la actualización fue correcta.
        res.json({

            mensaje: "Alumno actualizado correctamente",

            // Mostramos el alumno después de modificarlo.
            alumno: alumno
        });

    } catch (error) {

        // Si ocurre un error al actualizar,
        // devolvemos un error 500.
        res.status(500).json({
            mensaje: "Error al actualizar el alumno"
        });
    }
}


// =====================================================
// DELETE /alumnos/:legajo
// Eliminar un alumno
// =====================================================

async function eliminarAlumno(req, res) {

    try {

        // Obtenemos el legajo de la URL
        // y lo convertimos de texto a número.
        const legajo = Number(req.params.legajo);


        // Buscamos el alumno por su legajo.
        const alumno = await Alumno.findOne({
            legajo: legajo
        });


        // Si no encontramos ningún alumno...
        if (!alumno) {

            // 404 = alumno no encontrado.
            return res.status(404).json({

                mensaje: "Alumno no encontrado"
            });
        }


        // deleteOne() elimina el documento
        // de MongoDB que tenga ese legajo.
        await Alumno.deleteOne({
            legajo: legajo
        });


        // Respondemos indicando que se eliminó correctamente.
        res.json({

            mensaje: "Alumno eliminado correctamente"
        });

    } catch (error) {

        // Si ocurre un error al eliminar,
        // devolvemos un error 500.
        res.status(500).json({
            mensaje: "Error al eliminar el alumno"
        });
    }
}


// =====================================================
// EXPORTAR LAS FUNCIONES
// =====================================================

// Exportamos todas las funciones para poder utilizarlas
// desde nuestro archivo de rutas.
module.exports = {

    obtenerAlumnos,
    obtenerAlumnoPorLegajo,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
};