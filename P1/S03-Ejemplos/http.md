/* El módulo http de nodejs nos permite implementar clientes y servidores. 
   Contiene dos clases muy importantes para gestiomar los mensajes de solicitud y respuesta */
   /* 
        * http.IncomingMessage: Para trabajar con los mensajes de solicitud del prototoclo http.

        *  http.ServerResponse: Para trabajar con los mensajes de respuesta del protocolo http.
   */

/* Para acceder a todos los elementos del módulo http, utilizamos esta línea al comienzo de nuestro programa en nodejs */

<!-- const http = require('http'); --> 

/* MENSAJES DE SOLICITUD */

/* 
   Los mensajes de solicitud son objetos que pertenecen a la clase http.IncomingMessage. 
   Al recibir un mensaje de solicitud, el módulo http nos da acceso al objeto que contiene el mensaje. 
   Típicamente este objeto los llamamos req 
*/

/* El acceso a cada parte del mensaje se realiza mediante estos métodos: */
/* 
    * req.method: El tipo de solicitud: "GET, POST, HEAD..."
    * req.url: El nombre del recurso solicitudad. El símbolo "/" significa el recurso raiz
    * req.httpVersion: Versión del protocolo HTTP usado por el cliente
    * req.headers: Objeto que contiene todas las cabeceras. Se accede al valor de las cabeceras usando su nombre:
        <!-- * "req.headers[Nombre]"; -->
*/
/* Los datos del cuerpo llegan a través de un stream de entrada. Los streams son objetos de nodejs que nos permiteenviar y recibir datos. */

/* 
   El evento 'data' se activa cuando hay datos pendientes de leer en el cuerpo. Cuandoya se han leido todos los datos del cuerpo, 
   o bien se trata de un cuerpo sin datos, se activa el evento 'end' 
*/

/* 
    Utilizaremos las funciones de retrollamada que se ejecutarán, si es necesario, cuando ocurran esos eventos:

    * req.on('data', callback1): Se llama a la función de retrollamada cuando hay datos disponibles en el cuerpo para ser leidos.

    * req.on('end', callback2): Se llama a la función de retrollamada cuando se ha terminado de leer el mensaje de solicitud completo: no hay más datos en el cuerpo.
*/

/* URL DEL MENSAJE DE SOLICITUD */
/* 
   En el mensaje de solitud se recibe el recurso al que quiere acceder el cliente. 
   Lo leemos a través de la propiedad "req.url". Aunque esta propiedad se llame url, NO es una URL completa,
   si no sólo la cadena que identifica el recurso.
   
   Para convertirla a una URL completa, y poder así utilizar el módulo URL para acceder a todos los campos, hacemos lo siguiente:
   
<!--    * const myURL = new URL(req.url, 'http://' + req.headers['host']);  -->
   
   El constructor URL permite crear la url a partir del primer recurso (primer parámetro) y del origen (segundo parámetrp).
   El origen lo construimos a su vez concatenando "http://" con la cabecera 'host'.
   */
