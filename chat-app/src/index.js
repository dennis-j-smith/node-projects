const app = require('./app')
const { generateMessage, generateLocationMessage }= require('./utils/messages')
const { getUser, getUsersInRoom, addUser, removeUser} = require('./utils/users')
const socketio = require('socket.io')
const port = process.env.PORT;
const Filter = require('bad-words');
const http = require('http')

const server = http.createServer(app)
const io = socketio(server);


io.on('connection', (socket) => {
    console.log('New WebSocket Connection')

    socket.on('join', (options, callback) => {

        const {error, user} = addUser({id: socket.id, ...options})
        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Welcome to my cool new chat!'))

        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined the chat.`))
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }
        io.to('BMore').emit('message',generateMessage(message));
        callback()
    })

    socket.on('sendLocation', (location, callback) => {
        io.emit('locationMessage', generateLocationMessage(`http://google.com/maps?q=${location.latitude},${location.longitude}`));
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', generateMessage(`${user.username} has left the chat!`))
        }
    })
})



server.listen(port, () => {
    console.log('Server is up on port ' + port)
})
