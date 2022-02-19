/* CREANDO UN OBJETO URL */

/* Los objetos URL los creamos con la instrucción "new URL(String)", siendo String todos los carácteres de la URL. */
/* No hace falta incluir nada explícitamente, ya que la clase URL es visible directamente */

//-- Construir un objeto URL
const myURL = new URL('https://sub.example.com:8080/p/a/t/h?query1=string1&query2=string2#hash');

//-- Imprimir el objeto URL para ver todas sus partes
console.log(myURL); 

/* En este ejemplo se está construyendo una URL con muchos campos. Una vez creado el objeto "myURL" se imprime en la consola. */