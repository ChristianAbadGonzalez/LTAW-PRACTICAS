/* EJERCICIO 5: ANGRY SERVER */

/* Es el contrario del Happy server. Responde siempre con un mensaje de error ante cualquier petición */

const http = require('http');

const PUERTO = 8080;

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

  console.log("Petición recibida")

  //-- Generar respuesta
  //-- Código: Error. No encontrado
  res.statusCode = 404;
  res.statusMessage = "Not Found :-(";
  res.setHeader('Content-Type', 'text/plain');
  res.write("Soy el ANGRY Server\n");
  res.end()

});

server.listen(PUERTO);

console.log("Ejemplo 5. Angry server!. Escuchando en puerto: " + PUERTO);

/* 
El navegador no hace nada diferente. Recibe el código de respuesta y muestra la información que le envía el servidor. 
Cada servicio web suele tener su própia página de error. 
Si nos conectamos al Angry server desde la herramienta Network vemos que efectivamente las peticiones realizadas fallan:
*/

/* Cada servicio web suele tener su própia página de error. Por ejemplo si nos conectamos a github a esta URL: */

// https://github.com/trolface