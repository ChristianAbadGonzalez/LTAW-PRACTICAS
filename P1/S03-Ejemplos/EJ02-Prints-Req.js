/* 
   Es un ejemplo de un Happy Server que analiza el mensaje de solicitud 
   y nos imprime en la consola toda su información. 
*/

const http = require('http');

const PUERTO = 8080;

//-- Imprimir informacion sobre el mensaje de solicitud
function print_info_req(req) {

    console.log("");
    console.log("Mensaje de solicitud");
    console.log("====================");
    console.log("Método: " + req.method);
    console.log("Recurso: " + req.url);
    console.log("Version: " + req.httpVersion)
    console.log("Cabeceras: ");

    //-- Recorrer todas las cabeceras disponibles
    //-- imprimiendo su nombre y su valor
    for (hname in req.headers)
      console.log(`  * ${hname}: ${req.headers[hname]}`);

    //-- Construir el objeto url con la url de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log("URL completa: " + myURL.href);
    console.log("  Ruta: " + myURL.pathname);
}

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

  //-- Petición recibida
  //-- Imprimir información de la petición
  print_info_req(req);

  //-- Si hay datos en el cuerpo, se imprimen
  req.on('data', (cuerpo) => {

    //-- Los datos del cuerpo son caracteres
    req.setEncoding('utf8');

    console.log("Cuerpo: ")
    console.log(` * Tamaño: ${cuerpo.length} bytes`);
    console.log(` * Contenido: ${cuerpo}`);
  });

  //-- Esto solo se ejecuta cuando llega el final del mensaje de solicitud
  req.on('end', ()=> {
    console.log("Fin del mensaje");

    //-- Hayppy server. Generar respuesta
    res.setHeader('Content-Type', 'text/plain');
    res.write("Soy el happy server\n");
    res.end()
  });

});

server.listen(PUERTO);

console.log("Ejemplo 1. Happy Server listo!. Escuchando en puerto: " + PUERTO);

/*  
$ curl -v "127.0.0.1:8080/holaaaa?ad=1&d=5#hola"
* Trying 127.0.0.1:8080...
* TCP_NODELAY set
* Connected to 127.0.0.1 (127.0.0.1) port 8080 (#0)
> GET /holaaaa?ad=1&d=5 HTTP/1.1
> Host: 127.0.0.1:8080
> User-Agent: curl/7.68.0
> Accept: *//*
/*> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Content-Type: text/plain
< Date: Mon, 01 Mar 2021 04:32:02 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
< 
Soy el happy server
* Connection #0 to host 127.0.0.1 left intact
$    
*/

/* 
Mensaje de solicitud
====================
Método: GET
Recurso: /holaaaa?ad=1&d=5
Version: 1.1
Cabeceras: 
  * host: 127.0.0.1:8080
  * user-agent: curl/7.68.0
  * accept: *//*
URL completa: http://127.0.0.1:8080/holaaaa?ad=1&d=5
Ruta: /holaaaa
Fin del mensaje 
*/

/* 
   Se ha hecho una petición de tipo GET, y no se ha incluido nada en el cuerpo del mensaje de solicitud. 
   Por eso no se activa el evento data y no se imprime en la consola nada relacionado con el cuerpo. 
   Sí que se ha detectado el evento end.
   
   Hacemos ahora una petición en la que se sí metemos un contenido en el cuerpo. Esto se hace añadiendo la opción -d en la llamada a curl: 
*/

/* 
$ curl -v -H "Content-Type: text/plain" -d "Hola Happy server! Soy tu cliente favorito" "127.0.0.1:8080/hola?ad=1&d=5#hola"
* Trying 127.0.0.1:8080...
* TCP_NODELAY set
* Connected to 127.0.0.1 (127.0.0.1) port 8080 (#0)
> POST /hola?ad=1&d=5 HTTP/1.1
> Host: 127.0.0.1:8080
> User-Agent: curl/7.68.0
> Accept: *//*
> Content-Type: text/plain
> Content-Length: 42
> 
* upload completely sent off: 42 out of 42 bytes
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Content-Type: text/plain
< Date: Mon, 01 Mar 2021 04:40:39 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
< 
Soy el happy server
* Connection #0 to host 127.0.0.1 left intact
$
*/

/* RESPUESTA DEL SERVIDOR */
/* 
    Mensaje de solicitud
====================
Método: POST
Recurso: /hola?ad=1&d=5
Version: 1.1
Cabeceras: 
  * host: 127.0.0.1:8080
  * user-agent: curl/7.68.0
  * accept: *//*
  * content-type: text/plain
  * content-length: 42
URL completa: http://127.0.0.1:8080/hola?ad=1&d=5
  Ruta: /hola
Cuerpo: 
 * Tamaño: 42 bytes
 * Contenido: Hola Happy server! Soy tu cliente favorito
Fin del mensaje
*/