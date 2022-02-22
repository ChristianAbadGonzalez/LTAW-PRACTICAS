// Importacion de modulos HTTP, FS, URL
const http = require('http');
const url = require('url');
const fs = require('fs');

// Definición del PUERTO que vamos a utilizar
const PUERTO = 1704;

// Servidor
console.log('Escuchando...');

// Creacion del Servidor Web con sus respectivos argumentos
const server = http.createServer((req, res) => {

    // Peticion Recibida
    console.log('!Peticion Recibida!');

    /* Creación o construcción de objetos de tipo URL */
    const myURL = new URL(req.url, 'https://' + req.headers['host']);
    console.log('La URL obtenida es: ' + myURL.pathname);

    // Cabecera del tipo de datos + Cuerpo de la Respuesta.
    res.setHeader('Content-Type', 'text/plain');

    // Envio de respuestas
    res.write('Soy el Happy Server!! \n');

    res.end();

});

/* Creación o construcción de objetos de tipo URL */
const myURL = new URL(req.url, 'https://' + req.headers['host']);

/* Imprimir el objeto URL para ver todas sus partes en la consola de comandos */
console.log(myURL);

// Puerto del servidor de escucha
server.listen(PUERTO);

console.log('Servidor Activado. Escuchando en el Puerto: ' + PUERTO);

