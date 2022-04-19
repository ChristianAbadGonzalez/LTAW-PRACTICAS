// Importacion de modulos HTTP, FS, URL
const http = require('http');
const url = require('url');
const fs = require('fs');

// Definición del PUERTO que vamos a utilizar
const PUERTO = 9090;

// Servidor
console.log('Escuchando...');

//Definir tipos de mime
const mime_type = {
  "html" : "text/html",
  "css"  : "text/css",
  "js"   : "application/javascript",
  "jpg"  : "image/jpg",
  "JPG"  : "image/JPG",
  "jpeg" : "image/jpeg",
  "png"  : "image/png",
  "PNG"  : "image/PNG",
  "gif"  : "image/gif",
  "ico"  : "image/icon",
  "json" : "application/json",
};

//Página principal
const TIENDA = fs.readFileSync('tienda.html', 'utf-8');

//Página formulario
const FLOGIN = fs.readFileSync('form-login.html', 'utf-8');

//Páginas principales de cada ordenador
const ORDENADOR1 = fs.readFileSync('ordenador1.html', 'utf-8');
const ORDENADOR2 = fs.readFileSync('ordenador2.html', 'utf-8');
const ORDENADOR3 = fs.readFileSync('ordenador3.html', 'utf-8');
const ORDENADOR4 = fs.readFileSync('ordenador4.html', 'utf-8');
const ORDENADOR5 = fs.readFileSync('ordenador5.html', 'utf-8');
const ORDENADOR6 = fs.readFileSync('ordenador6.html', 'utf-8');
const ORDENADOR7 = fs.readFileSync('ordenador7.html', 'utf-8');
const ORDENADOR8 = fs.readFileSync('ordenador8.html', 'utf-8');
const ORDENADOR9 = fs.readFileSync('ordenador9.html', 'utf-8');
const ORDENADOR10 = fs.readFileSync('ordenador10.html', 'utf-8');
const ORDENADOR11 = fs.readFileSync('ordenador11.html', 'utf-8');
const ORDENADOR12 = fs.readFileSync('ordenador12.html', 'utf-8');
const ORDENADOR13 = fs.readFileSync('ordenador13.html', 'utf-8');
const ORDENADOR14 = fs.readFileSync('ordenador14.html', 'utf-8');
const ORDENADOR15 = fs.readFileSync('ordenador15.html', 'utf-8');

//Página error
const ERROR = fs.readFileSync('error.html', 'utf-8');

//-- Cargar pagina web del formulario 
const FORMULARIO_PEDIDO = fs.readFileSync('form-pedido.html','utf-8');

//Página respuesta Bienvenido a la tienda y cliente desconocido
const LOGIN = fs.readFileSync('login.html', 'utf-8');
const NOLOGIN = fs.readFileSync('no-login.html', 'utf-8');

//Página usuario dentro de la tienda
const LOGIN_USER = fs.readFileSync('user-login.html', 'utf-8');

//Página comprar formulario y respuesta
const PEDIDO_OK = fs.readFileSync('pedido-ok.html','utf-8');
const ADD_OK = fs.readFileSync('producto-cesta.html', 'utf-8');

//Página carrito
const CARRITO = fs.readFileSync('carrito.html', 'utf-8');
let carrito_existe = false;
let busqueda; //Definición busqueda

//JSON estructura de la tienda
const FICHERO_JSON = "tienda.json";

//Fichero JSON modificado
const FICHERO_JSON_MOD = "tienda-modificada.json";

//Lectura del fichero JSON
const  tienda_json = fs.readFileSync(FICHERO_JSON);
const tienda = JSON.parse(tienda_json);

//Lista usuarios registrados.
let users_reg = [];
console.log("Lista de usuarios registrados");
console.log("-----------------------------");
tienda[1]["usuarios"].forEach((element, index)=>{
    console.log("Usuario " + (index + 1) + ": " + element.user);
    users_reg.push(element.user);
  });
console.log();

