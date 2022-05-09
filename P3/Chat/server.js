/* Importacion y cargado de dependencias */
const express = require('express'), /* Módulo Express */
      app = express(), /* Creacion de una app donde los mensajes recibidos los gestiona dicha app */
      http = require('http').Server(app), /* Uso del módulo HTTP en la app */
      io = require('socket.io')(http), /* Uso de la biblioteca "socket.io" en el lado del servidor */
      PORT = 9090; /* Puerto donde esta alojado el servidor */

var users = 0,
    names = {},
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months = ['January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'];

/* Lanzamos el servidor */
http.listen(PORT, () => {
	console.log('server in: http://localhost:' + PORT + '/')
});

/* Punto de entrada de la aplicación web */
app.get('/', (req, res) => {
	console.log('access to ' + __dirname + '/chat.html');
  	res.sendFile(__dirname + '/chat.html');
});

/* Resto de peticiones estaticas gestionadas por la aplicación web */
app.use('/', express.static(__dirname + '/'));

/* Websocket --> Conexión de un nuevo usuario en la aplicación web */
io.on('connection', (socket) => {
	/* Websocket -- Hello con iteración de aceptación de los usuarios introducidos */
	socket.on('hello', (msg) => {
    	if (isAccepted(msg)) {
      		console.log('new user, socket id: ' + socket.id + ', name: ' + msg)
      		io.emit('msg','<strong>server</strong>: ' + msg + ' joins to the chat')
      		users += 1
      		names[socket.id] = msg
      		socket.emit('welcome', '<strong>server</strong>: welcome, ' + msg + ' you\'re the user number ' + users.toString())
    	
		} else {
      		console.log('user ' + msg + ' not accepted, nick in use')
      		socket.emit('used', 'user ' + msg + ' not accepted, nick already in use')
    	}
  	});

	/* Retrollamada de mensaje recibido del cliente */
  	socket.on('msg', (msg) => {
    	console.log(names[socket.id] + ': ' + msg)
    	io.emit('msg', '<strong>' + names[socket.id] + '</strong>: ' + msg)
  	});

	/* Gestión de comandos */
	socket.on('cmd', (msg) => {
		console.log(names[socket.id] + ': ' + msg)
		let cmd = ''
		switch (msg) {
			case '/help':
				cmd += 'You can use this commands:'
				cmd += '<ul><li>\'/help\': show all commands </li><li>\'/list\': show number of connected users</li>'
				cmd += '<li>\'/date\': show date </li><li>\'/hello\': get a greeting from server</li>'
				cmd += '<li>\'/user-list\': show names of connected users</li></ul>'
				break
			
			case '/list':
				cmd += users.toString() + ' users connected, included you'
				break
		
			case '/date':
				let date = new Date()
				cmd += 'Today is ' + days[date.getDay()] + ' ' + date.getDate() + ' of ' + months[date.getMonth()] + ' ' + date.getFullYear()
				break;
	
			case '/hello':
				cmd = '¡Bienvenido!, ' + names[socket.id]
				break
			
			case '/user-list':
				cmd += '<ul>'
				
				for (let id in names) {
					cmd += '<li>' + names[id] + '</li>'
				}
				
				cmd += '</ul>'
				break
			
			default:
				cmd = 'no command named \'' + msg + '\' try with \'/help\' to see all commands'
		}
		socket.emit('msg', '<strong>server</strong>: ' + cmd)
  	});
	
	/* Retrollamada de la desconexión de los clientes */
	socket.on('disconnect', () => {
    	console.log(names[socket.id] + ' leaves the chat')
    	users -= 1
    	io.emit('msg', '<strong>server</strong>: ' + names[socket.id] + ' leaves the chat')
    	delete names[socket.id]
  	});
});

/* Funcion de aceptacion de los clientes */
function isAccepted(nickname) {
	let accepted = true
	for (let id in names) {
    	if (nickname.toLowerCase() == names[id].toLowerCase()) {
      		accepted = false
    	}
  	}
  	return accepted
};