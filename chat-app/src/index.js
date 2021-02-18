const app = require('./app')
const { generateMessage, generateLocationMessage }= require('./utils/messages')
const socketio = require('socket.io')
const port = process.env.PORT;
const Filter = require('bad-words');
const http = require('http')

const server = http.createServer(app)
const io = socketio(server);


io.on('connection', (socket) => {
    console.log('New WebSocket Connection')

    socket.emit('message', generateMessage('Welcome to my cool new chat!'))

    socket.broadcast.emit('message', generateMessage('A new user has joined!'))

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }
        io.emit('message',generateMessage(message));
        callback()
    })

    socket.on('sendLocation', (location, callback) => {
        io.emit('locationMessage', generateLocationMessage(`http://google.com/maps?q=${location.latitude},${location.longitude}`));
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left the chat!'))
    })
})



server.listen(port, () => {
    console.log('Server is up on port ' + port)
})
