/* El módulo URL contiene utilizadades para trabajar con URLs. */
/* Para utilizar este módulo hayq ue importarlo de la siguiente manera */

const url = require('url');

/* En la variable url tenemos acceso a todos los elementos definidos. */
/* Sin embargo, lo que más se usa es la clase URL que es la que permite crear objetos de tipo URL */
/* con los que poder trabajar. Accedemos a esa clase de esta forma: */

const URL = url.URL;

/* const URL require('url').URL;*/

/* const {URL} = require('url'); */

/* EJEMPLOS DE URL */

/* EJEMPLO 1 */

/* https://github.com/myTeachingURJC/2021-2022-LTAW/wiki/S3:-Node.js.-M%C3%B3dulos#m%C3%B3dulo-http */

/* En este ejemplo de URL que contiene un fragmento. Es el linK para acceder a la sección del módulo de http de esta página */

/* EJEMPLO 2 */

/* https://www.youtube.com/watch?list=PLmnz0JqIMEzUKrrcKhBNfWbb1Th0o9tET&t=5&v=b2puPzjQ2Bo */

/* Enlace a un vídeo de Youtube */

/* El recurso del enlce es /watch, al que se le pasan 3 parámetros en la búsqueda */

/* 
   - list: identificador de la lista de reproducción donde está el vídeo.
   - t: tiempo en segundos por donde empezar a reproducirlo
   - v: identificador del vídeo.
*/

/* La búsqueda son todos los caracteres que hay acontinuación del carácter '?'. 
   Los parámetros están separados entre ellos por el carácter '&' */

/* EJEMPLO 3 */

/* Este es un ejemplo de una URL de Amazon: Cubo de Rubik en amazon */

/* https://www.amazon.es/M%C3%A1gico-Velocidad-Originario-Est%C3%A1ndar-Durable/dp/B07F6Y99KJ/ref=sr_1_4?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=rubik&qid=1614534648&sr=8-4 */

/* El recurso es: Mágico-Velocidad-Originario-Estádar-Durable/dp/B07F6Y99KJ/ref=sr_1_4. Se le pasan 5 parámetros: */

/* - __mk_es_ES
   - dchild
   - keywords=rubik
   - qid
   - sr
*/