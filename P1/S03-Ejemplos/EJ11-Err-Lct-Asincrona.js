/* EJERCICIO 11 - ERROR DE LECTURA ASINCRONA */

/* 
Cuando la lectura es asíncrona, en la función de callback 
sabemos si ha ocurrido un error comprobando el primero argumento: err. 
Si tiene algún valor, es porque se ha producido un error. De lo contrario tenemos disponible los datos en data.
*/

const fs = require('fs');

//-- Fichero a leer
const FICHERO = 'fich11.txt';

fs.readFile(FICHERO, 'utf8', (err, data) => {

    if (err) {  //-- Ha ocurrido algun error
      console.log("Error!!")
      console.log(err.message);
    } 
    else {  //-- Lectura normal
        console.log("Lectura completada...")
        console.log("Contenido del fichero: \n")
        console.log(data);
    }
})