const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('./api/api')
const { Server } = require("socket.io")
const http = require('http')
const port = 3001 || process.env.port
const app = express()
const server = http.createServer(app)

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ["POST", "GET", "PUT"],
    credentials: true
}

app.use(cors(corsOptions))
app.use(bodyParser.text())
app.use(bodyParser.json())

app.use('/', api)

require('./db/connectToDb')

const io = new Server(server, {
    cors: corsOptions
})

io.on('connection', (socket)=>{

    socket.on('join_room', (data)=>{
        socket.join(data)
    })

    socket.on('send_message', (data)=>{
        socket.to(data.room).emit('receive_message', data)
    })

    socket.on('leaveRoom', ()=>{
        const room = Object.keys(socket.rooms)[1];
        io.to(room).emit('userLeft', socket.id);
    })
})

server.listen(port, () => {
    console.log(`Serwer working on port: ${port}`)
})