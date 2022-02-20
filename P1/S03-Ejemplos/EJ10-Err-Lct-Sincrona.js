/* EJERCICIO 10 - ERROR EN LECTURA SINCRONA */

/* 
Cuando estamos haciendo una lectura síncrona de un fichero, 
detectamos los errores mediante excepciones. 
En este ejemplo se produce un error porque estamos usando un fichero que no existe:
*/

const fs = require('fs');

//-- Fichero a leer
const FICHERO = 'fich11.txt';

try {
  const data = fs.readFileSync(FICHERO, 'utf8');
  console.log("Lectura completada...")
  console.log("Contenido del fichero: \n")
  console.log(data);

} catch (err) {
  console.log("Error!!")
  console.log(err.message);
}

/* 
$ node fs-03-error.js 
Error!!
ENOENT: no such file or directory, open 'fich11.txt'
*/