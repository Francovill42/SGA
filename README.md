# Sistema de Gestión Académica (SGA)

Proyecto desarrollado durante la materia Programación IV.

## Descripción

El Sistema de Gestión Académica (SGA) es una aplicación web que permitirá administrar alumnos, docentes, cursos y materias.

Durante el desarrollo del proyecto se incorporarán progresivamente nuevas tecnologías y funcionalidades.


## Objetivos

- Gestionar alumnos.
- Gestionar docentes.
- Gestionar cursos.
- Gestionar materias.
- Implementar autenticación de usuarios.
- Consumir una API REST.
- Persistir la información en MongoDB.


## Tecnologías

Actualmente:

- HTML5
- JavaScript
- CSS
- Express
- Node.js
- MongoDB

Próximamente:
- React


## Estado del proyecto

- Versión: 
Clase 10 - Estructura actual
SGA/
fronted
├── index.html
├── alumnos.html
├── docentes.html
│
├── css/
│   └── index.css
│
└── js/
    ├── alumnos.js
    └──sincronia.js
    └── docentes.js
    └──storage.js
    └──UI.js



## Estado Actual

- pagina de inicio y navegacion entre modulos
- Modulo alumnos y docentes
- CRUD alumnos/docentes
- Validaciones de formularios
- persistencias mediante localStorrage 
- Organizacion del codito y refactorizacion
- Separacion incila entre Frontend Y Backend
- Implementacion de validaciones para los datos recibidos mediante req.body
- Uso de status 400 para datos indvalidos
- status 404 para alumno no encontrado
- status 201 para registrar nuevo alumno 
- Manejo basico de errores en las operaciones del CRUD.
- Instalacion de mongoose
- Creacion de la conexion con MongoDB en config/Database.js
- Creacion del Schema y modelo Alumno
- Reemplazo del Array en memoria por una coleccion de MongoDb
- Modificacion de GET /alumnos para consulta MongoDB mediante mongoose
- Prueba de la API con datos almacenados en MongoDB.


## Almacenamiento

- localStorage
- JSON.stringify()
- JSON.parse()

## Autor

Irina Agretti

Programación IV