// Importacion de modulos HTTP, FS, URL
const http = require('http');

// Definición del PUERTO que vamos a utilizar
const PUERTO = 9090

// Creacion del Servidor Web con sus respectivos argumentos
const server = http.createServer((req, res) => {

    // Peticion Recibida
    console.log('Peticion Recibida');

    // Cabecera del tipo de datos + Cuerpo de la Respuesta.
    res.setHeader('Content-Type', 'text/plain');

    // Envio de respuestas
    res.write('Soy el Happy Server!! \n');

    res.end();

});

// Puerto del servidor de escucha
server.listen(PUERTO);

console.log('Servidor Activado. Escuchando en el Puerto: ' + PUERTO);

