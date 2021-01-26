const app = require('./app')
const socketio = require('socket.io')
const port = process.env.PORT;
const http = require('http')

const server = http.createServer(app)
const io = socketio(server);

io.on('connection', () => {
    console.log('New WebSocket Connection')
})
server.listen(port, () => {
    console.log('Server is up on port ' + port)
})
