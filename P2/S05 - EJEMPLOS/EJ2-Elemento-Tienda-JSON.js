/* 
   ENUNCIADO:
   
   En este ejemplo definimos la misma estructura de la tienda pero en formato JSON, almacenado en una cadena. 
   La diferencia está en que en la cadena JSON los nombres de las propiedades de los objetos se deben poner entre comillas

   Para acceder al nombre de los productos se puede utilizar bien la notación con punto: 
   element.nombre o bien la notación de corchetes: element["nombre"] 
   
*/

//-- Cadena con la estructura de la tienda en JSON
const tienda_json = `[
    {
      "nombre": "Alhambra II",
      "descripcion": "Placa con FPGA ice40HX8K",
      "stock": 3
    },
    {
      "nombre": "Icestick",
      "stock": 10
    }
  ]`
  
  //-- Crear la estructura tienda a partir de la cadena en json
  const tienda = JSON.parse(tienda_json);
  
  //-- Mostrar informacion sobre la tienda
  console.log("Productos en la tienda: " + tienda.length);
  
  //-- Recorrer el array de productos
  tienda.forEach((element, index)=>{
    console.log("Producto: " + (index + 1) + ": " + element["nombre"]);
  });