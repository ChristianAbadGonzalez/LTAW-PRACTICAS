/* MENSAJES DE RESPUESTA */

/* 
Los mensajes de respuesta son objetos que pertenecen a la clase http.ServerResponse. 
Al recibir un mensaje de solicitud, el módulo http nos crea un objeto con el mensaje de respuesta vacío, 
que típicamente llamaremos res. 
*/

/* 
Añadimos información al mensaje de respuesta con estos métodos:

    - res.statusCode: Establecer el código de respuesta
    - res.statusMessage: Establecer el código de respuesta "en humano"
    - **res.setHeader(nombre,valor): Añadir la cabecera indicada
    - **res.write(dato): Escribir información en el cuerpo del mensaje
    - res.end(): Terminar y enviar el mensaje 
*/

/* EJERCICIO 4 - GENERANDO MENSAJES DE RESPUESTA */

/* En este ejemplo se muestra un Happy server en el que se genera el mensaje de respuesta* llamando a los métodos del objeto */

const http = require('http');

const PUERTO = 8080;

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

  console.log("Petición recibida")

  //-- Hayppy server. Generar respuesta
  //-- Código: todo ok
  res.statusCode = 200;
  res.statusMessage = "OK :-)";
  res.setHeader('Content-Type', 'text/plain');
  res.write("Soy el happy server\n");
  res.end()

});

server.listen(PUERTO);

console.log("Ejemplo 4. Happy Server listo!. Escuchando en puerto: " + PUERTO);

/* Lanzamos la petición con curl y obtenemos esto: */

// 
// $ curl  -v 127.0.0.1:8080
//*   Trying 127.0.0.1:8080...
// * TCP_NODELAY set
// * Connected to 127.0.0.1 (127.0.0.1) port 8080 (#0)
// > GET / HTTP/1.1
// > Host: 127.0.0.1:8080
// > User-Agent: curl/7.68.0
// > Accept: */*
// > 
// * Mark bundle as not supporting multiuse
// < HTTP/1.1 200 OK :-)
// < Content-Type: text/plain
// < Date: Mon, 01 Mar 2021 05:39:25 GMT
// < Connection: keep-alive
// < Keep-Alive: timeout=5
// < Transfer-Encoding: chunked
// < 
// Soy el happy server
// * Connection #0 to host 127.0.0.1 left intact