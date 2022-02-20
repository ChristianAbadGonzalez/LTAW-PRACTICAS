/* EJERCICIO 6 - HAPPY SERVER EN HTML */

/* 
Este servidor es un Happy server pero que en vez de devolver siempre una cadena de texto, devuelve una cadena en formato HTML. 
Esta cadena la dejamos definida dentro del propio código, en la variable constante pagina
*/

const http = require('http');

const PUERTO = 8080;

//-- Texto HTML
const pagina = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Happy Server!</title>
</head>
<body style="background-color: lightblue">
    <h1 style="color: green">HAPPY SERVER!!!</h1>
</body>
</html>
`

const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    res.statusCode = 200;
    res.statusMessage = "OK";
    res.setHeader('Content-Type','text/html');
    res.write(pagina);
    res.end();
});

server.listen(PUERTO);

console.log("Ejemplo 6. Happy Server HTML!. Escuchando en puerto: " + PUERTO);

/* Y si lo probamos con Curl vemos el texto HTML en la consola: */

/* 
$ curl  127.0.0.1:8080

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Happy Server!</title>
</head>
<body style="background-color: lightblue">
    <h1 style="color: green">HAPPY SERVER!!!</h1>
</body>
</html>
*/