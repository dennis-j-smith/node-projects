const socket = io()

socket.on('welcome', (message) => {
    console.log(message)
})

socket.on('message', (message) => {
    console.log(message)
})

const messageForm = document.querySelector('form')


messageForm.addEventListener('submit', (e) => { 
    e.preventDefault()   
    const message = e.target.elements.message
    const msg = message.value  
    socket.emit('sendMessage', msg)
})