const app = require('./app')
const socketio = require('socket.io')
const port = process.env.PORT;
const http = require('http')

const server = http.createServer(app)
const io = socketio(server);


io.on('connection', (socket) => {
    console.log('New WebSocket Connection')

    socket.emit('welcome', 'Welcome to my cool new chat!')

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    })
})
server.listen(port, () => {
    console.log('Server is up on port ' + port)
})
