const io = require('socket.io')

const client = {}

io.on('connection', socket => {
	socket.on('new-client', name => {
		client[socket.id] = name
		socket.broadcast.emit('client-connected', name)
	})
	
	socket.on('send-chat-message', message => {
		socket.broadcast.emit('chat-message', { message: message, name: client[socket.id] })
	})
	
	socket.on('disconnect', () => {
		socket.broadcast.emit('client-disconnected', client[socket.id])
		delete client[socket.id]
	})
})