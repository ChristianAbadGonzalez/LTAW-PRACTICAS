// Importacion de modulos HTTP, FS, URL
const http = require('http');
const url = require('url');
const fs = require('fs');

// Definición del PUERTO que vamos a utilizar
const PUERTO = 9090;

// Servidor
console.log('Escuchando...');

// Creacion del Servidor Web con sus respectivos argumentos
const server = http.createServer((req, res) => {

    // Peticion Recibida
    console.log('¡Peticion Recibida!');

    /* Creación o construcción de objetos de tipo URL */
    const myURL = new URL(req.url, 'https://' + req.headers['host']);
    console.log('La URL obtenida es: ' + myURL.pathname);

    // Buffer de variables
    let filename = "",
        file_content = "",
        content_type = "",
        code = 200;

    // Obtención de ruta (pathname) + Comprobación de ruta para su posterior devolución
    if (myURL.pathname == '/'){
        filename = "tienda.html"; // Página Principal --> [HOME]
        content_type = "text/html";
      }else{
        file_content = (myURL.pathname).split(["."])[1]; // Extracción de path ubicado entre puntos '.'
        content_type = "text/" + file_content; // Contenido de la página web 'myURL.pathname'
        filename = "." + myURL.pathname; // Página que ha pedido el cliente
      }

    // Imprime por pantalla la URL pedida por el cliente/usuario.
    console.log('La URL pedida es correcta: ' + filename);

    // El contenido mostrado por la pantalla de la URL pedida por el cliente es el siguiente.
    console.log('El contenido del recurso es: ' + file_content);

    // Lectura Sincrona    
    fs.readFile(filename, function(err, data){
        // En caso de ¡ERROR! --> Página No Encontrada
        if (err){
          res.writeHead(404, {'Content-Type': 'text/html'})
          return res.end('¡ERROR:! FILE NOT FOUND');
        }
        res.writeHead(code, {'Content-Type': content_type});
        res.write(data);
        return res.end();
      });
    })

// Puerto del servidor de escucha
server.listen(PUERTO);

console.log('Servidor Activado. Escuchando en el Puerto: ' + PUERTO);

