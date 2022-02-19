const http = require('http');

const PUERTO = 8080;

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

  console.log("\nMENSAJE A")

  req.on('data', (cuerpo) => {
    console.log("MENSAJE B")
  });

  req.on('end', ()=> {
    console.log("MENSAJE C");

    //-- Hayppy server. Generar respuesta
    res.setHeader('Content-Type', 'text/plain');
    res.write("Soy el happy server\n");
    res.end()
  });

  console.log("MENSAJE D");

});

console.log("MENSAJE E");
server.listen(PUERTO);
console.log("MENSAJE F");

/* RESOLUCION */

/* 

Comprobación experimental
Vamos a probar el programa y comprobar experimentalmente lo que ocurre

    Situación 1: Arrancamos el servidor. Lanzamos la siguiente petición con curl: 
        curl  127.0.0.1:8080
    
    En la consola del servidor vemos esto:
        $ node Ej03-async.js 
        MENSAJE E
        MENSAJE F

        MENSAJE A
        MENSAJE D
        MENSAJE C

    Los mensajes E y F son los primeros que se aparecen al lanzar el servidor, y se imprimen en orden. 
    Primero se crea el servidor con createServer. Después se imprime el mensaje E. 
    A continuación se pone el servidor en modo escucha, esperando a recibir peticiones. 
    En paralelo se escrie el mensaje F

    Ahora, cuando llega la petición se llama a la función de retrollamda y se imprime el mensaje A. 
    Se establecen dos funciones de retrollamada adicionales, asociadas a los eventos data y end, pero NO SE EJECUTAN. 
    Node sigue ejecutando instrucciones hasta llegar a la impresión del mensaje D y se queda esperando a que ocurra algún evento

    La petición no tiene cuerpo, por lo que se genera el evento end y se imprime el mensaje D

    Situación 2: Con el servidor ya arrancado, y después de la petición anterior, lanzamos otra pero pasando información en el cuerpo del mensaje:
        curl  -d "cuerpo" 127.0.0.1:8080
    
    En la consola del servidor vemos esto:
        MENSAJE A
        MENSAJE D
        MENSAJE B
        MENSAJE C
    
    Al llegar la petición se imprime primero el mensaje A y después el mensaje D (igual que antes) y se queda atendiendo a los eventos. 
    El primero que llega es el evento data, ya que el cuerpo tiene datos. Se imprime el mensaje B. 
    A continuación se genera el evento end y se imprime el mensaje Cç
    
*/