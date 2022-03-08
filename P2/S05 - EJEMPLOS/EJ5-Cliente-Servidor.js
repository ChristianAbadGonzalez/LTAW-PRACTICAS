/* 
    ENUNCIADO:

    Los datos recibidos, si la petición es correcta, 
    se reciben por el stream de entrada y se van almacenando en la variable data. 
    
    Cuando se ha terminado de recibir todos los datos convierte a variable y 
    se accede a los campos de la estructura para obtener el lugar, la temperatura y la hora:

*/

const https = require('https');

const ENDPOINT = "https://www.metaweather.com/api/location/766273/";

let request = https.get(ENDPOINT, (res) => { 
    if (res.statusCode !== 200 ) {
        console.error("Error");
        console.log("Código de respuesta: " + res.statusCode);
        res.resume();
        return;
    }

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('close', () => {
        console.log('Datos recibidos');

        //-- Obtener la variable con la informacion
        let tiempo = JSON.parse(data);

        let temp = tiempo.consolidated_weather[0].the_temp;

        console.log("Lugar: " + tiempo.title);
        console.log("Temperatura: " + temp);
        console.log("Hora: " + tiempo.time);
        
    });
   
});