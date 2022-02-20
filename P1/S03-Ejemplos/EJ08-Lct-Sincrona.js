/* EJERCICIO 8 LECTURA SINCRONA */

/* 
El acceso al sistema de ficheros se puede hacer de manera síncrona, 
en la que no se ejecuta la siguiente instrucción hasta que no se haya completado la operación de acceso. 
Es la manera clásica

La lectura síncrona se hace con la función readFileSync(nombre, codificacion). 
Como primer argumento se le pasa el nombre del fichero y como segundo la codificación. 
Para leer ficheros de texto usaremos 'utf8'. 
Para leeer fichero binarios (como una imagen, por ejemplo) no se indica codificación (por defecto se lee en binario)

En este ejemplo se lee el fichero de texto fich1.txt, 
que se encuentra en el mismo directorio en el que se está ejecutando el ejemplo. 
Como la lectura es síncrona, las instrucciones de este programa se ejecutan en orden, 
y los mensajes en la consola salen en orden también.
*/

//-- Importar el módulo FS
const fs = require('fs');

console.log("Lectura síncrona de un fichero");

//-- Realizar la lectura
const data = fs.readFileSync('fich1.txt','utf8');

//-- Esta instrucción se ejecuta una vez terminada
//-- la lectura síncrona
console.log("Lectura completada...")

//-- Mostrar el contenido del fichero
console.log("Contenido del fichero: \n")
console.log(data);