const socket = io('http://localhost')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('CAN I HV UR NAME?')
appendMessage('WELCOME')
socket.emit('client', name)

socket.on('chat-message', data => {
	appendMessage(`${data.name}: ${data.message}`)
})

socket.on('client-connected', name => {
	appendMessage(`${name} connected`)
})

socket.on('client-disconnected', name => {
	appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
	e.preventDefault()
	const message = messageInput.value
	appendMessage(`You: ${message}`)
	socket.emit('send-chat-message', message)
	messageInput.value = ''
})

function appendMessage(message){
	const messageElement = document.createElement('div')
	messageElement.innerText = message
	messageContainer.append(messageElement)
}