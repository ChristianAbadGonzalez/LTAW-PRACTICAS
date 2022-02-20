/* EJERCICIO 9 - LECTURA ASINCRONA */

/* 
Cuando estamos implementando servidores web, utilizaremos la lectura asíncrona para que el rendimiento sea mejor, 
y nuestro servidor pueda atender más peticiones. La lectura síncrona se hace con la función readFile(), 
y utiliza los mismos argumentos que la función de lectura síncrona, salvo que se añade al final la función de callback
*/

//-- Importar el módulo FS
const fs = require('fs');

console.log("Lectura asíncrona de un fichero");

//-- Realizar la lectura asíncrona
fs.readFile('fich1.txt','utf8', (err, data) => {

    //-- Cuando los datos están ya disponibles
    //-- los mostramos en la consola
    console.log("Lectura completada...")
    console.log("Contenido del fichero: \n")
    console.log(data);
});

console.log("Esperando al sistema de ficheros...")

/* 
Al ser una lectura asíncrona, ahora el orden de los mensajes de la consola cambia. 
Al arrancar el programa se muestra el mensaje "Lectura asíncrona de un fichero". 
A continuación se solicita al sistema de ficheros que comience con la lectura de fich1.txt 
y se le indica que ejecute la función de callback cuando termine. 
Node sigue ejecutando el programa por lo que imprime el mensaje: "Esperando al sistema de ficheros..."

Cuando el sistema de ficheros ha terminado de leer fich1.txt, 
llama a la función de callback e imprime el resto de mensajes y el contenido del fichero fich1.txt.
*/