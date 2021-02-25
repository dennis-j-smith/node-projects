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

        socket.emit('message', generateMessage('Chat-Bot', 'Welcome to my cool new chat!'))

        socket.broadcast.to(user.room).emit('message', generateMessage('Chat-Bot', `${user.username} has joined the chat.`))

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)

        })
        callback()
    })

    socket.on('sendMessage', (message, callback) => {

        const user = getUser(socket.id)

        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }
        io.to(user.room).emit('message', generateMessage(user.username, message));
        callback()
    })

    socket.on('sendLocation', (location, callback) => {

        const user = getUser(socket.id)

        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `http://google.com/maps?q=${location.latitude},${location.longitude}`));
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', generateMessage('Chat-Bot', `${user.username} has left the chat!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
    
            })
        }
    })
})



server.listen(port, () => {
    console.log('Server is up on port ' + port)
})
