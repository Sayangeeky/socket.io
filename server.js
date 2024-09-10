const http = require('http')
const express = require('express')
const socketIo = require('socket.io')
const cors = require('cors')



const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
    }
});




io.on('connection', (socket) => {
    console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
            
        })

        socket.on('message', (msg) => {
            console.log('Message received:', msg);
            io.emit('message', msg)
            
        })
    
})

server.listen(5000, () => {
    console.log('Server is listening at port 5000...');
    
})