//contraseña usuarios
let password_reg = [];
let usuarios_reg = tienda[1]["usuarios"];
for (i = 0; i < usuarios_reg.length; i++){
    users_reg.push(usuarios_reg[i]["usuario"]);
    password_reg.push(usuarios_reg[i]["password"]);
};

//Lista productos disponibles.
let productos_disp = [];
let product_list = [];
console.log("Lista de productos disponibles");
console.log("-----------------------------");
tienda[0]["productos"].forEach((element, index)=>{
  console.log("Articulo " + (index + 1) + ": " + element.nombre +
              ", Stock: " + element.stock + ", Precio: " + element.precio);
  productos_disp.push([element.nombre, element.descripcion, element.stock, 
                       element.precio]);
  product_list.push(element.nombre);
});
console.log();

//Analizar la cookie y devolver el nombre de usuario si existe
function get_user(req) {
  
  //-- Leer la cookie recibida
  const cookie = req.headers.cookie;

  //Si hay cookie, guardamos el usuario
  if (cookie) {
    //Obtenemos array con todos los pares nombre-valor
    let pares = cookie.split(";");

    //Variable para guardar usuario
    let user;

    //Recorrer todos los pares nombre-valor
    pares.forEach((element, index) => {
      //Obtenemos los nombre y los valores por separado
      let [nombre, valor] = element.split('=');

      //Lee el usuario solo si nombre = user
      if (nombre.trim() === 'user') {
        user = valor;
      }
    });

    //si user no asignada devuelve null
    return user || null;
  }
}

//Funcion para crear las cookies al añadir articulos al carrito
function add_carrito(req, res, producto) {
  const cookie = req.headers.cookie;

  if (cookie) {
    //Obteneos un array con todos los pares nombre-valor
    let pares = cookie.split(";");

    //Recorremos todos los pares nombre-valor
    pares.forEach((element, index) => {
      //Obtenemos los nombre y los valores por separado
      let [nombre, valor] = element.split('=');

      //Si nombre = carrito enviamos cookie de respuesta
      if (nombre.trim() === 'carrito') {
        res.setHeader('Set-Cookie', element + ':' + producto);
      }
    });
  }
}

// Creacion del Servidor Web con sus respectivos argumentos
const server = http.createServer((req, res) => {

    // Peticion Recibida
    console.log('¡Peticion Recibida!');

    /* Creación o construcción de objetos de tipo URL */
    const myURL = new URL(req.url, 'https://' + req.headers['host']);
    console.log('La URL obtenida es: ' + myURL.pathname);

    // Buffer de variables
    let filename = "",
        file_content = "",
        content_type = "",
        code = 200;

    // Obtención de ruta (pathname) + Comprobación de ruta para su posterior devolución
    if (myURL.pathname == '/'){
        filename = "tienda.html"; // Página Principal --> [HOME]
        content_type = "text/html";
      }else{
        file_content = (myURL.pathname).split(["."])[1]; // Extracción de path ubicado entre puntos '.'
        content_type = "text/" + file_content; // Contenido de la página web 'myURL.pathname'
        filename = "." + myURL.pathname; // Página que ha pedido el cliente
      }

    // Imprime por pantalla la URL pedida por el cliente/usuario.
    console.log('La URL pedida es correcta: ' + filename);

    // El contenido mostrado por la pantalla de la URL pedida por el cliente es el siguiente.
    console.log('El contenido del recurso es: ' + file_content);

    // Lectura Sincrona    
    fs.readFile(filename, function(err, data){
        // En caso de ¡ERROR! --> Página No Encontrada
        if (err){
          res.writeHead(404, {'Content-Type': 'text/html'})
          return res.end('¡ERROR:! FILE NOT FOUND');
        }
        res.writeHead(code, {'Content-Type': content_type});
        res.write(data);
        return res.end();
      });
    })

// Puerto del servidor de escucha
server.listen(PUERTO);

console.log('Servidor Activado. Escuchando en el Puerto: ' + PUERTO);

