/* EJERCICIO 7 - PAGINA PRINCIPAL Y PAGINA DE ERROR */

/* 
El servidor de este ejemplo ya no es un Happy server. 
Su comportamiento todavía es muy básico, pero depende de lo que le solicite el cliente. 
Si se le solicita el recurso raiz "/" devuelve la página princpal, 
sin embargo si se solicita cualquier otro recurso devuelve una página de error

Ambas páginas son cadenas en html que están definidas dentro del propio servidor 
(no se accede al sistema de ficheros)
*/

const http = require('http');

const PUERTO = 8080;

//-- Texto HTML de la página principal
const pagina_main = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi tienda</title>
</head>
<body style="background-color: lightblue">
    <h1 style="color: green">MI TIENDA</h1>
</body>
</html>
`

//-- Texto HTML de la página de error
const pagina_error = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi tienda</title>
</head>
<body style="background-color: red">
    <h1 style="color: white">ERROR!!!!</h1>
</body>
</html>
`

const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    //-- Valores de la respuesta por defecto
    let code = 200;
    let code_msg = "OK";
    let page = pagina_main;

    //-- Analizar el recurso
    //-- Construir el objeto url con la url de la solicitud
    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log(url.pathname);

    //-- Cualquier recurso que no sea la página principal
    //-- genera un error
    if (url.pathname != '/') {
        code = 404;
        code_msg = "Not Found";
        page = pagina_error;
    }

    //-- Generar la respusta en función de las variables
    //-- code, code_msg y page
    res.statusCode = code;
    res.statusMessage = code_msg;
    res.setHeader('Content-Type','text/html');
    res.write(page);
    res.end();
});

server.listen(PUERTO);

console.log("Ejemplo 7. Escuchando en puerto: " + PUERTO);

/* 
La clave está en obtener el nombre del recurso solicituado. 
Para ello se crea el objeto url y se analiza el valor de la propia "pathname". 
El mensaje de respuesta se crea a partir de las variables code, code_msg y page, 
que contienen respetivamente el código de la solicitud, el mensaje asociado a este código y la página.
*/

/* 
Si se trata de un recurso diferente al raiz se actualizan las variables con la información relativa a la página de error
*/